package Portfolio.Tracker.Repository;

import Portfolio.Tracker.Entity.UserStock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserStockRepository extends JpaRepository<UserStock, Long> {
    // Find by userId and stock symbol
    Optional<UserStock> findByUserIdAndTransactionStockSymbol(Long userId, String stockSymbol);
}
