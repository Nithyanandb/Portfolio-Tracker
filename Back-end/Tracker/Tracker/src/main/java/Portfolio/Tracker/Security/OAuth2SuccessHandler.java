package Portfolio.Tracker.Security;

import Portfolio.Tracker.DTO.AuthResponse;
import Portfolio.Tracker.Service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenProvider tokenProvider;
    private final UserService userService;
    
    @Value("${app.oauth2.redirectUri:http://localhost:3000/oauth2/redirect}")
    private String redirectUri;

    public OAuth2SuccessHandler(JwtTokenProvider tokenProvider, UserService userService) {
        this.tokenProvider = tokenProvider;
        this.userService = userService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                      Authentication authentication) throws IOException {
        try {
            if (response.isCommitted()) {
                log.warn("Response has already been committed");
                return;
            }

            OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
            OAuth2User oAuth2User = oauthToken.getPrincipal();
            
            String email = extractEmail(oAuth2User);
            if (email == null || email.isEmpty()) {
                // For GitHub users without public email
                String login = oAuth2User.getAttribute("login");
                if (login != null) {
                    email = login + "@github.com";
                } else {
                    throw new OAuth2AuthenticationException("No identifier found in OAuth2 user details");
                }
            }

            // Process OAuth login
            AuthResponse authResponse = userService.processOAuthPostLogin(oauthToken);
            String token = tokenProvider.generateTokenForOAuth2(email, authentication.getAuthorities());

            String targetUrl = buildRedirectUrl(authResponse, token);
            getRedirectStrategy().sendRedirect(request, response, targetUrl);

        } catch (Exception e) {
            log.error("OAuth2 authentication failed", e);
            handleAuthenticationFailure(request, response, e);
        }
    }

    private String buildRedirectUrl(AuthResponse authResponse, String token) {
        return UriComponentsBuilder.fromUriString(redirectUri)
                .queryParam("auth_success", true)
                .queryParam("token", token)
                .queryParam("email", authResponse.getEmail())
                .queryParam("name", authResponse.getName() != null ? authResponse.getName() : "")
                .queryParam("provider", authResponse.getProvider())
                .queryParam("roles", authResponse.getRoles() != null ? 
                    String.join(",", authResponse.getRoles()) : "ROLE_USER")
                .build()
                .encode()
                .toUriString();
    }

    private void handleAuthenticationFailure(HttpServletRequest request, 
                                           HttpServletResponse response, 
                                           Exception e) throws IOException {
        String errorUrl = UriComponentsBuilder.fromUriString(redirectUri)
                .queryParam("auth_success", false)
                .queryParam("error", "authentication_failed")
                .queryParam("message", e.getMessage())
                .build()
                .encode()
                .toUriString();
        getRedirectStrategy().sendRedirect(request, response, errorUrl);
    }

    private String extractEmail(OAuth2User oAuth2User) {
        Map<String, Object> attributes = oAuth2User.getAttributes();
        
        // Try different possible email attribute names
        String email = (String) attributes.get("email");
        if (email != null && !email.isEmpty()) return email;

        // For GitHub
        String login = (String) attributes.get("login");
        if (login != null) return login + "@github.com";

        // For Google
        Object emailObj = attributes.get("emails");
        if (emailObj instanceof Iterable) {
            Iterable<?> emails = (Iterable<?>) emailObj;
            for (Object e : emails) {
                if (e instanceof Map) {
                    Object value = ((Map<?, ?>) e).get("value");
                    if (value instanceof String) return (String) value;
                }
            }
        }

        log.warn("Could not extract email from OAuth2 user attributes: {}", attributes);
        return null;
    }
}