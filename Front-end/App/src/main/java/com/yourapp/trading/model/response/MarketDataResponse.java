@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MarketDataResponse {
    private String symbol;
    private Double price;
    private Double change;
    private Double changePercent;
    private Double high;
    private Double low;
    private Double volume;
    private LocalDateTime timestamp;
    private List<CandleData> candles;
    
    @Data
    @Builder
    public static class CandleData {
        private LocalDateTime timestamp;
        private Double open;
        private Double high;
        private Double low;
        private Double close;
        private Double volume;
    }
} 