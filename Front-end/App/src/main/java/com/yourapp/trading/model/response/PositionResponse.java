@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PositionResponse {
    private String symbol;
    private String type;
    private Double entryPrice;
    private Double currentPrice;
    private Integer quantity;
    private Double unrealizedPnl;
    private Double unrealizedPnlPercent;
    private LocalDateTime entryTime;
    private Map<String, Object> metadata;
    private List<String> tags;
} 