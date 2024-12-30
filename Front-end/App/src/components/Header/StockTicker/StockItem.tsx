import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Stock } from './stock';

interface StockItemProps {
  stock: Stock;
}

export const StockItem: React.FC<StockItemProps> = ({ stock }) => {
  const TrendIcon = stock.trending ? TrendingUp : TrendingDown;
  
  return (
    <motion.div 
      className="flex items-center space-x-3 group px-4 py-2 rounded-lg transition-colors"
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
        className={`flex items-center text-xs ${
          stock.trending ? 'text-green-400' : 'text-red-400'
        }`}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 20, repeat: Infinity }}
      >
        <TrendIcon className="h-3 w-3 mr-1" />
        {stock.change}
      </motion.span>
    </motion.div>
  );
};