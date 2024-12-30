import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart2 } from 'lucide-react';

const MarketMetrics: React.FC = () => {
  const metrics = [
    {
      label: 'Market Cap',
      value: '$2.84T',
      change: '+2.4%',
      icon: DollarSign,
      positive: true
    },
    {
      label: 'Volume',
      value: '127.8M',
      change: '-1.2%',
      icon: Activity,
      positive: false
    },
    {
      label: 'Volatility',
      value: '14.2',
      change: '+0.8%',
      icon: BarChart2,
      positive: true
    }
  ];

  return (
    <div className="relative p-6">
      {/* Premium glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
      
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <metric.icon className="w-5 h-5 text-white/60" />
                  <span className="text-sm text-white/60 font-light tracking-wider">{metric.label}</span>
                </div>
                <div className={`flex items-center gap-1 ${metric.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {metric.positive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm tracking-wider">{metric.change}</span>
                </div>
              </div>
              <div className="text-2xl font-light tracking-wider text-white">{metric.value}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MarketMetrics;