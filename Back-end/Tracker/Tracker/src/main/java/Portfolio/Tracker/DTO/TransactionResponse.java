package Portfolio.Tracker.DTO;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionResponse {
    private Long id;
    private String symbol;
    private String type;
    private int quantity;
    private double price;
    private double totalAmount;
    private String status;
    private LocalDateTime date;
}