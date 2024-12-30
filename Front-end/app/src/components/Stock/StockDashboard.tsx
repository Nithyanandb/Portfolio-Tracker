import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, RefreshCw, Sparkles } from 'lucide-react';
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
      analysis: 'Strong momentum with new product launches',
      aiConfidence: 89
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      price: '337.22',
      change: '-0.45%',
      recommendation: 'HOLD',
      analysis: 'Stable growth in cloud services',
      aiConfidence: 75
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: '125.23',
      change: '+2.1%',
      recommendation: 'BUY',
      analysis: 'AI initiatives driving growth',
      aiConfidence: 92
    }
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Premium glass morphism effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
      
      {/* Glow effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-[64px]" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-[64px]" />
      </div>

      <div className="relative">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <LineChart className="w-4 h-4 text-blue-400" />
              <div className="absolute inset-0 bg-blue-400/20 blur-sm" />
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-white/90 text-xs tracking-[0.2em] font-light">
                RECOMMENDATIONS
              </h2>
             
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => refetch()}
            disabled={isRefetching}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 relative group"
          >
            <RefreshCw className={`w-3 h-3 text-white/90 ${isRefetching ? 'animate-spin' : ''}`} />
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
          </motion.button>
        </div>

        <StockRecommendations recommendations={recommendations || mockRecommendations} />
      </div>
    </div>
  );
};

export default StockDashboard;