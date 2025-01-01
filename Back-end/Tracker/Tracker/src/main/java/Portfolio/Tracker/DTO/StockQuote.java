package Portfolio.Tracker.DTO;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class StockQuote {
    private double currentPrice;    // c
    private double change;         // d
    private double dayChangePercent; // dp
    private double highPrice;      // h
    private double lowPrice;       // l
    private double openPrice;      // o
    private double previousClose;  // pc
    private long timestamp;        // t
}