import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, BarChart2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { API_CONFIG } from '../config/API_CONFIG';

const MarketMetrics: React.FC = () => {
  useQuery({
    queryKey: ['market-metrics'],
    queryFn: () => fetch(API_CONFIG.getEndpointUrl('METRICS')).then(res => res.json()),
    refetchInterval: API_CONFIG.CACHE_DURATION,
  });

  const metricCards = [
    {
      title: 'MARKET CAP',
      value: '$2.8T',
      change: '+2.4%',
      icon: BarChart2,
      color: 'text-blue-400'
    },
    {
      title: 'VOLUME 24H',
      value: '$86.2B',
      change: '+5.1%',
      icon: Activity,
      color: 'text-purple-400'
    },
    {
      title: 'GAINERS',
      value: '2,431',
      change: '+12%',
      icon: TrendingUp,
      color: 'text-green-400'
    },
    {
      title: 'LOSERS',
      value: '1,243',
      change: '-8%',
      icon: TrendingDown,
      color: 'text-red-400'
    }
  ];

  return (
    <div className="relative bg-black p-0 w-full h-auto rounded-lg overflow-hidden -ml-[20px]   backdrop-blur-xl">
      {/* SpaceX-style grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0"  />
      </div>

      <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-px ">
        {metricCards.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-black/40 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
              <span className="text-sm text-gray-400 tracking-[0.2em]">
                {metric.title}
              </span>
            </div>
            <div className="space-y-2">
              <div className="text-2xl text-white font-light tracking-wider">
                {metric.value}
              </div>
              <div className={`text-sm ${
                metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
              } tracking-wider`}>
                {metric.change}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MarketMetrics;