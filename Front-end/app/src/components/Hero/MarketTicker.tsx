import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { MarketData } from '../types/market';

interface MarketTickerProps {
  data: MarketData;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({ data }) => {
  const isPositive = data.changePercent >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 hover:bg-white/10 rounded-lg p-3 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-white">{data.symbol}</h3>
          <p className="text-sm text-gray-400">{data.name}</p>
        </div>
        <div className="text-right">
          <p className="text-white font-medium">${data.price.toFixed(2)}</p>
          <div className={`flex items-center text-sm ${
            isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {data.changePercent.toFixed(2)}%
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MarketTicker;