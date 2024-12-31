package com.yourapp.trading.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.yourapp.trading.repository.TradeRepository;
import com.yourapp.trading.entity.Trade;
import com.yourapp.trading.entity.TradeRequest;
import com.yourapp.trading.exception.TradeNotFoundException;
import com.yourapp.trading.manager.RiskManager;

@Service
@Slf4j
public class TradeService {
    
    @Autowired
    private TradeRepository tradeRepository;
    
    @Autowired
    private RiskManager riskManager;
    
    public Trade openTrade(TradeRequest request) {
        riskManager.validateTrade(request);
        
        Trade trade = Trade.builder()
            .symbol(request.getSymbol())
            .strategyId(request.getStrategyId())
            .type(request.getType())
            .entryPrice(request.getPrice())
            .quantity(request.getQuantity())
            .status("OPEN")
            .build();
            
        return tradeRepository.save(trade);
    }
    
    public Trade closeTrade(Long tradeId, Double exitPrice) {
        Trade trade = tradeRepository.findById(tradeId)
            .orElseThrow(() -> new TradeNotFoundException("Trade not found: " + tradeId));
            
        trade.setExitPrice(exitPrice);
        trade.setStatus("CLOSED");
        trade.setPnl(calculatePnL(trade));
        
        return tradeRepository.save(trade);
    }
    
    private Double calculatePnL(Trade trade) {
        double pnl = (trade.getExitPrice() - trade.getEntryPrice()) * trade.getQuantity();
        return trade.getType().equals("SHORT") ? -pnl : pnl;
    }
} 