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
    
    @Value("${app.oauth2.redirectUri}")
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
            
            // Debug logging
            log.debug("OAuth2 provider: {}", oauthToken.getAuthorizedClientRegistrationId());
            log.debug("OAuth2 user attributes: {}", oAuth2User.getAttributes());

            // Extract email safely
            String email = extractEmail(oAuth2User);
            if (email == null || email.isEmpty()) {
                throw new OAuth2AuthenticationException("Email not found in OAuth2 user details");
            }

            log.info("Processing OAuth2 login for user: {}", email);

            // Process OAuth login and get auth response
            AuthResponse authResponse = userService.processOAuthPostLogin(oauthToken);
            if (authResponse == null) {
                throw new OAuth2AuthenticationException("Failed to process OAuth2 login");
            }

            // Build success URL
            String targetUrl = UriComponentsBuilder.fromUriString(redirectUri)
                    .queryParam("auth_success", true)
                    .queryParam("token", authResponse.getToken())
                    .queryParam("email", authResponse.getEmail())
                    .queryParam("name", authResponse.getName())
                    .queryParam("provider", authResponse.getProvider())
                    .queryParam("roles", String.join(",", authResponse.getRoles()))
                    .build()
                    .encode()
                    .toUriString();

            log.debug("Redirecting to: {}", targetUrl);
            getRedirectStrategy().sendRedirect(request, response, targetUrl);

        } catch (Exception e) {
            log.error("OAuth2 authentication failed", e);
            String errorUrl = UriComponentsBuilder.fromUriString(redirectUri)
                    .queryParam("auth_success", false)
                    .queryParam("error", "authentication_failed")
                    .queryParam("message", e.getMessage())
                    .build()
                    .encode()
                    .toUriString();
            getRedirectStrategy().sendRedirect(request, response, errorUrl);
        }
    }

    private String extractEmail(OAuth2User oAuth2User) {
        Map<String, Object> attributes = oAuth2User.getAttributes();
        
        // Try different possible email attribute names
        String email = (String) attributes.get("email");
        if (email != null) return email;

        // For GitHub
        email = (String) attributes.get("login");
        if (email != null) return email + "@github.com";

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