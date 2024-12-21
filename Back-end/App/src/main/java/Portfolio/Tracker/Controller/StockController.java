package Portfolio.Tracker.Controller;

import Portfolio.Tracker.Entity.Stock;
import Portfolio.Tracker.Service.StockService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/stocks")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    // Add stock to portfolio
    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_USER')")  // Role-based access control

    public ResponseEntity<Stock> addStock(@RequestBody Stock stock) {
        try {
            // Check if purchase_date and updated_date are not provided, set them to current date
            if (stock.getPurchase_Date() == null) {
                stock.setPurchase_Date(LocalDateTime.now());
            }
            if (stock.getUpdated_Date() == null) {
                stock.setUpdated_Date(LocalDateTime.now());
            }

            // Call service to add stock
            Stock createdStock = stockService.addStock(stock);
            return new ResponseEntity<>(createdStock, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Return bad request on failure
        }
    }


    // Get all stocks in portfolio
    @GetMapping("/all")
    public ResponseEntity<Iterable<Stock>> getAllStocks() {
        Iterable<Stock> stocks = stockService.getAllStocks();
        return new ResponseEntity<>(stocks, HttpStatus.OK);
    }

    // Update stock in portfolio
    @PutMapping("/update")
    @PreAuthorize("hasRole('ROLE_USER')")  // Role-based access control for update
    public ResponseEntity<Stock> updateStock(@RequestParam("id") Long id, @RequestBody Stock stock) {
        try {
            Stock updatedStock = stockService.updateStock(id, stock);
            return updatedStock != null
                    ? new ResponseEntity<>(updatedStock, HttpStatus.OK)
                    : new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Handle invalid update request
        }
    }

    // Delete stock from portfolio
    @DeleteMapping("/delete")
    @PreAuthorize("hasRole('ROLE_USER')")  // Role-based access control for delete
    public ResponseEntity<Void> deleteStock(@RequestParam("id") Long id) {
        boolean isDeleted = stockService.deleteStock(id);
        return isDeleted
                ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
