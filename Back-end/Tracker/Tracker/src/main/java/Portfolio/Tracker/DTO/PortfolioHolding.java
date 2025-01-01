package Portfolio.Tracker.DTO;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioHolding {
    private String symbol;
    private String name;
    private int quantity;
    private double totalCost;
    private double averagePrice;
    private double currentPrice;
    private double marketValue;
    private double totalReturn;
}