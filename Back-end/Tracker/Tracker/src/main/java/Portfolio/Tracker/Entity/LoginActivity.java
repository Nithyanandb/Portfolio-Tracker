package Portfolio.Tracker.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class LoginActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private int count;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}