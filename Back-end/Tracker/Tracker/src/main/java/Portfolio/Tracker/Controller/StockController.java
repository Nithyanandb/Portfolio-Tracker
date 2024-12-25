package Portfolio.Tracker.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/stocks")
public class StockController {

    // Get all stocks
    @GetMapping
    public ResponseEntity<List<Stock>> getAllStocks() {
        List<Stock> stocks = // Retrieve stocks from service
        if (stocks.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);  // 204 - No Content
        }
        return new ResponseEntity<>(stocks, HttpStatus.OK);  // 200 - OK
    }

    // Get stock by id
    @GetMapping("/{id}")
    public ResponseEntity<Stock> getStock(@PathVariable Long id) {
        Stock stock = // Retrieve stock by id from service
        if (stock == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);  // 404 - Not Found
        }
        return new ResponseEntity<>(stock, HttpStatus.OK);  // 200 - OK
    }

    // Buy stock
    @PostMapping("/buy")
    public ResponseEntity<?> buyStock(@Valid @RequestBody StockTransaction transaction) {
        // Validate and process the transaction
        boolean isSuccess = // Call service to process the transaction
        if (isSuccess) {
            return new ResponseEntity<>(HttpStatus.CREATED);  // 201 - Created
        } else {
            return new ResponseEntity<>("Transaction failed", HttpStatus.BAD_REQUEST);  // 400 - Bad Request
        }
    }

    // Sell stock
    @PostMapping("/sell")
    public ResponseEntity<?> sellStock(@Valid @RequestBody StockTransaction transaction) {
        // Validate and process the transaction
        boolean isSuccess = // Call service to process the transaction
        if (isSuccess) {
            return new ResponseEntity<>(HttpStatus.OK);  // 200 - OK
        } else {
            return new ResponseEntity<>("Transaction failed", HttpStatus.BAD_REQUEST);  // 400 - Bad Request
        }
    }
}
