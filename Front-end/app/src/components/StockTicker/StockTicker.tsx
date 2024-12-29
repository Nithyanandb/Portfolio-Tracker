import React from 'react';
import { motion } from 'framer-motion';

interface Stock {
  symbol: string;
  price: string;
  change: string;
}

const stocks: Stock[] = [
  { symbol: 'NIFTY', price: '21,853.80', change: '+0.42%' },
  { symbol: 'SENSEX', price: '72,085.63', change: '+0.48%' },
  { symbol: 'RELIANCE', price: '2,456.75', change: '+1.23%' },
  { symbol: 'TCS', price: '3,789.20', change: '-0.45%' },
  { symbol: 'HDFC', price: '1,678.90', change: '+0.75%' },
  { symbol: 'INFY', price: '1,567.45', change: '+0.89%' },
  { symbol: 'WIPRO', price: '456.78', change: '-0.23%' },
];

export const StockTicker = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-black/50 backdrop-blur-sm border-b border-gray-800/50 z-10">
      <div className="relative overflow-hidden h-full">
        <motion.div
          className="flex whitespace-nowrap h-full items-center"
          animate={{
            x: [0, -2000],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...stocks, ...stocks].map((stock, index) => (
            <div
              key={`${stock.symbol}-${index}`}
              className="inline-flex items-center px-6 h-full"
            >
              <span className="text-xs font-medium text-white">
                {stock.symbol}
              </span>
              <span className="text-xs text-gray-300 ml-2">
                ₹{stock.price}
              </span>
              <span className={`text-xs ml-2 ${
                stock.change.startsWith('+') 
                  ? 'text-green-400' 
                  : 'text-red-400'
              }`}>
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