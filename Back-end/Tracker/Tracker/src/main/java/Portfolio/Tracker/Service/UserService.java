package Portfolio.Tracker.Service;

import Portfolio.Tracker.Entity.User;
import Portfolio.Tracker.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register a new user
    public User registerUser(String email, String password, String authType) {
        User user = new User(email, password, authType);
        return userRepository.save(user);
    }

    // Find a user by email
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
