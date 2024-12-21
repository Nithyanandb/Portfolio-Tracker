package Portfolio.Tracker.Repository;

import Portfolio.Tracker.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
   User findByUsername(String username);
   boolean existsByUsername(String username);
   User findByEmail(String email);
}
