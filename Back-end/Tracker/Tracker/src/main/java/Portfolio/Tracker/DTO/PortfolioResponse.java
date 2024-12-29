package Portfolio.Tracker.DTO;

import lombok.Data;
import java.util.List;

@Data
public class PortfolioResponse {
    private double totalValue;
    private double totalProfit;
    private List<PortfolioItem> holdings;
    
    @Data
    public static class PortfolioItem {
        private String symbol;
        private String name;
        private int quantity;
        private double averagePrice;
        private double currentPrice;
        private double totalValue;
        private double profit;
    }
} 