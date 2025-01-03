import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, RefreshCw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { API_CONFIG } from '../../config/API_CONFIG';
import StockRecommendations from './StockRecommendations';

const StockDashboard: React.FC = () => {
  const { data: recommendations, refetch, isRefetching } = useQuery({
    queryKey: ['stock-recommendations'],
    // queryFn: () => fetch(API_CONFIG.getEndpointUrl('RECOMMENDATIONS')).then(res => res.json()),
    refetchInterval: API_CONFIG.CACHE_DURATION,
  });

  const mockRecommendations = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: '182.63',
      change: '+1.25%',
      recommendation: 'BUY',
      analysis: 'Strong momentum with new product launches',
      pe: 'N/A'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      price: '337.22',
      change: '-0.45%',
      recommendation: 'HOLD',
      analysis: 'Stable growth in cloud services',
      pe: 'N/A'
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: '125.23',
      change: '+2.1%',
      recommendation: 'BUY',
      analysis: 'AI initiatives driving growth',
      pe: 'N/A'
    }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <LineChart className="w-4 h-4 text-white/90" />
          <h2 className="text-white/90 text-xs tracking-[0.2em] font-light">
            RECOMMENDED STOCKS
          </h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => refetch()}
          disabled={isRefetching}
          className="p-2 bg-white/5 hover:bg-white transition-all duration-300 rounded-lg"
        >
          <RefreshCw className={`w-3 h-3 text-white/90 ${isRefetching ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>

      <StockRecommendations recommendations={recommendations || mockRecommendations} />
    </div>
  );
};

export default StockDashboard;