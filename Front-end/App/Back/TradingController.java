package com.yourapp.trading.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TradingController {

    @Autowired
    private AlgoTradingService algoTradingService;
    
    @Autowired
    private OptionsTradingService optionsTradingService;
    
    @PostMapping("/algo/start")
    public ResponseEntity<?> startAlgoStrategy(@RequestBody AlgoStrategyRequest request) {
        return ResponseEntity.ok(algoTradingService.startStrategy(request));
    }
    
    @PostMapping("/algo/stop/{strategyId}")
    public ResponseEntity<?> stopAlgoStrategy(@PathVariable String strategyId) {
        algoTradingService.stopStrategy(strategyId);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/options/chain")
    public ResponseEntity<?> getOptionChain(
        @RequestParam String symbol,
        @RequestParam String expiryDate
    ) {
        return ResponseEntity.ok(optionsTradingService.getOptionChain(symbol, expiryDate));
    }
    
    @PostMapping("/options/order")
    public ResponseEntity<?> placeOptionOrder(@RequestBody OptionOrderRequest request) {
        return ResponseEntity.ok(optionsTradingService.placeOrder(request));
    }
    
    @GetMapping("/market/data/{symbol}")
    public ResponseEntity<?> getMarketData(@PathVariable String symbol) {
        return ResponseEntity.ok(marketDataService.getMarketData(symbol));
    }
} 