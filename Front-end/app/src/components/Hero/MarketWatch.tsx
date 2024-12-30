import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { API_CONFIG } from '../config/API_CONFIG';
import MarketTicker from './MarketTicker';
import MarketSummary from './MarketSummary';
import TrendingStocks from './TrendingStocks';

const WATCHED_SYMBOLS = ['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN', 'META'];

export const MarketWatch: React.FC = () => {
  const { data: marketData, refetch, isRefetching, isLoading } = useQuery({
    queryKey: ['market-status'],
    queryFn: () => fetch(API_CONFIG.getEndpointUrl('QUOTE')).then(res => res.json()),
    refetchInterval: API_CONFIG.CACHE_DURATION,
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid lg:grid-cols-12 gap-4 "
    >
      {/* Market Summary Section */}
      <div className="lg:col-span-8 space-y-4  ">
        <div className="relative bg-black/40 backdrop-blur-xl">
          {/* SpaceX-style grid background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />
          </div>

          <div className="relative bg-black border-0">
            <div className="flex items-center justify-between p-6 bg-black border-0">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-white" />
                <h2 className="text-xl tracking-[0.2em] text-white font-light">
                  MARKET WATCH
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => refetch()}
                disabled={isRefetching}
                className="p-2 bg-white/5 bg-black border-0 transition-all duration-300"
              >
                <RefreshCw className={`w-5 h-5 text-white ${isRefetching ? 'animate-spin' : ''}`} />
              </motion.button>
            </div>
            
            {isLoading ? (
              <div className="p-6 flex justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 bg-black border-0 rounded-full"
                />
              </div>
            ) : (
              <>
                <MarketSummary data={marketData?.summary} />
                <div className="p-6 grid gap-4">
                  {WATCHED_SYMBOLS.map((symbol) => (
                    <MarketTicker key={symbol} symbol={symbol} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="lg:col-span-4 space-y-4">
        <TrendingStocks />
      </div>
    </motion.div>
  );
};

export default MarketWatch;