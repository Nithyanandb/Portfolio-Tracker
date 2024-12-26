package Portfolio.Tracker.Controller;

import Portfolio.Tracker.DTO.TransactionRequest;
import Portfolio.Tracker.Entity.Transaction;
import Portfolio.Tracker.Service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transaction")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {


    private TransactionService transactionService;
    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/buy")
    public ResponseEntity<Transaction> buyStock(@RequestBody TransactionRequest request) {
        Transaction transaction = transactionService.saveTransaction("buy", request.getStockSymbol(), request.getStockName(), request.getQuantity(), request.getPrice());
        return ResponseEntity.ok(transaction);
    }

    @PostMapping("/sell")
    public ResponseEntity<Transaction> sellStock(@RequestBody TransactionRequest request) {
        Transaction transaction = transactionService.saveTransaction("sell", request.getStockSymbol(), request.getStockName(), request.getQuantity(), request.getPrice());
        return ResponseEntity.ok(transaction);
    }
}

