import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const stocks = [

    { "symbol": "NFLX", "price": "412.90", "change": "+2.3%", "trending": true },
    { "symbol": "NVDA", "price": "476.52", "change": "+1.8%", "trending": true },
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
  return (
    <div className="overflow-hidden" style={{marginTop:'-10px'}}>
      <div className="flex space-x-12">
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex space-x-12 whitespace-nowrap"
        >
          {[...stocks, ...stocks].map((stock, index) => (
            <div key={index} className="flex items-center space-x-3">
              <span className="text-white font-medium">{stock.symbol}</span>
              <span className="text-gray-400">${stock.price}</span>
              <span className={`flex items-center ${stock.trending ? 'text-green-500' : 'text-red-500'}`}>
                {stock.trending ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {stock.change}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StockTicker;