package Portfolio.Tracker.Controller;

import Portfolio.Tracker.DTO.*;
import Portfolio.Tracker.Service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/transaction")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @PostMapping("/buy")
    public ResponseEntity<ApiResponse<TransactionResponse>> buyStock(
            @Valid @RequestBody TransactionRequest request,
            Authentication auth) {
        try {
            request.setType("BUY");
            transactionService.processTransaction(request, auth.getName());
            return ResponseEntity.ok(new ApiResponse<>(true, "Buy order executed successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PostMapping("/sell")
    public ResponseEntity<ApiResponse<TransactionResponse>> sellStock(
            @Valid @RequestBody TransactionRequest request,
            Authentication auth) {
        try {
            request.setType("SELL");
            transactionService.processTransaction(request, auth.getName());
            return ResponseEntity.ok(new ApiResponse<>(true, "Sell order executed successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<List<TransactionResponse>>> getTransactionHistory(
            Authentication auth) {
        try {
            List<TransactionResponse> history = transactionService.getTransactionHistory(auth.getName());
            return ResponseEntity.ok(new ApiResponse<>(true, "Transaction history retrieved", history));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
}