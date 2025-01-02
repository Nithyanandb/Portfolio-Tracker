package Portfolio.Tracker.Service.impl;

import Portfolio.Tracker.DTO.AuthRequest;
import Portfolio.Tracker.DTO.AuthResponse;
import Portfolio.Tracker.DTO.AuthProvider;
import Portfolio.Tracker.DTO.Role;
import Portfolio.Tracker.Entity.LoginActivity;
import Portfolio.Tracker.Entity.User;
import Portfolio.Tracker.Repository.LoginActivityRepository;
import Portfolio.Tracker.Repository.UserRepository;
import Portfolio.Tracker.Security.JwtTokenProvider;
import Portfolio.Tracker.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);
    private final UserRepository userRepository;
    private final LoginActivityRepository loginActivityRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse register(AuthRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Collections.singleton(Role.ROLE_USER))
                .provider(AuthProvider.LOCAL)
                .build();

        User savedUser = userRepository.save(user);
        Authentication auth = new UsernamePasswordAuthenticationToken(
                savedUser.getEmail(), null, savedUser.getAuthorities());
        String token = jwtTokenProvider.generateToken(auth);

        return AuthResponse.builder()
                .token(token)
                .email(savedUser.getEmail())
                .name(savedUser.getName())
                .provider(AuthProvider.LOCAL.toString())
                .roles(savedUser.getRoles().stream()
                        .map(Role::name)
                        .toList())
                .build();
    }

    @Override
    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = getCurrentUser();
        String token = jwtTokenProvider.generateToken(authentication);

        // Record login activity
        recordLoginActivity(user);

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .name(user.getName())
                .provider(user.getProvider().toString())
                .roles(user.getRoles().stream()
                        .map(Role::name)
                        .toList())
                .build();
    }

    @Override
    public AuthResponse processOAuthPostLogin(OAuth2AuthenticationToken token) {
        OAuth2User oauth2User = token.getPrincipal();
        Map<String, Object> attributes = oauth2User.getAttributes();

        String email = extractEmail(attributes);
        String name = extractName(attributes);
        AuthProvider provider = AuthProvider.valueOf(token.getAuthorizedClientRegistrationId().toUpperCase());

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> createOAuthUser(email, name, provider));

        // Update user information if needed
        if (name != null && !name.equals(user.getName())) {
            user.setName(name);
            user = userRepository.save(user);
        }

        String jwtToken = jwtTokenProvider.generateTokenForOAuth2(
                email,
                token.getAuthorities()
        );

        // Record login activity
        recordLoginActivity(user);

        return AuthResponse.builder()
                .token(jwtToken)
                .email(user.getEmail())
                .name(user.getName())
                .provider(user.getProvider().toString())
                .roles(user.getRoles().stream()
                        .map(Role::name)
                        .toList())
                .build();
    }

    private void recordLoginActivity(User user) {
        LocalDate today = LocalDate.now();
        LoginActivity activity = loginActivityRepository.findByUserAndDate(user, today)
                .orElse(new LoginActivity());
        activity.setUser(user);
        activity.setDate(today);
        activity.setCount(activity.getCount() + 1);
        loginActivityRepository.save(activity);
    }

    private String extractEmail(Map<String, Object> attributes) {
        String email = (String) attributes.get("email");
        if (email != null && !email.isEmpty()) {
            return email;
        }

        // GitHub fallback
        String login = (String) attributes.get("login");
        if (login != null) {
            return login + "@github.com";
        }

        throw new RuntimeException("Could not extract email from OAuth2 attributes");
    }

    private String extractName(Map<String, Object> attributes) {
        String name = (String) attributes.get("name");
        if (name != null && !name.isEmpty()) {
            return name;
        }

        // GitHub fallback
        String login = (String) attributes.get("login");
        if (login != null) {
            return login;
        }

        return "User"; // Default fallback
    }

    private User createOAuthUser(String email, String name, AuthProvider provider) {
        User user = User.builder()
                .email(email)
                .name(name)
                .provider(provider)
                .roles(Collections.singleton(Role.ROLE_USER))
                .build();

        return userRepository.save(user);
    }

    @Override
    public void logout(String token, HttpServletRequest request) {
        if (token != null && jwtTokenProvider.validateToken(token)) {
            jwtTokenProvider.invalidateToken(token);
            SecurityContextHolder.clearContext();

            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();
            }
        }
    }

    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new RuntimeException("No authentication found");
        }

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}