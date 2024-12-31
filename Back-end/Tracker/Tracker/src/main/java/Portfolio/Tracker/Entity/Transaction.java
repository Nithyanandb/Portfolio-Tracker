package Portfolio.Tracker.Entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String symbol;
    private String type; // BUY or SELL
    private int quantity;
    private double price;
    private LocalDateTime date;

    // Additional fields as needed
    private double totalAmount;
    private String status;
    
    @PrePersist
    protected void onCreate() {
        date = LocalDateTime.now();
        totalAmount = price * quantity;
    }
}
