package Portfolio.Tracker.Service;

import Portfolio.Tracker.Entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Assuming you have roles for users, if not, you can return an empty list or assign a default role
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")); // Example role
    }

    @Override
    public String getPassword() {
        return user.getPassword();  // Get the password from the User entity
    }

    @Override
    public String getUsername() {
        return user.getEmail();  // Get the email or username from the User entity
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Implement according to your requirement
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Implement according to your requirement
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Implement according to your requirement
    }

    @Override
    public boolean isEnabled() {
        return true; // Implement according to your requirement
    }

    // Additional methods to get the User entity if needed
    public User getUser() {
        return user;
    }
}
