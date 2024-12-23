package Portfolio.Tracker.Controller;

import Portfolio.Tracker.Service.AlphaVantageAPI;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/market")
public class MarketController {

    private final AlphaVantageAPI alphaVantageAPI;

    public MarketController(AlphaVantageAPI alphaVantageAPI) {
        this.alphaVantageAPI = alphaVantageAPI;
    }

    @GetMapping("/stock")
    public ResponseEntity<String> getStockData(@RequestParam String symbol) {
        try {
            // Call the getStockData method from the service
            String data = alphaVantageAPI.getStockData(symbol);
            return ResponseEntity.ok(data);  // Return the stock data as a response
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching stock data");
        }
    }
}
