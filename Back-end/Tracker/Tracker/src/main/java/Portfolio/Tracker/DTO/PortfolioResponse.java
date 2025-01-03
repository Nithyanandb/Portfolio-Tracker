package Portfolio.Tracker.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioResponse {
    private Long id;
    private String symbol;
    private String name;
    private int shares;
    private double value;
    private double change;
    private double averagePrice;
    private double currentPrice;
    private double totalReturn;
    private String purchaseDate;
    private LocalDateTime lastUpdated;
}