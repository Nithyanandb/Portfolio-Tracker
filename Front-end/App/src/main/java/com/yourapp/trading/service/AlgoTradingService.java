package com.yourapp.trading.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.yourapp.trading.model.AlgoStrategyRequest;
import com.yourapp.trading.model.StrategyResponse;
import com.yourapp.trading.model.Strategy;
import com.yourapp.trading.executor.StrategyExecutor;
import com.yourapp.trading.model.MarketDataService;

@Service
@Slf4j
public class AlgoTradingService {
    
    @Autowired
    private MarketDataService marketDataService;
    
    @Autowired
    private StrategyExecutor strategyExecutor;
    
    public StrategyResponse startStrategy(AlgoStrategyRequest request) {
        log.info("Starting strategy: {}", request.getStrategyId());
        Strategy strategy = createStrategy(request);
        strategyExecutor.execute(strategy);
        return new StrategyResponse(strategy.getId(), "RUNNING");
    }
    
    public void stopStrategy(String strategyId) {
        log.info("Stopping strategy: {}", strategyId);
        strategyExecutor.stop(strategyId);
    }
    
    private Strategy createStrategy(AlgoStrategyRequest request) {
        // Implementation depends on your strategy types
        return switch (request.getStrategyId()) {
            case "ma_crossover" -> new MACrossoverStrategy(request.getConfig());
            case "rsi_divergence" -> new RSIDivergenceStrategy(request.getConfig());
            case "grid_trading" -> new GridTradingStrategy(request.getConfig());
            default -> throw new IllegalArgumentException("Unknown strategy");
        };
    }
} 