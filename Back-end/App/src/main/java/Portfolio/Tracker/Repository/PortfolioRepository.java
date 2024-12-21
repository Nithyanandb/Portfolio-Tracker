package Portfolio.Tracker.Repository;

import Portfolio.Tracker.Entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {

}
