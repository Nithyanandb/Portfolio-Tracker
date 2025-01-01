package Portfolio.Tracker.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StockInfo {
    private String symbol;
    private String name;
    private String currency;
    private String exchange;
}