package Portfolio.Tracker.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecommendationDTO {
    private String symbol;
    private double currentPrice;
    private String description;
} 