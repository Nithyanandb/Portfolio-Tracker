package Portfolio.Tracker.Service;

import Portfolio.Tracker.Entity.Transaction;
import Portfolio.Tracker.Repository.TransactionRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }


    public Transaction saveTransaction(String type, String stockSymbol, String stockName, int quantity, double price) {
        Transaction transaction = new Transaction();
        transaction.setType(type);
        transaction.setStockSymbol(stockSymbol);
        transaction.setStockName(stockName);
        transaction.setQuantity(quantity);
        transaction.setPrice(price);
        transaction.setTimestamp(LocalDateTime.now());

        System.out.println("Saving transaction: " + transaction);


        return transactionRepository.save(transaction);
    }
}
