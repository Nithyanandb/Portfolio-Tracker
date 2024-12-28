package Portfolio.Tracker.Service;

import Portfolio.Tracker.DTO.ButtonActionRequest;
import Portfolio.Tracker.Entity.Button;
import Portfolio.Tracker.Entity.User;
import Portfolio.Tracker.Repository.ButtonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class ButtonService {
    
    private final ButtonRepository buttonRepository;
    private final UserService userService;
    
    @Autowired
    public ButtonService(ButtonRepository buttonRepository, UserService userService) {
        this.buttonRepository = buttonRepository;
        this.userService = userService;
    }
    
    @Transactional
    public ResponseEntity<?> processButtonAction(ButtonActionRequest request) {
        try {
            User currentUser = userService.getCurrentUser();
            Button button = buttonRepository.findByButtonId(request.getButtonId())
                .orElse(new Button());
            
            button.setButtonId(request.getButtonId());
            button.setState(request.getActionType());
            button.setLastUpdated(LocalDateTime.now());
            button.setUser(currentUser);
            
            buttonRepository.save(button);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Button action processed successfully");
            response.put("state", button.getState());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Failed to process button action: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    public ResponseEntity<?> getButtonState(String buttonId) {
        try {
            User currentUser = userService.getCurrentUser();
            Button button = buttonRepository.findByButtonIdAndUserId(buttonId, currentUser.getId())
                .orElse(null);
            
            Map<String, Object> response = new HashMap<>();
            response.put("state", button != null ? button.getState() : "inactive");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Failed to get button state: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
} 