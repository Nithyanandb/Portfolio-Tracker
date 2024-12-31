package Portfolio.Tracker.Service;

import Portfolio.Tracker.DTO.TransactionRequest;
import Portfolio.Tracker.Entity.Transaction;
import Portfolio.Tracker.Entity.User;
import Portfolio.Tracker.Repository.TransactionRepository;
import Portfolio.Tracker.Repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
public class TransactionService {
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;

    public TransactionService(UserRepository userRepository, TransactionRepository transactionRepository) {
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
    }

    @Transactional
    public ResponseEntity<?> executeBuyOrder(TransactionRequest request) {
        // Get current authenticated user
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401).body("User not authenticated");
        }

        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create and save transaction
        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setSymbol(request.getStockSymbol());
        transaction.setQuantity(request.getQuantity());
        transaction.setPrice(request.getPrice());
        transaction.setType("BUY");
        transaction.setStatus("COMPLETED");

        transactionRepository.save(transaction);

        return ResponseEntity.ok(Map.of(
                "message", "Transaction successful",
                "transactionId", transaction.getId()
        ));
    }
}
