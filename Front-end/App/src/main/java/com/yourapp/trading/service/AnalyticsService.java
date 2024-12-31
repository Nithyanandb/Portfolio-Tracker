package com.yourapp.trading.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;

@Service
@Slf4j
public class AnalyticsService {
    
    @Autowired
    private TradeRepository tradeRepository;
    
    public StrategyPerformance calculateStrategyPerformance(String strategyId) {
        List<Trade> trades = tradeRepository.findByStrategyId(strategyId);
        
        return StrategyPerformance.builder()
            .totalTrades(trades.size())
            .winRate(calculateWinRate(trades))
            .profitFactor(calculateProfitFactor(trades))
            .sharpeRatio(calculateSharpeRatio(trades))
            .maxDrawdown(calculateMaxDrawdown(trades))
            .build();
    }
    
    private Double calculateWinRate(List<Trade> trades) {
        long winningTrades = trades.stream()
            .filter(t -> t.getPnl() > 0)
            .count();
        return (double) winningTrades / trades.size();
    }
    
    // Additional analytics methods...
} 