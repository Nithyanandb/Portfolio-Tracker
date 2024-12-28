package Portfolio.Tracker.Service;

import Portfolio.Tracker.DTO.RecommendationDTO;
import Portfolio.Tracker.Service.StockPriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationService {
    private final StockPriceService stockPriceService;

    public List<RecommendationDTO> getRecommendations() {
        // Example list of popular stocks - you can modify this based on your needs
        List<String> popularStocks = Arrays.asList("AAPL", "GOOGL", "MSFT", "AMZN", "TSLA");
        
        return popularStocks.stream()
            .map(symbol -> {
                double currentPrice = stockPriceService.getCurrentPrice(symbol);
                return new RecommendationDTO(
                    symbol,
                    currentPrice,
                    "Popular tech stock"  // You can add more sophisticated descriptions
                );
            })
            .collect(Collectors.toList());
    }
} 