package Portfolio.Tracker.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "portfolio")
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String symbol;
    private int quantity;
    private double averagePrice;
}