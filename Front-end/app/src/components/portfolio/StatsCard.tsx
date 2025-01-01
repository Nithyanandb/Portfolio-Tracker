import React from 'react';
import { motion } from 'framer-motion';
import { formatMoney, formatPercent } from './Portfolio';

interface StatsCardProps {
  title: string;
  value: number;
  isPercentage?: boolean;
  isPositive?: boolean;
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  isPercentage, 
  isPositive 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className={`text-2xl font-bold mt-2 ${
        isPositive !== undefined
          ? isPositive
            ? 'text-green-600'
            : 'text-red-600'
          : 'text-gray-900'
      }`}>
        {isPercentage ? formatPercent(value) : formatMoney(value)}
      </p>
    </motion.div>
  );
};