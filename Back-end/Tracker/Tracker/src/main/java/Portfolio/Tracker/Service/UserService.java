package Portfolio.Tracker.Service;

import Portfolio.Tracker.DTO.AuthRequest;
import Portfolio.Tracker.DTO.AuthResponse;
import Portfolio.Tracker.Entity.User;
import jakarta.validation.Valid;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

public interface UserService {
    AuthResponse register(@Valid AuthRequest request);
    AuthResponse login(AuthRequest request);
    AuthResponse processOAuthPostLogin(OAuth2AuthenticationToken token);
    User getCurrentUser();
}