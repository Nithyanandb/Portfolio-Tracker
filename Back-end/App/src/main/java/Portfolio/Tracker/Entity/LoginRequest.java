package Portfolio.Tracker.Entity;

import Portfolio.Tracker.Validation.UsernameOrEmail;
import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank(message = "Username or email cannot be blank")
    @UsernameOrEmail
    private String usernameOrEmail;

    @NotBlank(message = "Password cannot be blank")
    private String password;


    public LoginRequest() {}


    public LoginRequest(String usernameOrEmail, String password) {
        this.usernameOrEmail = usernameOrEmail;
        this.password = password;
    }


    public String getUsernameOrEmail() {
        return usernameOrEmail;
    }

    public void setUsernameOrEmail(String usernameOrEmail) {
        this.usernameOrEmail = usernameOrEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}