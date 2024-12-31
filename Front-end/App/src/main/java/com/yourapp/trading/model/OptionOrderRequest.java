@Data
@Builder
public class OptionOrderRequest {
    private String symbol;
    private String type;  // CALL or PUT
    private Double strike;
    private String expiry;
    private Integer quantity;
    private Double limitPrice;
    private String orderType;  // MARKET or LIMIT
    private String timeInForce;
} 