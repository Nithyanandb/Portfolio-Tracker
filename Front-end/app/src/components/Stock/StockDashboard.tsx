import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, RefreshCw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { API_CONFIG } from '../../config/API_CONFIG';
import StockRecommendations from './StockRecommendations';
import type { StockQuote } from '../../types/stock';

// Mock data for development
const MOCK_RECOMMENDATIONS: StockQuote[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: '175.84',
    change: '+2.34',
    changePercent: 1.35,
    recommendation: 'BUY',
    analysis: 'Strong momentum in Technology sector with attractive P/E ratio',
    metrics: {
      open: '173.50',
      high: '176.20',
      low: '173.20',
      volume: '64.2M',
      peRatio: '28.5',
      marketCap: '2.8T',
      sector: 'Technology'
    }
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: '338.11',
    change: '+1.56',
    changePercent: 0.46,
    recommendation: 'HOLD',
    analysis: 'Stable performance with moderate growth potential',
    metrics: {
      open: '337.55',
      high: '339.20',
      low: '336.80',
      volume: '22.1M',
      peRatio: '32.4',
      marketCap: '2.5T',
      sector: 'Technology'
    }
  }
];

const StockDashboard: React.FC = () => {
  // Use mock data while API is not available
  const { 
    data: recommendations = MOCK_RECOMMENDATIONS, 
    refetch, 
    isRefetching,
    isLoading,
    isError
  } = useQuery<StockQuote[]>({
    queryKey: ['stock-recommendations'],
    queryFn: async () => {
      // TODO: Replace with actual API call when backend is ready
      return MOCK_RECOMMENDATIONS;
    },
    refetchInterval: API_CONFIG.CACHE_DURATION,
  });

  return (
    <div className="relative bg-black/40 backdrop-blur-xl">
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
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
            className="p-2 bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            <RefreshCw className={`w-4 h-4 text-white ${isRefetching ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>

        <StockRecommendations 
          recommendations={recommendations} 
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default StockDashboard;