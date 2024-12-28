import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TransactionHeaderProps {
  name: string;
  symbol: string;
  price: number;
  trend: 'up' | 'down';
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({ name, symbol, price, trend }) => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center justify-between mb-6 p-6 bg-white/5 rounded-xl"
  >
    <div>
      <h1 className="text-2xl font-light tracking-wider text-white">{name}</h1>
      <p className="text-gray-400 tracking-[0.2em]">{symbol}</p>
    </div>
    <div className="text-right">
      <div className="flex items-center gap-2">
        {trend === 'up' ? (
          <ArrowUpCircle className="w-6 h-6 text-green-500" />
        ) : (
          <ArrowDownCircle className="w-6 h-6 text-red-500" />
        )}
        <span className="text-2xl font-light text-white tracking-wider">
          ${price.toFixed(2)}
        </span>
      </div>
      <p className={`text-sm tracking-wider ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
        {trend === 'up' ? '+2.5%' : '-1.8%'} Today
      </p>
    </div>
  </motion.div>
);

export default TransactionHeader;