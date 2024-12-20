package Portfolio.Tracker.Service;

import Portfolio.Tracker.Entity.User;
import Portfolio.Tracker.Entity.RegisterRequest;
import Portfolio.Tracker.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerUser(RegisterRequest registerRequest) {
        // Validate user input
        if (registerRequest.getUsername() == null || registerRequest.getPassword() == null) {
            throw new RuntimeException("Username and password are required");
        }

        if (registerRequest.getPassword().length() < 6) {
            throw new RuntimeException("Password must be at least 6 characters");
        }

        // Encode password
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        // Assign default role
        user.setRole("ROLE_USER"); // Use Enum or Configuration property for roles

        try {
            // Save user to database
            userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Error registering user", e);
        }
    }
}
