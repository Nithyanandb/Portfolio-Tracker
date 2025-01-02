package Portfolio.Tracker.Controller;

import Portfolio.Tracker.Entity.LoginActivity;
import Portfolio.Tracker.Entity.User;
import Portfolio.Tracker.Service.LoginActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class LoginActivityController {

    @Autowired
    private LoginActivityService loginActivityService;

    @PostMapping("/record-login")
    public ResponseEntity<Void> recordLogin(@AuthenticationPrincipal User user) {
        loginActivityService.recordLogin(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/login-activity")
    public ResponseEntity<List<LoginActivity>> getLoginActivity(@AuthenticationPrincipal User user) {
        List<LoginActivity> activity = loginActivityService.getLoginActivity(user);
        return ResponseEntity.ok(activity);
    }
}