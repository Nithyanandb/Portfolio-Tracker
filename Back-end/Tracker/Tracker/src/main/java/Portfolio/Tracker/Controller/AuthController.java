package Portfolio.Tracker.Controller;

import Portfolio.Tracker.DTO.AuthResponseDTO;
import Portfolio.Tracker.DTO.LoginRequestDTO;
import Portfolio.Tracker.DTO.RegisterRequestDTO;
import Portfolio.Tracker.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

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
}
