package Portfolio.Tracker.DTO;

import Portfolio.Tracker.Entity.Portfolio;
import java.util.List;
import lombok.Data;

@Data
public class PortfolioResponse {
    private List<Portfolio> holdings;
    private double totalValue;
}