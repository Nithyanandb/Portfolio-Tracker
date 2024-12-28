import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, RefreshCw, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { API_CONFIG } from '../config/API_CONFIG';

const TrendingStocks: React.FC = () => {
  const { data: trending, refetch, isRefetching, isLoading } = useQuery({
    queryKey: ['trending-stocks'],
    queryFn: () => fetch(API_CONFIG.getEndpointUrl('TRENDING')).then(res => res.json()),
    refetchInterval: API_CONFIG.CACHE_DURATION,
  });

  const trendingStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '182.63', change: '+1.25%' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: '238.45', change: '+2.8%' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '485.09', change: '+3.2%' },
    { symbol: 'META', name: 'Meta Platforms', price: '326.49', change: '+1.7%' }
  ];

  return (
    <div className="relative bg-black/40 backdrop-blur-xl border border-white/10">
      {/* SpaceX-style grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-white" />
            <h2 className="text-white tracking-[0.2em] font-light">
              TRENDING NOW
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

        {/* Trending Stocks List */}
        <div className="p-6 space-y-4">
          {trendingStocks.map((stock, index) => (
            <motion.div
              key={stock.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <div className="space-y-1">
                <div className="text-white font-light tracking-wider">{stock.symbol}</div>
                <div className="text-sm text-gray-400">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="text-white font-light">${stock.price}</div>
                <div className="text-green-400 text-sm">{stock.change}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.button
          whileHover={{ x: 4 }}
          className="w-full flex items-center justify-between p-6 border-t border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
        >
          <span className="text-sm text-white tracking-[0.2em]">VIEW ALL STOCKS</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </motion.button>
      </div>
    </div>
  );
};

export default TrendingStocks;