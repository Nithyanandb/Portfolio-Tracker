import React from 'react';
import { motion } from 'framer-motion';
import { MarketData } from '../../types/market';

interface MarketGridProps {
  data: MarketData[];
}

const MarketGrid: React.FC<MarketGridProps> = ({ data }) => {
  return (
    <div className="grid xs:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item, index) => (
        <motion.div
          key={item.symbol}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-sm text-gray-400 tracking-[0.2em]">{item.symbol}</p>
              <p className="text-2xl font-light text-white">${item.price.toFixed(2)}</p>
            </div>
            <div 
              className={`text-sm font-light tracking-wider ${
                item.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MarketGrid;