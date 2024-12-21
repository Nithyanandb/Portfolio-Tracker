package Portfolio.Tracker.Controller;

import Portfolio.Tracker.Entity.Stock;
import Portfolio.Tracker.Service.StockService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stocks")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    // Add stock to portfolio
    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_USER')")  // Example of role-based access
    public ResponseEntity<Stock> addStock(@RequestBody Stock stock) {
        Stock createdStock = stockService.addStock(stock);
        return new ResponseEntity<>(createdStock, HttpStatus.CREATED);
    }

    // Get all stocks in portfolio
    @GetMapping("/all")
    public ResponseEntity<Iterable<Stock>> getAllStocks() {
        Iterable<Stock> stocks = stockService.getAllStocks();
        return new ResponseEntity<>(stocks, HttpStatus.OK);
    }

    // Update stock in portfolio
    @PutMapping("/update")
    public ResponseEntity<Stock> updateStock(@RequestParam("id") Long id, @RequestBody Stock stock) {
        Stock updatedStock = stockService.updateStock(id, stock);
        return updatedStock != null
                ? new ResponseEntity<>(updatedStock, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete stock from portfolio
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteStock(@RequestParam("id") Long id) {
        return stockService.deleteStock(id)
                ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
