package Portfolio.Tracker.Service;

import Portfolio.Tracker.Entity.Transaction;
import Portfolio.Tracker.Entity.UserStock;
import Portfolio.Tracker.Repository.TransactionRepository;
import Portfolio.Tracker.Repository.UserStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserStockService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserStockRepository userStockRepository;


    public UserStockService(TransactionRepository transactionRepository, UserStockRepository userStockRepository) {
        this.transactionRepository = transactionRepository;
        this.userStockRepository = userStockRepository;
    }

    public UserStock getUserStockInfo(Long userId, String stockSymbol) {
        List<Transaction> transactions = transactionRepository.findByStockSymbolAndUserId(stockSymbol, userId);

        if (transactions.isEmpty()) {
            throw new ResourceNotFoundException("No transactions found for this stock and user.");
        }

        int totalQuantity = 0;
        double totalPrice = 0;

        // Calculate total quantity and total price
        for (Transaction transaction : transactions) {
            totalQuantity += transaction.getQuantity();
            totalPrice += transaction.getQuantity() * transaction.getPrice();
        }

        double averagePrice = totalPrice / totalQuantity;

        UserStock userStock = userStockRepository.findByUserIdAndTransactionStockSymbol(userId, stockSymbol)
                .orElse(new UserStock());

        userStock.setQuantity(totalQuantity);
        userStock.setAveragePrice(averagePrice);

        // Save or update user stock
        userStockRepository.save(userStock);

        return userStock;
    }
}
