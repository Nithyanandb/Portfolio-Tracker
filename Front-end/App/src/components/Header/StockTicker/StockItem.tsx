import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { StockItemProps } from './stock';

export const StockItem: React.FC<StockItemProps> = ({ stock }) => {
  const isPositive = parseFloat(stock.change) >= 0;

  return (
    <motion.div
      className="inline-flex items-center space-x-2.5 py-1 px-2"
      whileHover={{ scale: 1.02 }}
    >
      {/* Symbol */}
      <span className="text-xs font-medium tracking-wide text-white/90">
        {stock.symbol}
      </span>

      {/* Price */}
      <span className="text-[11px] font-light tracking-wide text-white/70 tabular-nums">
        {stock.price}
      </span>

      {/* Change with premium animation */}
      <motion.div
        className={`flex items-center space-x-0.5 ${
          isPositive ? 'text-emerald-400' : 'text-rose-400'
        }`}
        animate={{
          opacity: [0.85, 1, 0.85],
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
        <span className="text-[11px] font-medium tracking-wide tabular-nums">
          {stock.change}
        </span>
      </motion.div>

      {/* Premium separator */}
      <span className="text-white/10 text-xs font-light">•</span>
    </motion.div>
  );
};