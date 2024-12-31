package com.yourapp.trading.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.yourapp.trading.model.OptionChain;
import com.yourapp.trading.model.OptionOrderRequest;
import com.yourapp.trading.model.OrderResponse;
import com.yourapp.trading.service.MarketDataService;
import com.yourapp.trading.executor.OrderExecutor;

@Service
@Slf4j
public class OptionsTradingService {
    
    @Autowired
    private MarketDataService marketDataService;
    
    @Autowired
    private OrderExecutor orderExecutor;
    
    public OptionChain getOptionChain(String symbol, String expiryDate) {
        log.info("Fetching option chain for {} expiring {}", symbol, expiryDate);
        // Implement your option chain fetching logic
        return marketDataService.getOptionChain(symbol, expiryDate);
    }
    
    public OrderResponse placeOrder(OptionOrderRequest request) {
        log.info("Placing option order: {}", request);
        validateOrder(request);
        return orderExecutor.executeOptionOrder(request);
    }
    
    private void validateOrder(OptionOrderRequest request) {
        // Implement order validation logic
        if (request.getQuantity() <= 0) {
            throw new IllegalArgumentException("Invalid quantity");
        }
        // Add more validation as needed
    }
} 