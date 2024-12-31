@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TradeResponse {
    private Long id;
    private String symbol;
    private String type;
    private Double entryPrice;
    private Double exitPrice;
    private Integer quantity;
    private String status;
    private Double pnl;
    private Double pnlPercentage;
    private LocalDateTime entryTime;
    private LocalDateTime exitTime;
} 