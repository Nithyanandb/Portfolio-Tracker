package Portfolio.Tracker.Security;


import Portfolio.Tracker.DTO.AuthResponse;
import Portfolio.Tracker.Service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private UserService userService;
    private ObjectMapper objectMapper;

    private static final String FRONTEND_URL = "http://localhost:3000";

    public OAuth2SuccessHandler(UserService userService, ObjectMapper objectMapper) {
        this.userService = userService;
        this.objectMapper = objectMapper;
    }


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        AuthResponse authResponse = userService.processOAuthPostLogin(oauthToken);

        // Redirect to frontend with query parameters
        String redirectUrl = FRONTEND_URL + "?token=" + URLEncoder.encode(authResponse.getToken(), StandardCharsets.UTF_8)
                + "&userId=" + URLEncoder.encode(authResponse.getEmail(), StandardCharsets.UTF_8);

        response.sendRedirect(redirectUrl);
    }
}