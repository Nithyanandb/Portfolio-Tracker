package com.yourapp.trading.executor;

import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Component
@Slf4j
public class StrategyExecutor {
    
    private final Map<String, Strategy> runningStrategies = new ConcurrentHashMap<>();
    private final ExecutorService executorService = Executors.newCachedThreadPool();
    
    public void execute(Strategy strategy) {
        runningStrategies.put(strategy.getId(), strategy);
        executorService.submit(() -> {
            try {
                strategy.run();
            } catch (Exception e) {
                log.error("Strategy execution error", e);
                stop(strategy.getId());
            }
        });
    }
    
    public void stop(String strategyId) {
        Strategy strategy = runningStrategies.remove(strategyId);
        if (strategy != null) {
            strategy.stop();
        }
    }
} 