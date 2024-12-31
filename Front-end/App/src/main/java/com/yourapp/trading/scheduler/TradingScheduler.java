package com.yourapp.trading.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.yourapp.trading.service.MarketDataService;
import com.yourapp.trading.service.AnalyticsService;

@Component
@Slf4j
public class TradingScheduler {
    
    @Autowired
    private MarketDataService marketDataService;
    
    @Autowired
    private AnalyticsService analyticsService;
    
    @Scheduled(fixedRate = 60000) // Every minute
    public void updateMarketData() {
        try {
            marketDataService.refreshMarketData();
        } catch (Exception e) {
            log.error("Error updating market data", e);
        }
    }
    
    @Scheduled(cron = "0 0 * * * *") // Every hour
    public void calculatePerformanceMetrics() {
        try {
            analyticsService.updateAllStrategyPerformance();
        } catch (Exception e) {
            log.error("Error calculating performance metrics", e);
        }
    }
} 