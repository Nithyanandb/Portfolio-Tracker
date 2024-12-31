@Data
@Builder
public class AlgoStrategyRequest {
    private String strategyId;
    private String symbol;
    private Map<String, Object> config;
    private String timeframe;
    private Double riskPercentage;
    private Double stopLoss;
    private Double takeProfit;
} 