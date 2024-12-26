import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, TrendingUp } from 'lucide-react';
import { MarketTicker } from './MarketTicker';
import { useQuery } from '@tanstack/react-query';

const WATCHED_SYMBOLS = ['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN', 'META'];

export const MarketWatch: React.FC = () => {
  const { refetch, isRefetching } = useQuery({
    queryKey: ['market-data'],
    queryFn: () => Promise.all(WATCHED_SYMBOLS.map(symbol => Promise.all([
      fetch(`/api/quote/${symbol}`),
      fetch(`/api/company/${symbol}`)
    ])))
  });

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-white/10">
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

      <div className="p-4 space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
        {WATCHED_SYMBOLS.map((symbol) => (
          <MarketTicker key={symbol} symbol={symbol} />
        ))}
      </div>
    </div>
  );
};


export default MarketWatch;