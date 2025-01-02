import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { formatMoney, formatPercent } from './Portfolio';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  gradientColors: string;
  isPercentage?: boolean;
  isPositive?: boolean;
}

export const StatsCard = ({ 
  title, 
  value, 
  icon: Icon,
  gradientColors,
  isPercentage, 
  isPositive 
}: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 group"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500 ease-out"
           style={{ backgroundImage: gradientColors }} />
      <div className="flex justify-between items-start mb-4">
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <div className={`p-2 rounded-xl bg-gradient-to-br ${gradientColors} bg-opacity-10`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-semibold text-white">
          {isPercentage ? formatPercent(value) : formatMoney(value)}
        </span>
        {isPositive !== undefined && (
          <span className={`text-sm font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}>
            {isPositive ? '↑' : '↓'} {Math.abs(value).toFixed(2)}%
          </span>
        )}
      </div>
    </motion.div>
  );
};