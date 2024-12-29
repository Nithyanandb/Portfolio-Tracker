package Portfolio.Tracker.Service;

import Portfolio.Tracker.DTO.PortfolioResponse;
import Portfolio.Tracker.DTO.TransactionRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Page;

public interface TransactionService {
    ResponseEntity<?> executeBuyOrder(TransactionRequest request);
    ResponseEntity<?> executeSellOrder(TransactionRequest request);
    ResponseEntity<?> getTransactionHistory(String symbol, int page, int size);
    PortfolioResponse getCurrentPortfolio();
    ResponseEntity<?> getPortfolioPerformance(int days);
}
