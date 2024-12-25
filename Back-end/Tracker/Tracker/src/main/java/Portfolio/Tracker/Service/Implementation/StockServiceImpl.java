package Portfolio.Tracker.Service.Implementation;

import Portfolio.Tracker.DTO.StockTransactionDTO;
import Portfolio.Tracker.Entity.Stock;
import Portfolio.Tracker.Repository.StockRepository;
import Portfolio.Tracker.Service.StockService;
import com.example.stockmanagement.exception.InsufficientStockException;
import com.example.stockmanagement.exception.StockNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service

public class StockServiceImpl implements StockService {
    private final StockRepository stockRepository;

    public StockServiceImpl(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    @Override
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    @Override
    public Stock getStock(Long id) {
        return stockRepository.findById(id)
            .orElseThrow(() -> new StockNotFoundException(id));
    }

    @Override
    @Transactional
    public Stock buyStock(StockTransactionDTO transaction) {
        Stock stock = stockRepository.findWithLockById(transaction.getStockId())
            .orElseThrow(() -> new StockNotFoundException(transaction.getStockId()));

        stock.setQuantity(stock.getQuantity() + transaction.getQuantity());
        stock.setPrice(transaction.getPrice());
        
        return stockRepository.save(stock);
    }

    @Override
    @Transactional
    public Stock sellStock(StockTransactionDTO transaction) {
        Stock stock = stockRepository.findWithLockById(transaction.getStockId())
            .orElseThrow(() -> new StockNotFoundException(transaction.getStockId()));

        if (stock.getQuantity() < transaction.getQuantity()) {
            throw new InsufficientStockException(stock.getSymbol());
        }

        stock.setQuantity(stock.getQuantity() - transaction.getQuantity());
        stock.setPrice(transaction.getPrice());
        
        return stockRepository.save(stock);
    }
}