package Portfolio.Tracker.Controller;

import Portfolio.Tracker.Entity.Stock;
import Portfolio.Tracker.Service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RequestMapping("/stocks")
@RestController
public class StockController {

    private final StockService stockService;

    @Autowired
    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @PostMapping("/add")
    public ResponseEntity<Stock> addStock(@RequestBody Stock stock) {
        return ResponseEntity.ok(stockService.addStock(stock));
    }

    @PutMapping("/update")
    public ResponseEntity<Stock> updateStock(@RequestBody Stock stock) {
        return ResponseEntity.ok(stockService.updateStock(stock.getId(), stock));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteStock(@RequestParam Long id) {
        stockService.deleteStock(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<Stock>> getAllStocks() {
        return ResponseEntity.ok(stockService.getAllStocks());
    }

    @GetMapping("/value")
    public ResponseEntity<BigDecimal> getPortfolioValue() {
        List<Stock> stocks = stockService.getAllStocks();
        BigDecimal totalValue = stockService.calculatePortfolioValue(stocks);
        return ResponseEntity.ok(totalValue);
    }
}
