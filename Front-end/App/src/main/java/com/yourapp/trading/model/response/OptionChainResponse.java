@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OptionChainResponse {
    private String symbol;
    private String expiry;
    private Double underlyingPrice;
    private List<OptionContract> calls;
    private List<OptionContract> puts;
    
    @Data
    @Builder
    public static class OptionContract {
        private Double strike;
        private Double lastPrice;
        private Double bid;
        private Double ask;
        private Double delta;
        private Double gamma;
        private Double theta;
        private Double vega;
        private Integer volume;
        private Integer openInterest;
        private Double impliedVolatility;
    }
} 