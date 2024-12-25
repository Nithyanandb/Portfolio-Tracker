package Portfolio.Tracker.Service;

import Portfolio.Tracker.DTO.StockTransactionDTO;
import Portfolio.Tracker.Entity.Stock;

import java.util.List;

public interface StockService {
    List<Stock> getAllStocks();
    Stock getStock(Long id);
    Stock buyStock(StockTransactionDTO transaction);
    Stock sellStock(StockTransactionDTO transaction);
}
