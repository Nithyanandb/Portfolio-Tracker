package Portfolio.Tracker.Service;

import Portfolio.Tracker.Entity.Stock;
import Portfolio.Tracker.Repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    public Stock addStock(Stock stock) {
        // Ensure that BigDecimal values are properly set
        stock.setPurchase_Price(BigDecimal.valueOf(stock.getPurchase_Price().doubleValue())); // Convert to BigDecimal
        stock.setCurrent_Price(BigDecimal.valueOf(stock.getCurrent_Price().doubleValue())); // Convert to BigDecimal
        stock.setProfit_Loss(BigDecimal.valueOf(stock.getProfit_Loss().doubleValue())); // Convert to BigDecimal
        stock.setDay_Change_Percentage(BigDecimal.valueOf(stock.getDay_Change_Percentage().doubleValue())); // Convert to BigDecimal
        return stockRepository.save(stock);
    }

    public Stock updateStock(Long id, Stock updatedStock) {
        Stock stock = stockRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stock not found"));

        // Update stock fields with BigDecimal values
        stock.setSymbol(updatedStock.getSymbol());
        stock.setQuantity(updatedStock.getQuantity());
        stock.setPurchase_Price(BigDecimal.valueOf(updatedStock.getPurchase_Price().doubleValue())); // Convert to BigDecimal
        stock.setCurrent_Price(BigDecimal.valueOf(updatedStock.getCurrent_Price().doubleValue())); // Convert to BigDecimal
        stock.setProfit_Loss(BigDecimal.valueOf(updatedStock.getProfit_Loss().doubleValue())); // Convert to BigDecimal
        stock.setPortfolio_Id(updatedStock.getPortfolio_Id());
        stock.setPurchase_Date(updatedStock.getPurchase_Date());
        stock.setUpdated_Date(updatedStock.getUpdated_Date());
        stock.setExchange(updatedStock.getExchange());
        stock.setSector(updatedStock.getSector());
        stock.setDay_Change_Percentage(BigDecimal.valueOf(updatedStock.getDay_Change_Percentage().doubleValue())); // Convert to BigDecimal
        stock.setType(updatedStock.getType());

        return stockRepository.save(stock);
    }

    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public BigDecimal calculatePortfolioValue(List<Stock> stocks) {
        return stocks.stream()
                .map(stock -> stock.getPurchase_Price().multiply(BigDecimal.valueOf(stock.getQuantity()))) // Use BigDecimal for calculation
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
