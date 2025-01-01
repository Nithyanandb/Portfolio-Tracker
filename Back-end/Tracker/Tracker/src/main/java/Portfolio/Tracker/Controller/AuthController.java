package Portfolio.Tracker.Controller;

import Portfolio.Tracker.DTO.AuthResponseDTO;
import Portfolio.Tracker.DTO.LoginRequestDTO;
import Portfolio.Tracker.DTO.LogoutResponse;
import Portfolio.Tracker.DTO.RegisterRequestDTO;
import Portfolio.Tracker.Service.AuthService;
import Portfolio.Tracker.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody RegisterRequestDTO request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginRequestDTO request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/oauth2/google")
    public ResponseEntity<String> getGoogleAuthUrl() {
        return ResponseEntity.ok(authService.getGoogleAuthUrl());
    }

    @GetMapping("/oauth2/github")
    public ResponseEntity<String> getGithubAuthUrl() {
        return ResponseEntity.ok(authService.getGithubAuthUrl());
    }


    @PostMapping("/logout")
    public ResponseEntity<LogoutResponse> logout(
            HttpServletRequest request,
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            String token = authHeader.substring(7);
            userService.logout(token, request);
            return ResponseEntity.ok(new LogoutResponse(true, "Logged out successfully", null));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new LogoutResponse(false, "Logout failed: " + e.getMessage(), null));
        }
    }

    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }



}
