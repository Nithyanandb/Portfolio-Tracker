package Portfolio.Tracker.Controller;

import Portfolio.Tracker.DTO.StockTransactionDTO;
import Portfolio.Tracker.Entity.Stock;
import Portfolio.Tracker.Service.StockService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stocks")
@CrossOrigin(origins = "http://localhost:3000")
public class StockController {
    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping
    public ResponseEntity<List<Stock>> getAllStocks() {
        return ResponseEntity.ok(stockService.getAllStocks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Stock> getStock(@PathVariable Long id) {
        return ResponseEntity.ok(stockService.getStock(id));
    }

    @PostMapping("/buy")
    public ResponseEntity<Stock> buyStock(@Valid @RequestBody StockTransactionDTO transaction) {
        return ResponseEntity.ok(stockService.buyStock(transaction));
    }

    @PostMapping("/sell")
    public ResponseEntity<Stock> sellStock(@Valid @RequestBody StockTransactionDTO transaction) {
        return ResponseEntity.ok(stockService.sellStock(transaction));
    }
}
