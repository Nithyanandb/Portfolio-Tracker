package Portfolio.Tracker.Repository;

import Portfolio.Tracker.Entity.LoginActivity;
import Portfolio.Tracker.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface LoginActivityRepository extends JpaRepository<LoginActivity, Long> {
    List<LoginActivity> findByUserOrderByDateAsc(User user);
    Optional<LoginActivity> findByUserAndDate(User user, LocalDate date);
}