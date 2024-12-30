import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

// Updated stock data with more tech and space companies
const stocks = [
  { symbol: "TSLA", price: "238.45", change: "+3.2%", trending: true },
  { symbol: "SPCE", price: "1.85", change: "+2.1%", trending: true },
  { symbol: "RKLB", price: "4.92", change: "+1.8%", trending: true },
  { symbol: "AAPL", price: "173.50", change: "+1.2%", trending: true },
  { symbol: "MSFT", price: "378.85", change: "+0.8%", trending: true },
  { symbol: "NVDA", price: "476.52", change: "+1.8%", trending: true },
  { symbol: "PLTR", price: "15.87", change: "+4.2%", trending: true },
  { symbol: "AI", price: "32.45", change: "+2.7%", trending: true },
  { "symbol": "GOOGL", "price": "138.21", "change": "-0.5%", "trending": false },
  { "symbol": "META", "price": "342.15", "change": "+2.1%", "trending": true },
  { "symbol": "AMZN", "price": "145.68", "change": "+0.9%", "trending": true },
  { "symbol": "NFLX", "price": "412.90", "change": "+2.3%", "trending": true },
  { "symbol": "BA", "price": "196.22", "change": "-0.9%", "trending": false },
  { "symbol": "DIS", "price": "91.10", "change": "+0.5%", "trending": false },
  { "symbol": "AMD", "price": "102.56", "change": "+2.1%", "trending": true },
  { "symbol": "INTC", "price": "35.84", "change": "-1.5%", "trending": false },
  { "symbol": "XOM", "price": "115.78", "change": "+0.6%", "trending": true },
  { "symbol": "CVX", "price": "167.29", "change": "-0.4%", "trending": false },
  { "symbol": "WMT", "price": "159.34", "change": "+0.3%", "trending": true },
  { "symbol": "PFE", "price": "34.89", "change": "-1.0%", "trending": false },
  { "symbol": "JNJ", "price": "160.50", "change": "+1.2%", "trending": true },
  { "symbol": "V", "price": "244.17", "change": "+0.9%", "trending": true },
  { "symbol": "MA", "price": "400.23", "change": "+1.7%", "trending": true },
  { "symbol": "SPOT", "price": "152.62", "change": "-0.7%", "trending": false },
  { "symbol": "ADBE", "price": "539.29", "change": "+2.5%", "trending": true },
  { "symbol": "CRM", "price": "211.65", "change": "+1.1%", "trending": true },
  { "symbol": "BABA", "price": "86.34", "change": "-0.3%", "trending": false },
  { "symbol": "T", "price": "15.92", "change": "+0.4%", "trending": true },
  { "symbol": "KO", "price": "58.31", "change": "-0.2%", "trending": false },
  { "symbol": "PEP", "price": "174.42", "change": "+0.7%", "trending": true }
];

const StockTicker = () => {
  const controls = useAnimation();
  
  useEffect(() => {
    const animate = async () => {
      await controls.start({
          x: [0, -400],
        transition: {
          duration: 10,
          ease: "linear",
          repeat: Infinity,
        }
      });
    };
    animate();
  }, [controls]);

  return (
    <div className="relative justify-center items-center ml-300 bg-black/40 backdrop-blur-xl overflow-hidden">
      {/* SpaceX-style grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0"  />
      </div>

      {/* Gradient fade edges */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-black via-black/80 to-transparent"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-black via-black/80 to-transparent"
      />

      <div className="flex space-x-12">
        <motion.div
          animate={controls}
          className="flex space-x-12 items-center px-6"
        >
          {[...stocks, ...stocks].map((stock, index) => (
            <motion.div 
              key={index}
              className="flex items-center space-x-3 group"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(255,255,255,0.05)',
              }}
            >
              <span className="text-sm text-white tracking-[0.2em] font-light">
                {stock.symbol}
              </span>
              <span className="text-sm text-gray-400 tracking-wider">
                ${stock.price}
              </span>
              <motion.span 
                className={`flex items-center text-xs ${stock.trending ? 'text-green-400' : 'text-red-400'}`}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 20, repeat: Infinity }}
              >
                {stock.trending ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {stock.change}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StockTicker;