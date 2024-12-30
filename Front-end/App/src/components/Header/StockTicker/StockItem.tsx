import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Stock } from './stock';

interface StockItemProps {
  stock: Stock;
}

export const StockItem: React.FC<StockItemProps> = ({ stock }) => {
  const isPositive = stock.change.startsWith('+');

  return (
    <motion.div
      className="inline-flex items-center gap-1.5 py-0.5 px-1.5 rounded-md hover:bg-white/5 transition-colors duration-300"
      whileHover={{ scale: 1.02 }}
    >
      <span className="text-xs font-medium tracking-wide text-white/90">
        {stock.symbol}
      </span>

      <span className="text-[10px] font-light tracking-wide text-white/70 tabular-nums">
        ${stock.price}
      </span>

      <motion.div
        className={`flex items-center gap-0.5 ${
          isPositive ? 'text-emerald-400' : 'text-rose-400'
        }`}
        animate={{
          opacity: stock.trending ? [0.7, 1, 0.7] : 1,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {isPositive ? (
          <TrendingUp className="w-2.5 h-2.5" />
        ) : (
          <TrendingDown className="w-2.5 h-2.5" />
        )}
        <span className="text-[10px] font-medium tracking-wide tabular-nums">
          {stock.change}
        </span>
      </motion.div>
    </motion.div>
  );
};