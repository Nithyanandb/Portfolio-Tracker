import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, RefreshCw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { API_CONFIG } from '../../config/API_CONFIG';
import StockRecommendations from './StockRecommendations';

const StockDashboard: React.FC = () => {
  const { data: recommendations, refetch, isRefetching } = useQuery({
    queryKey: ['stock-recommendations'],
    queryFn: () => fetch(API_CONFIG.getEndpointUrl('RECOMMENDATIONS')).then(res => res.json()),
    refetchInterval: API_CONFIG.CACHE_DURATION,
  });

  const mockRecommendations = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: '182.63',
      change: '+1.25%',
      recommendation: 'BUY',
      analysis: 'Strong momentum with new product launches'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      price: '337.22',
      change: '-0.45%',
      recommendation: 'HOLD',
      analysis: 'Stable growth in cloud services'
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: '125.23',
      change: '+2.1%',
      recommendation: 'BUY',
      analysis: 'AI initiatives driving growth'
    }
  ];

  return (
    <div className="relative w-full bg-black/40 backdrop-blur-xl ">
      <div className="absolute inset-0">
        <div className="absolute inset-0" />
      </div>

      <div className="relative">
        <div className="flex items-center glass-button border-1 border-white/20 rounded-0 bg-black justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <LineChart className="w-5 h-5 text-white" />
            <h2 className="text-white tracking-[0.2em] font-light">
              RECOMMENDED STOCKS
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => refetch()}
            disabled={isRefetching}
            className="p-2 bg-white/5 glass-button border-0 transition-all duration-300"
          >
            <RefreshCw className={`w-4 h-4 text-white ${isRefetching ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>

        <StockRecommendations recommendations={recommendations || mockRecommendations} />
      </div>
    </div>
  );
};

export default StockDashboard;