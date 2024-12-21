package Portfolio.Tracker.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;         // Unique identifier for the portfolio

    private String name;     // Name of the portfolio
    private String description;  // Description of the portfolio

    // Default constructor
    public Portfolio() {}

    // Constructor with parameters
    public Portfolio(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    // Getter and setter methods
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
