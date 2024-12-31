@Data
@Builder
public class MarketData {
    private String symbol;
    private Double price;
    private Double high;
    private Double low;
    private Double volume;
    private Double change;
    private Double changePercent;
    private LocalDateTime timestamp;
    private List<CandleData> candles;
} 