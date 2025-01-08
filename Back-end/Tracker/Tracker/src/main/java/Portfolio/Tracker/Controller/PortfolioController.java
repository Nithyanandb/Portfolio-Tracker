package Portfolio.Tracker.Controller;

import Portfolio.Tracker.DTO.*;
import Portfolio.Tracker.Service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/portfolio")
@RequiredArgsConstructor
public class PortfolioController {
    private final PortfolioService portfolioService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PortfolioResponse>>> getPortfolio(Authentication auth) {
        try {
            List<PortfolioResponse> portfolio = portfolioService.getPortfolioByUser(auth.getName());
            System.out.println("Portfolio Response: " + portfolio); // Log the response
            return ResponseEntity.ok(new ApiResponse<>(true, "Portfolio retrieved successfully", portfolio));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<PortfolioStats>> getStats(Authentication auth) {
        try {
            PortfolioStats stats = portfolioService.getPortfolioStats(auth.getName());
            return ResponseEntity.ok(new ApiResponse<>(true, "Stats retrieved successfully", stats));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
}