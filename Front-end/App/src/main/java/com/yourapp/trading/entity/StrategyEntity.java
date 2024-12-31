@Entity
@Table(name = "strategies")
@Data
@Builder
public class StrategyEntity {
    @Id
    private String id;
    
    private String name;
    private String type;
    private StrategyStatus status;
    
    @Convert(converter = JsonConverter.class)
    private Map<String, Object> config;
    
    @Convert(converter = JsonConverter.class)
    private Map<String, Object> metrics;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
} 