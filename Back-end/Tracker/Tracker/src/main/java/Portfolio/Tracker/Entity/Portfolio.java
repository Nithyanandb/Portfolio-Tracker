package Portfolio.Tracker.Entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;



@Entity
@Data
@Table(name = "portfolios")
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String symbol;
    private String name;
    private int quantity;
    private double averagePrice;
    private double currentPrice;
    private double dayChangePercent;
    private double highPrice;
    private double lowPrice;
    private double openPrice;
    private double previousClose;
    private double totalValue;
    
    private LocalDateTime purchaseDate;
    private LocalDateTime lastUpdated;

    @PrePersist
    protected void onCreate() {
        lastUpdated = LocalDateTime.now();
        purchaseDate = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        lastUpdated = LocalDateTime.now();
        totalValue = currentPrice * quantity;
    }
}