import React from 'react';
import { motion } from 'framer-motion';
import { formatMoney } from './Portfolio';

interface Holding {
  symbol: string;
  name: string;
  value: number;
  change: number;
}

interface HoldingsListProps {
  holdings: Holding[];
}

export const HoldingsList = ({ holdings }: HoldingsListProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
    >
      <h2 className="text-xl font-semibold text-white mb-6">Top Holdings</h2>
      <div className="space-y-4">
        {holdings.map((holding) => (
          <div 
            key={holding.symbol}
            className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            <div>
              <h3 className="font-medium text-white group-hover:text-white/90">{holding.symbol}</h3>
              <p className="text-sm text-gray-400 group-hover:text-gray-300">{holding.name}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-white group-hover:text-white/90">
                {formatMoney(holding.value)}
              </p>
              <p className={`text-sm ${
                holding.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {holding.change >= 0 ? '+' : ''}{holding.change}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};