package Portfolio.Tracker.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;



public class AuthRequest {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

    public AuthRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public @NotBlank @Email String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank @Email String email) {
        this.email = email;
    }

    public @NotBlank String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank String password) {
        this.password = password;
    }


}