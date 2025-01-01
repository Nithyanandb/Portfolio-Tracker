package Portfolio.Tracker.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioStats {
    private double totalValue;
    private double todayChange;
    private double totalReturn;
    private int totalPositions;
}