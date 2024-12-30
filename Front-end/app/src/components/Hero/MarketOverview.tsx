import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="bg-white/5 backdrop-blur-xl h-24"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {marketData.map((item, index) => (
        <motion.div
          key={item.symbol}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300"
        >
          <div className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white tracking-[0.2em] text-sm font-light">{item.symbol}</h3>
                <p className="text-xs text-gray-400 tracking-wider">{item.name}</p>
              </div>
              <div className={`flex items-center gap-1.5 ${item.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {item.changePercent >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span className="text-xs tracking-wider">
                  {item.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <p className="text-lg text-white font-light tracking-wider tabular-nums">
                ${item.price.toFixed(2)}
              </p>
              <p className="text-xs text-gray-400 tracking-wider tabular-nums">
                Vol: {(item.volume / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MarketOverview;