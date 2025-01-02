import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface MarketOverviewProps {
  indices: MarketIndex[];
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({ indices }) => {
  return (
    <div className="border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
          {indices.map((index) => (
            <motion.div
              key={index.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-shrink-0"
            >
              <div className="text-sm text-gray-400">{index.name}</div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium">{index.price.toLocaleString()}</span>
                <span className={`flex items-center text-sm ${
                  index.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {index.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {index.changePercent.toFixed(2)}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};