package Portfolio.Tracker.Service;

import Portfolio.Tracker.DTO.StockTransactionDTO;
import Portfolio.Tracker.Entity.Stock;


import java.util.List;

public interface StockService {

    /**
     * Retrieve all stocks from the repository.
     *
     * @return List of all stocks
     */
    List<Stock> getAllStocks();

    /**
     * Retrieve a specific stock by its ID.
     *
     * @param id Stock ID
     * @return Stock object
     */
    Stock getStock(Long id);

    /**
     * Buy stock by increasing its quantity and updating the price.
     *
     * @param transaction Details of the stock transaction
     * @return Updated Stock object
     */
    Stock buyStock(StockTransactionDTO transaction);

    /**
     * Sell stock by reducing its quantity.
     *
     * @param transaction Details of the stock transaction
     * @return Updated Stock object
     */
    Stock sellStock(StockTransactionDTO transaction);
}
