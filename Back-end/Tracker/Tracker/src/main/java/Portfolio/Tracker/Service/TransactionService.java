package Portfolio.Tracker.Service;

import Portfolio.Tracker.DTO.*;
import Portfolio.Tracker.Entity.*;
import Portfolio.Tracker.Repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;
    private final StockPriceService stockPriceService;

    @Transactional
    public void processTransaction(TransactionRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("User not found"));

        StockQuote quote = stockPriceService.getQuote(request.getStockSymbol());
        validateTransaction(request, quote);

        Portfolio portfolio = getOrCreatePortfolio(user, request);
        updatePortfolio(portfolio, request, quote);
        saveTransaction(user, request, quote);
    }

    private void validateTransaction(TransactionRequest request, StockQuote quote) {
        if (quote == null) {
            throw new RuntimeException("Unable to fetch current stock price");
        }
        if ("SELL".equals(request.getType())) {
            Portfolio portfolio = portfolioRepository
                .findByUserAndSymbol(userRepository.findByEmail(SecurityContextHolder.getContext()
                    .getAuthentication().getName()).orElseThrow(), request.getStockSymbol())
                .orElseThrow(() -> new RuntimeException("Portfolio not found"));
                
            if (portfolio.getQuantity() < request.getQuantity()) {
                throw new RuntimeException("Insufficient shares to sell");
            }
        }
    }

    private Portfolio getOrCreatePortfolio(User user, TransactionRequest request) {
        return portfolioRepository.findByUserAndSymbol(user, request.getStockSymbol())
            .orElseGet(() -> {
                Portfolio newPortfolio = new Portfolio();
                newPortfolio.setUser(user);
                newPortfolio.setSymbol(request.getStockSymbol());
                newPortfolio.setName(request.getStockName());
                newPortfolio.setQuantity(0);
                newPortfolio.setAveragePrice(0.0);
                return newPortfolio;
            });
    }

    private void updatePortfolio(Portfolio portfolio, TransactionRequest request, StockQuote quote) {
        int newQuantity = "BUY".equals(request.getType())
                ? portfolio.getQuantity() + request.getQuantity()
                : portfolio.getQuantity() - request.getQuantity();

        double newTotalCost = "BUY".equals(request.getType())
                ? (portfolio.getAveragePrice() * portfolio.getQuantity()) + (quote.getCurrentPrice() * request.getQuantity())
                : portfolio.getAveragePrice() * newQuantity;

        portfolio.setQuantity(newQuantity);
        portfolio.setAveragePrice(newQuantity > 0 ? newTotalCost / newQuantity : 0);
        portfolio.setCurrentPrice(quote.getCurrentPrice());
        portfolio.setLastUpdated(LocalDateTime.now());

        portfolioRepository.save(portfolio);
    }

    private void saveTransaction(User user, TransactionRequest request, StockQuote quote) {
        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setSymbol(request.getStockSymbol());
        transaction.setType(request.getType());
        transaction.setQuantity(request.getQuantity());
        transaction.setPrice(quote.getCurrentPrice());
        transaction.setStatus("COMPLETED");
        transactionRepository.save(transaction);
    }


    public List<TransactionResponse> getTransactionHistory(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return transactionRepository.findByUser(user).stream()
            .map(this::mapToResponse)
            .collect(Collectors.toList());
    }

    private TransactionResponse mapToResponse(Transaction transaction) {
        return TransactionResponse.builder()
            .id(transaction.getId())
            .symbol(transaction.getSymbol())
            .type(transaction.getType())
            .quantity(transaction.getQuantity())
            .price(transaction.getPrice())
            .totalAmount(transaction.getTotalAmount())
            .status(transaction.getStatus())
            .date(transaction.getDate())
            .build();
    }
}