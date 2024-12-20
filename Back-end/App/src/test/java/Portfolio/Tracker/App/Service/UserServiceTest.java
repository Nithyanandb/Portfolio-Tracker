package Portfolio.Tracker.App.Service;

import Portfolio.Tracker.Entity.RegisterRequest;
import Portfolio.Tracker.Entity.User;
import Portfolio.Tracker.Repository.UserRepository;
import Portfolio.Tracker.Service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void testRegisterUser() {
        RegisterRequest registerRequest = new RegisterRequest("user", "password");

        // Mock the PasswordEncoder to return an encoded password
        when(passwordEncoder.encode(any(String.class))).thenReturn("encodedPassword");

        // Create a mock user object
        User user = new User();
        user.setUsername("user");
        user.setPassword("encodedPassword");

        // Mock the userRepository's save method
        when(userRepository.save(any(User.class))).thenReturn(user);


        // Call the method under test
        userService.registerUser(registerRequest);

        // Verify the repository's save method was called once
        verify(userRepository, times(1)).save(any(User.class));

        // Verify the user object has been saved with encoded password
        assertEquals("encodedPassword", user.getPassword());

        // Validate that the correct username was set
        assertEquals("user", user.getUsername());
    }

    @Test
    void testRegisterUserWithShortPassword() {
        RegisterRequest registerRequest = new RegisterRequest("user", "pwd");

        // Call the method under test and expect an exception to be thrown
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.registerUser(registerRequest);
        });

        // Verify the exception message
        assertEquals("Password must be at least 6 characters", exception.getMessage());
    }

    @Test
    void testRegisterUserWithNullValues() {
        RegisterRequest registerRequest = new RegisterRequest(null, null);

        // Call the method under test and expect an exception to be thrown
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.registerUser(registerRequest);
        });

        // Verify the exception message
        assertEquals("Username and password are required", exception.getMessage());
    }
}
