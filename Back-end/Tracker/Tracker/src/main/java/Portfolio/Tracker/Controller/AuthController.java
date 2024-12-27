package Portfolio.Tracker.Controller;

import Portfolio.Tracker.DTO.AuthRequest;
import Portfolio.Tracker.DTO.AuthResponse;
import Portfolio.Tracker.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {
    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(userService.login(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        try {
            log.debug("Logout request received with auth header: {}", authHeader);
            
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                log.warn("Invalid or missing Authorization header");
                return ResponseEntity.badRequest().body(new LogoutResponse(false, "Invalid authorization header"));
            }

            String token = authHeader.substring(7);
            userService.logout(token, request);
            
            // Clear any session attributes
            request.getSession().invalidate();
            
            // Clear any cookies
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    Cookie newCookie = new Cookie(cookie.getName(), "");
                    newCookie.setPath("/");
                    newCookie.setMaxAge(0);
                    response.addCookie(newCookie);
                }
            }

            log.info("User logged out successfully");
            return ResponseEntity.ok().body(new LogoutResponse(true, "Logged out successfully"));
            
        } catch (Exception e) {
            log.error("Logout failed", e);
            return ResponseEntity.internalServerError()
                    .body(new LogoutResponse(false, "Logout failed: " + e.getMessage()));
        }
    }
}

class LogoutResponse {
    private final boolean success;
    private final String message;

    public LogoutResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }
}
