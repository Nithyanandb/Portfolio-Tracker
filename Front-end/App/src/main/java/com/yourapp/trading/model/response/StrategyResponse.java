@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StrategyResponse {
    private String id;
    private String name;
    private String status;
    private Map<String, Object> metrics;
    private List<TradeResponse> recentTrades;
    private PerformanceMetrics performance;
    
    @Data
    @Builder
    public static class PerformanceMetrics {
        private Double totalReturn;
        private Double winRate;
        private Double profitFactor;
        private Double sharpeRatio;
        private Double maxDrawdown;
        private Integer totalTrades;
    }
} 