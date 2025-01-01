package Portfolio.Tracker.Controller;

import Portfolio.Tracker.DTO.*;
import Portfolio.Tracker.Service.StockPriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stocks")
@RequiredArgsConstructor
public class StockController {
    private final StockPriceService stockPriceService;

    @GetMapping("/quote/{symbol}")
    public ResponseEntity<ApiResponse<StockQuote>> getQuote(@PathVariable String symbol) {
        try {
            StockQuote quote = stockPriceService.getQuote(symbol);
            return ResponseEntity.ok(new ApiResponse<>(true, "Quote retrieved successfully", quote));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/info/{symbol}")
    public ResponseEntity<ApiResponse<StockInfo>> getStockInfo(@PathVariable String symbol) {
        try {
            StockInfo info = stockPriceService.getStockInfo(symbol);
            return ResponseEntity.ok(new ApiResponse<>(true, "Stock info retrieved successfully", info));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
}