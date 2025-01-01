package Portfolio.Tracker.Repository;

import Portfolio.Tracker.Entity.Transaction;
import Portfolio.Tracker.Entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
      List<Transaction> findByUser(User user);
}
