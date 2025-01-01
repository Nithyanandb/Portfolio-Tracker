import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioHolding } from './Portfolio';

interface PortfolioListProps {
  holdings: PortfolioHolding[];
}

export const PortfolioList: React.FC<PortfolioListProps> = ({ holdings }) => {
  return (
    <div className="space-y-4">
      {holdings.map((holding) => (
        <motion.div
          key={holding.symbol}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-white">{holding.symbol}</h3>
              <p className="text-sm text-white/60">{holding.name}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-medium text-white">
                {holding.quantity} shares
              </p>
              <p className="text-sm text-white/60">
                Avg Price: ₹{holding.averagePrice.toFixed(2)}
              </p>
              <p className="text-sm text-emerald-400">
                Value: ₹{(holding.quantity * holding.currentPrice).toFixed(2)}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};