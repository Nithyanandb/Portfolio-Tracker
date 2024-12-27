package Portfolio.Tracker.Service.impl;

import Portfolio.Tracker.DTO.AuthRequest;
import Portfolio.Tracker.DTO.AuthResponse;
import Portfolio.Tracker.Entity.User;
import Portfolio.Tracker.Repository.UserRepository;
import Portfolio.Tracker.Security.JwtTokenProvider;
import Portfolio.Tracker.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;


    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @Override
    @Transactional
    public AuthResponse register(@Valid AuthRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setProvider(User.AuthProvider.LOCAL);
        user.setRoles(Collections.singleton(User.Role.ROLE_USER));
        
        user = userRepository.save(user);
        
        String token = tokenProvider.generateToken(user.getEmail());
        return new AuthResponse(token, user.getEmail(), user.getName());
    }

    @Override
    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));
            
        String token = tokenProvider.generateToken(user.getEmail());
        
        Set<String> roles = user.getRoles().stream()
            .map(Enum::name)
            .collect(Collectors.toSet());
        
        return new AuthResponse(
            token,
            user.getEmail(),
            user.getName(),
            roles,
            user.getProvider()
        );
    }

    @Override
    @Transactional
    public AuthResponse processOAuthPostLogin(OAuth2AuthenticationToken token) {
        Map<String, Object> attributes = token.getPrincipal().getAttributes();
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");
        User.AuthProvider provider = User.AuthProvider.valueOf(token.getAuthorizedClientRegistrationId().toUpperCase());

        User user = userRepository.findByEmail(email)
            .orElseGet(() -> {
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setName(name);
                newUser.setProvider(provider);
                newUser.setRoles(Collections.singleton(User.Role.ROLE_USER));
                return userRepository.save(newUser);
            });

        String jwtToken = tokenProvider.generateToken(user.getEmail());
        
        Set<String> roles = user.getRoles().stream()
            .map(Enum::name)
            .collect(Collectors.toSet());
        
        return new AuthResponse(
            jwtToken,
            user.getEmail(),
            user.getName(),
            roles,
            user.getProvider()
        );
    }

    @Override
    public User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Current user not found"));
    }

    @Override
    public void logout(String token, HttpServletRequest request) {
        try {
            // Validate token
            if (!tokenProvider.validateToken(token)) {
                throw new RuntimeException("Invalid token");
            }

            // Get username from token
            String username = tokenProvider.getUsernameFromToken(token);
            
            // Clear security context
            SecurityContextHolder.clearContext();
            
            // Invalidate session if exists
            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();
            }

            // Invalidate the token
            tokenProvider.invalidateToken(token);

            // Log the logout event
            log.info("User {} logged out successfully", username);
            
        } catch (Exception e) {
            log.error("Logout failed", e);
            throw new RuntimeException("Logout failed: " + e.getMessage());
        }
    }
}