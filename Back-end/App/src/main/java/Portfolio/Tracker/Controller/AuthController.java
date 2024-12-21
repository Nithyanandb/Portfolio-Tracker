package Portfolio.Tracker.Controller;

import Portfolio.Tracker.Entity.JwtResponse;
import Portfolio.Tracker.Entity.LoginRequest;
import Portfolio.Tracker.Entity.RegisterRequest;
import Portfolio.Tracker.Entity.User;
import Portfolio.Tracker.Repository.UserRepository;
import Portfolio.Tracker.Service.UserService;
import Portfolio.Tracker.Utility.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/")
@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(UserRepository userRepository, UserService userService, JwtUtil jwtUtil,
                          AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            String input = loginRequest.getUsernameOrEmail();
            String password = loginRequest.getPassword();

            // Determine if the input is an email or username
            User user = null;
            if (input.contains("@")) {
                // Assuming it's an email
                user = userRepository.findByEmail(input);
            } else {
                // Assuming it's a username
                user = userRepository.findByUsername(input);
            }

            // If user is not found, return error
            if (user == null) {
                return ResponseEntity.status(401).body("User not found. Please check your credentials.");
            }

            // Verify the password
            if (!passwordEncoder.matches(password, user.getPassword())) {
                return ResponseEntity.status(401).body("Invalid password.");
            }

            // Authenticate the user (Spring Security check)
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), password)
            );

            // Generate the token
            String token = jwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok(new JwtResponse(token, "Login successful"));

        } catch (Exception e) {
            // Log the exception (optional) and return a generic error message
            return ResponseEntity.status(500).body("An error occurred during login. Please try again.");
        }
    }



    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            return ResponseEntity.status(409).body("Username already exists");
        }

        try {
            userService.registerUser(registerRequest);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error during registration");
        }
    }
}
