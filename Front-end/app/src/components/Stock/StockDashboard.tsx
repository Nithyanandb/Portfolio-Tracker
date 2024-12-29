import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, RefreshCw, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { API_CONFIG } from '../../config/API_CONFIG';
import StockRecommendations from './StockRecommendations';
import { MarketGraph } from '../Hero/MarketGraph';

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
    <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/10">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-xl font-medium text-white">Market Analysis</h2>
            <p className="text-sm text-gray-400">Real-time AI-powered insights</p>
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

        <div className="mb-8">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-sm text-blue-400 mb-2 tracking-wider">AI MARKET SENTIMENT</h3>
            <p className="text-white text-sm leading-relaxed">
              Market showing bullish trends with increasing volume. Key resistance levels at $450.
              Recommended strategy: Hold with stop-loss at $420.
            </p>
          </div>
        </div>

        <div className="h-[300px] mb-6">
          <MarketGraph 
            symbol="AAPL"
            showVolume={true}
            showIndicators={['SMA', 'RSI']}
            timeframe="1D"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'RSI', value: '65.4', status: 'neutral' },
            { label: 'MACD', value: '1.24', status: 'bullish' },
            { label: 'Stoch', value: '82.3', status: 'overbought' }
          ].map((indicator) => (
            <div key={indicator.label} className="bg-white/5 rounded-lg p-3">
              <div className="text-sm text-gray-400">{indicator.label}</div>
              <div className="text-lg text-white">{indicator.value}</div>
            </div>
          ))}
        </div>

        <StockRecommendations recommendations={recommendations || mockRecommendations} />
      </div>
    </div>
  );
};

export default StockDashboard;