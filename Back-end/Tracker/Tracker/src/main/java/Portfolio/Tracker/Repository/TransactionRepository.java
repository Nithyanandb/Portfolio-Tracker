package Portfolio.Tracker.Repository;

import Portfolio.Tracker.Entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByStockSymbolAndUserId(String stockSymbol, Long userId);
}
