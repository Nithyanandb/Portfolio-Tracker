package Portfolio.Tracker.DTO;


public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private String email;
    private String name;

    public AuthResponse(String token, String email, String name) {
        this.token = token;
        this.email = email;
        this.name = name;
    }

    public AuthResponse(String token, String type, String email, String name) {
        this.token = token;
        this.type = type;
        this.email = email;
        this.name = name;
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
}