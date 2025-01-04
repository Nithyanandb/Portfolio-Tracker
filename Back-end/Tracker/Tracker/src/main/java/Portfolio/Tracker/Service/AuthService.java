package Portfolio.Tracker.Service;

import Portfolio.Tracker.DTO.AuthResponseDTO;
import Portfolio.Tracker.DTO.LoginRequestDTO;
import Portfolio.Tracker.DTO.RegisterRequestDTO;
import Portfolio.Tracker.DTO.AuthProvider;
import Portfolio.Tracker.DTO.Role;
import Portfolio.Tracker.Entity.User;
import Portfolio.Tracker.Repository.UserRepository;
import Portfolio.Tracker.Security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final KeyStorage keyStorage;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String googleRedirectUri;

    @Value("${spring.security.oauth2.client.registration.github.client-id}")
    private String githubClientId;

    @Value("${spring.security.oauth2.client.registration.github.redirect-uri}")
    private String githubRedirectUri;

    // Traditional Registration
    public AuthResponseDTO register(RegisterRequestDTO request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .provider(AuthProvider.LOCAL)
                .roles(Collections.singleton(Role.ROLE_USER))
                .build();

        userRepository.save(user);
        Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        String token = jwtTokenProvider.generateToken(auth);

        return AuthResponseDTO.builder()
                .token(token)
                .email(user.getEmail())
                .name(user.getName())
                .message("User registered successfully")
                .build();
    }

    // Traditional Login
    public AuthResponseDTO login(LoginRequestDTO request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getProvider() != AuthProvider.LOCAL) {
            throw new RuntimeException("Please use " + user.getProvider() + " to login");
        }

        String token = jwtTokenProvider.generateToken(auth);

        return AuthResponseDTO.builder()
                .token(token)
                .email(user.getEmail())
                .name(user.getName())
                .message("Login successful")
                .build();
    }

    public AuthResponseDTO processOAuth2Login(OAuth2AuthenticationToken token) {
        OAuth2User oauth2User = token.getPrincipal();
        String email = extractEmail(oauth2User, token.getAuthorizedClientRegistrationId());

        User user = userRepository.findByEmail(email)
                .map(existingUser -> updateExistingUser(existingUser, oauth2User, token.getAuthorizedClientRegistrationId()))
                .orElseGet(() -> createOAuth2User(oauth2User, token.getAuthorizedClientRegistrationId()));

        String jwtToken = jwtTokenProvider.generateToken(token);

        return AuthResponseDTO.builder()
                .token(jwtToken)
                .email(user.getEmail())
                .name(user.getName())
                .message("OAuth2 login successful")
                .build();
    }   

    private String extractEmail(OAuth2User oauth2User, String registrationId) {
        Map<String, Object> attributes = oauth2User.getAttributes();
        if ("google".equals(registrationId)) {
            return (String) attributes.get("email");
        } else if ("github".equals(registrationId)) {
            return (String) attributes.get("email");
        }
        throw new RuntimeException("Unknown provider: " + registrationId);
    }

    private User updateExistingUser(User existingUser, OAuth2User oauth2User, String registrationId) {
        AuthProvider provider = AuthProvider.valueOf(registrationId.toUpperCase());
        if (existingUser.getProvider() != provider) {
            throw new RuntimeException("You're signed up with " + existingUser.getProvider() + 
                    ". Please use your " + existingUser.getProvider() + " account to login");
        }
        
        existingUser.setName(oauth2User.getAttribute("name"));
        return userRepository.save(existingUser);
    }

    private User createOAuth2User(OAuth2User oauth2User, String registrationId) {
        User user = User.builder()
                .email(extractEmail(oauth2User, registrationId))
                .name(oauth2User.getAttribute("name"))
                .provider(AuthProvider.valueOf(registrationId.toUpperCase()))
                .roles(Collections.singleton(Role.ROLE_USER))
                .build();
        return userRepository.save(user);
    }

    // OAuth2 URL Generators
    public String getGoogleAuthUrl() {
        return "https://accounts.google.com/o/oauth2/v2/auth?" +
                "client_id=" + googleClientId +
                "&redirect_uri=" + googleRedirectUri +
                "&response_type=code" +
                "&scope=email%20profile";
    }

    public String getGithubAuthUrl() {
        return "https://github.com/login/oauth/authorize?" +
                "client_id=" + githubClientId +
                "&redirect_uri=" + githubRedirectUri +
                "&scope=user:email";
    }

    public void logout(String token) {
        if (token != null) {
            keyStorage.removeKey(token);
        }
    }
} 