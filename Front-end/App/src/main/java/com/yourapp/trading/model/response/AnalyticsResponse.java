@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsResponse {
    private String strategyId;
    private PerformanceMetrics overall;
    private List<DailyMetrics> daily;
    
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
    
    @Data
    @Builder
    public static class DailyMetrics {
        private LocalDate date;
        private Double pnl;
        private Integer trades;
        private Double winRate;
        private Double drawdown;
    }
} 