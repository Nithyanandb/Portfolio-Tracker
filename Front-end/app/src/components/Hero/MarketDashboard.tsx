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
    <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-white">Market Overview</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => refetch()}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-white" />
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

        {/* Add loading state handling */}
        {isRefetching ? (
          <div className="flex items-center justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="w-6 h-6 text-white/50" />
            </motion.div>
          </div>
        ) : (
          <StockDashboard recommendations={dashboard?.recommendations || []} />
        )}
      </div>
    </div>
  );
};

export default MarketDashboard;

