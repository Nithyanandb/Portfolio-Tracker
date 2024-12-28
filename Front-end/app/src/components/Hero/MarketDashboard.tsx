import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, RefreshCw, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { API_CONFIG } from '../config/API_CONFIG';
import StockDashboard from '../Stock/StockDashboard';

const MarketDashboard: React.FC = () => {
  const { data: dashboard, refetch, isRefetching } = useQuery({
    queryKey: ['market-dashboard'],
    queryFn: () => fetch(API_CONFIG.getEndpointUrl('DASHBOARD')).then(res => res.json()),
    refetchInterval: API_CONFIG.CACHE_DURATION,
  });

  return (
    <div className="relative bg-black/40 backdrop-blur-xl ">
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
            <LineChart className="w-5 h-5 text-white" />
            <h2 className="text-white tracking-[0.2em] font-light">
              MARKET OVERVIEW
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

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Market Summary */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-gray-400 tracking-[0.2em]">S&P 500</div>
                <div className="text-xl text-white font-light">4,587.64</div>
                <div className="text-sm text-green-400">+0.63%</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-400 tracking-[0.2em]">NASDAQ</div>
                <div className="text-xl text-white font-light">14,346.02</div>
                <div className="text-sm text-green-400">+0.82%</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ x: 4 }}
              className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <span className="text-sm text-white tracking-[0.2em]">VIEW MARKETS</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </motion.button>
            <motion.button
              whileHover={{ x: 4 }}
              className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <span className="text-sm text-white tracking-[0.2em]">TRADE NOW</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </motion.button>
          </div>
        </div>
      </div>
      <StockDashboard recommendations={[]} />
    </div>
  );
};

export default MarketDashboard;

