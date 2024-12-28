package Portfolio.Tracker.Repository;

import Portfolio.Tracker.Entity.Portfolio;
import Portfolio.Tracker.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    List<Portfolio> findByUser(User user);
    Optional<Portfolio> findByUserAndStockSymbol(User user, String stockSymbol);
} 