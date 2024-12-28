package Portfolio.Tracker.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "buttons")
public class Button {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String buttonId;
    
    @Column(nullable = false)
    private String state;
    
    @Column(nullable = false)
    private LocalDateTime lastUpdated;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
} 