package Portfolio.Tracker.Entity;

import lombok.Data;

@Data
public class RegisterResponse {
    private String message;

    public RegisterResponse(String message) {
        this.message = message;
    }
}
