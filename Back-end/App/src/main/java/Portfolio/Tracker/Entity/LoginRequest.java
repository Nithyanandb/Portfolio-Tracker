package Portfolio.Tracker.Entity;

public class LoginRequest {

    private String username;
    private String password;

    // Default constructor
    public LoginRequest() {}

    // Constructor for easier initialization
    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getter and Setter methods
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
