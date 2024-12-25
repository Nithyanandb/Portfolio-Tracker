package Portfolio.Tracker.Controller;

import Portfolio.Tracker.Entity.User;
import Portfolio.Tracker.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestParam String email, @RequestParam String password) {
        User existingUser = userService.findUserByEmail(email);
        if (existingUser != null) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }

        userService.registerUser(email, password, "register");
        return ResponseEntity.ok("User registered successfully");
    }

    // User login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
        User user = userService.findUserByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found!");
        }

        if (!user.getPassword().equals(password)) {
            return ResponseEntity.badRequest().body("Invalid password!");
        }

        return ResponseEntity.ok("Login successful");
    }
}
