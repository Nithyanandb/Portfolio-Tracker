package Portfolio.Tracker.Controller;

import Portfolio.Tracker.DTO.*;
import Portfolio.Tracker.Service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class TransactionController {
    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/buy")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> buyStock(@Valid @RequestBody TransactionRequest request) {
        return transactionService.executeBuyOrder(request);
    }

    @PostMapping("/sell")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> sellStock(@Valid @RequestBody TransactionRequest request) {
        return transactionService.executeSellOrder(request);
    }

    @GetMapping("/history")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getTransactionHistory(
            @RequestParam(required = false) String symbol,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return transactionService.getTransactionHistory(symbol, page, size);
    }

    @GetMapping("/portfolio")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<PortfolioResponse> getPortfolio() {
        return ResponseEntity.ok(transactionService.getCurrentPortfolio());
    }

    @GetMapping("/portfolio/performance")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getPortfolioPerformance(
            @RequestParam(defaultValue = "7") int days) {
        return transactionService.getPortfolioPerformance(days);
    }
}
