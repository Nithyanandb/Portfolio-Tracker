package Portfolio.Tracker.Controller;

import Portfolio.Tracker.DTO.TransactionRequest;
import Portfolio.Tracker.Entity.Transaction;
import Portfolio.Tracker.Service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transaction")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/buy")
    public ResponseEntity<Transaction> buyStock(@Valid @RequestBody TransactionRequest request) {
        Transaction transaction = transactionService.saveTransaction("buy",
                request.getStockSymbol(),
                request.getStockName(),
                request.getQuantity(),
                request.getPrice()
        );
        return ResponseEntity.ok(transaction);
    }

    @PostMapping("/sell")
    public ResponseEntity<Transaction> sellStock(@Valid @RequestBody TransactionRequest request) {
        Transaction transaction = transactionService.saveTransaction("sell",
                request.getStockSymbol(),
                request.getStockName(),
                request.getQuantity(),
                request.getPrice()
        );
        return ResponseEntity.ok(transaction);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(transactions); // Returns the transactions as a ResponseEntity
    }

}
