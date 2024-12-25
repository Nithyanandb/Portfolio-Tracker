import React from 'react';
import { motion } from 'framer-motion';
import type { MarketData } from '../types/markets';

interface MarketOverviewProps {
  marketData: MarketData[];
  isLoading: boolean;
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({
  marketData,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded-xl p-4 h-24" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {marketData.map((item) => (
        <motion.div
          key={item.symbol}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-4"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-white">{item.symbol}</h3>
              <p className="text-sm text-gray-400">{item.name}</p>
            </div>
            <div className={`text-sm ${item.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {item.changePercent.toFixed(2)}%
            </div>
          </div>
          <div className="mt-2">
            <p className="text-xl font-bold text-white">${item.price.toFixed(2)}</p>
            <p className="text-sm text-gray-400">
              Vol: {(item.volume / 1000000).toFixed(1)}M
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};