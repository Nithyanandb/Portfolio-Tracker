package Portfolio.Tracker.DTO;

import Portfolio.Tracker.Entity.User.AuthProvider;
import java.util.Set;

public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private String email;
    private String name;
    private Set<String> roles;
    private AuthProvider provider;

    public AuthResponse(String token, String email, String name) {
        this.token = token;
        this.email = email;
        this.name = name;
    }

    public AuthResponse(String token, String email, String name, Set<String> roles, AuthProvider provider) {
        this.token = token;
        this.email = email;
        this.name = name;
        this.roles = roles;
        this.provider = provider;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public AuthProvider getProvider() {
        return provider;
    }

    public void setProvider(AuthProvider provider) {
        this.provider = provider;
    }
}