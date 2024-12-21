package Portfolio.Tracker.Service;

import Portfolio.Tracker.Entity.Stock;
import Portfolio.Tracker.Repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    // Add stock to the portfolio
    public Stock addStock(Stock stock) {
        // Ensure that BigDecimal values are properly set
        stock.setPurchase_Price(convertToBigDecimal(stock.getPurchase_Price()));
        stock.setCurrent_Price(convertToBigDecimal(stock.getCurrent_Price()));
        stock.setProfit_Loss(convertToBigDecimal(stock.getProfit_Loss()));
        stock.setDay_Change_Percentage(convertToBigDecimal(stock.getDay_Change_Percentage()));
        return stockRepository.save(stock);
    }

    // Update stock in the portfolio
    public Stock updateStock(Long id, Stock updatedStock) {
        Stock stock = stockRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stock not found"));

        // Update stock fields with BigDecimal values
        stock.setSymbol(updatedStock.getSymbol());
        stock.setQuantity(updatedStock.getQuantity());
        stock.setPurchase_Price(convertToBigDecimal(updatedStock.getPurchase_Price()));
        stock.setCurrent_Price(convertToBigDecimal(updatedStock.getCurrent_Price()));
        stock.setProfit_Loss(convertToBigDecimal(updatedStock.getProfit_Loss()));
        stock.setPortfolio_Id(updatedStock.getPortfolio_Id());
        stock.setPurchase_Date(updatedStock.getPurchase_Date());
        stock.setUpdated_Date(updatedStock.getUpdated_Date());
        stock.setExchange(updatedStock.getExchange());
        stock.setSector(updatedStock.getSector());
        stock.setDay_Change_Percentage(convertToBigDecimal(updatedStock.getDay_Change_Percentage()));
        stock.setType(updatedStock.getType());

        return stockRepository.save(stock);
    }

    // Delete stock from the portfolio
    public boolean deleteStock(Long id) {
        Optional<Stock> stock = stockRepository.findById(id);
        if (stock.isPresent()) {
            stockRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Get all stocks in the portfolio
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    // Calculate the portfolio value by summing the purchase price * quantity of each stock
    public BigDecimal calculatePortfolioValue(List<Stock> stocks) {
        return stocks.stream()
                .map(stock -> stock.getPurchase_Price().multiply(BigDecimal.valueOf(stock.getQuantity()))) // Use BigDecimal for calculation
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // Helper method to convert to BigDecimal (used for consistency)
    private BigDecimal convertToBigDecimal(BigDecimal value) {
        return value != null ? value : BigDecimal.ZERO; // Handle null values, return zero if null
    }
}
