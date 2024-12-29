package Portfolio.Tracker.Repository;

import Portfolio.Tracker.Entity.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Page<Transaction> findAllByUserIdAndSymbolOrderByDateDesc(Long userId, String symbol, Pageable pageable);
    Page<Transaction> findAllByUserIdOrderByDateDesc(Long userId, Pageable pageable);
    List<Transaction> findAllByUserId(Long userId);
    List<Transaction> findAllByUserIdAndDateBetweenOrderByDateAsc(Long userId, LocalDateTime startDate, LocalDateTime endDate);
}
