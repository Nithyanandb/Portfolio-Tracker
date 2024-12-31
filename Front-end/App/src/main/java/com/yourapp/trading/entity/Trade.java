@Entity
@Table(name = "trades")
@Data
@Builder
public class Trade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String symbol;
    private String strategyId;
    private String type;
    private Double entryPrice;
    private Double exitPrice;
    private Integer quantity;
    private String status;
    private Double pnl;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
} 