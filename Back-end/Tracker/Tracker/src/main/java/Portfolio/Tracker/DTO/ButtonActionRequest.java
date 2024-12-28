package Portfolio.Tracker.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ButtonActionRequest {
    @NotBlank
    private String actionType;
    
    @NotBlank
    private String buttonId;
    
    private String userId;
    
    private String additionalData;
} 