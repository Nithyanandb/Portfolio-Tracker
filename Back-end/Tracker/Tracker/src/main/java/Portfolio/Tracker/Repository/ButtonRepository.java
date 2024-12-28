package Portfolio.Tracker.Repository;

import Portfolio.Tracker.Entity.Button;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ButtonRepository extends JpaRepository<Button, Long> {
    Optional<Button> findByButtonId(String buttonId);
    Optional<Button> findByButtonIdAndUserId(String buttonId, Long userId);
} 