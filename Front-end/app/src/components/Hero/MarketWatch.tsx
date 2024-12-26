import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { API_CONFIG } from '../config/API_CONFIG';
import StockTicker from './MarketTicker';
import MarketNews from './MarketNews';
import MarketSummary from './MarketSummary';
import TrendingStocks from './TrendingStocks';

const WATCHED_SYMBOLS = ['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN', 'META'];
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
export const MarketWatch: React.FC = () => {
  const { data: marketData, refetch, isRefetching } = useQuery({
    queryKey: ['market-status'],
    queryFn: () => fetch(API_CONFIG.getEndpointUrl('QUOTE')).then(res => res.json()),
    refetchInterval: API_CONFIG.CACHE_DURATION,
  });

  return (
    <div className="grid lg:grid-cols-12 gap-4">
      {/* Market Summary Section */}
      <div className="lg:col-span-8 space-y-4">
        <div className="bg-gray-900 rounded-xl border border-white/10">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Market Watch</h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => refetch()}
              disabled={isRefetching}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 text-blue-400 ${isRefetching ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>
          
          <MarketSummary data={marketData?.summary} />
          
          <div className="p-4 grid gap-4">
            {WATCHED_SYMBOLS.map((symbol) => (
              <StockTicker key={symbol} symbol={symbol} />
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="lg:col-span-4 space-y-4">
        <TrendingStocks />
        <MarketNews />
      </div>
    </div>
  );
};

export default MarketWatch;