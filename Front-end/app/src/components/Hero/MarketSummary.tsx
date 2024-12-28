import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { formatCurrency, formatPercentage } from './formatters';

interface MarketSummaryProps {
  data: any;
}

const MarketSummary: React.FC<MarketSummaryProps> = ({ data }) => {
  if (!data) return null;

  const indices = [
    { name: 'S&P 500', value: data.sp500, icon: Activity },
    { name: 'DOW JONES', value: data.dowJones, icon: Activity },
    { name: 'NASDAQ', value: data.nasdaq, icon: Activity },
  ];

  return (
    <div className="relative grid grid-cols-3 gap-6 p-6 border-b border-white/10">
      {indices.map((index, i) => {
        const isPositive = index.value.changePercent >= 0;
        return (
          <motion.div
            key={index.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative group"
          >
            <div className="text-left space-y-3">
              <h3 className="text-sm text-gray-400 tracking-[0.2em] font-light">
                {index.name}
              </h3>
              <p className="text-2xl text-white font-light tracking-wider">
                {formatCurrency(index.value.price)}
              </p>
              <div className={`flex items-center gap-2 ${
                isPositive ? 'text-green-400' : 'text-red-400'
              }`}>
                {isPositive ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                <span className="font-light tracking-wider">
                  {formatPercentage(index.value.changePercent)}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default MarketSummary;