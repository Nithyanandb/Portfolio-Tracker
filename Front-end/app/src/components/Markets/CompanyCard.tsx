import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CompanyMetrics } from '../types/market';

interface CompanyCardProps {
  company: CompanyMetrics;
  index: number;
}

const CompanyCard = ({ company, index }: CompanyCardProps) => {
  const isPositive = company.change.startsWith('+');

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-4 hover:bg-white/5 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-white">{company.name}</h3>
          <span className="text-sm text-gray-400">{company.symbol}</span>
        </div>
        <div className="text-right">
          <p className="text-white font-medium">${company.price}</p>
          <span className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            {company.change}
          </span>
        </div>
      </div>
      
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div className="text-gray-400">
          Vol: <span className="text-white">{company.volume}</span>
        </div>
        <div className="text-gray-400">
          MCap: <span className="text-white">{company.marketCap}</span>
        </div>
        <div className="text-gray-400 col-span-2">
          Day Range: <span className="text-white">{company.dayRange}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CompanyCard;