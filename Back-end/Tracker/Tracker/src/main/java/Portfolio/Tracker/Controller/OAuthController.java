package Portfolio.Tracker.Controller;

import Portfolio.Tracker.DTO.AuthResponse;
import Portfolio.Tracker.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OAuthController {
    private final UserService userService;


    @Autowired
    public OAuthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/oauth2/success")
    public AuthResponse oauthSuccess(OAuth2AuthenticationToken authentication) {
        return userService.processOAuthPostLogin(authentication);
    }
}