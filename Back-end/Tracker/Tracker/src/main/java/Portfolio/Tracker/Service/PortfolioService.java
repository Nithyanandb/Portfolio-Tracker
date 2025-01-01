package Portfolio.Tracker.Service;

import Portfolio.Tracker.DTO.*;
import Portfolio.Tracker.Entity.*;
import Portfolio.Tracker.Repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;
    private final StockPriceService stockPriceService;

    public List<PortfolioResponse> getPortfolioByUser(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        List<Portfolio> portfolios = portfolioRepository.findByUser(user);
        
        return portfolios.stream()
            .map(this::updateAndMapToResponse)
            .collect(Collectors.toList());
    }

    private PortfolioResponse updateAndMapToResponse(Portfolio portfolio) {
        StockQuote quote = stockPriceService.getQuote(portfolio.getSymbol());
        
        portfolio.setCurrentPrice(quote.getCurrentPrice());
        portfolio.setLastUpdated(LocalDateTime.now());
        portfolioRepository.save(portfolio);

        return PortfolioResponse.builder()
            .id(portfolio.getId())
            .symbol(portfolio.getSymbol())
            .name(portfolio.getName())
            .shares(portfolio.getQuantity())
            .value(quote.getCurrentPrice() * portfolio.getQuantity())
            .change(quote.getDayChangePercent())
            .averagePrice(portfolio.getAveragePrice())
            .currentPrice(quote.getCurrentPrice())
            .totalReturn(((quote.getCurrentPrice() - portfolio.getAveragePrice()) 
                / portfolio.getAveragePrice()) * 100)
            .build();
    }

    public PortfolioStats getPortfolioStats(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        List<Portfolio> portfolios = portfolioRepository.findByUser(user);
        
        if (portfolios.isEmpty()) {
            return createEmptyStats();
        }

        double totalValue = 0;
        double totalCost = 0;
        double todayChange = 0;

        for (Portfolio portfolio : portfolios) {
            StockQuote quote = stockPriceService.getQuote(portfolio.getSymbol());
            double marketValue = quote.getCurrentPrice() * portfolio.getQuantity();
            
            totalValue += marketValue;
            totalCost += portfolio.getAveragePrice() * portfolio.getQuantity();
            todayChange += (quote.getDayChangePercent() * marketValue) / 100;
        }

        return PortfolioStats.builder()
            .totalValue(totalValue)
            .todayChange(todayChange)
            .totalReturn(((totalValue - totalCost) / totalCost) * 100)
            .totalPositions(portfolios.size())
            .build();
    }

    private PortfolioStats createEmptyStats() {
        return PortfolioStats.builder()
            .totalValue(0.0)
            .todayChange(0.0)
            .totalReturn(0.0)
            .totalPositions(0)
            .build();
    }
}