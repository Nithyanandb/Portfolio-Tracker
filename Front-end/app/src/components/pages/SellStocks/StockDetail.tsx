import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Clock, TrendingUp, BarChart2, Activity, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StockChart from './StockChart';

interface StockDetailProps {
  stock: Portfolio | null;
  onSellClick: (stock: Portfolio) => void;
  loading?: boolean;
}

export const StockDetail: React.FC<StockDetailProps> = ({ stock, onSellClick, loading }) => {
  const [timeFrame, setTimeFrame] = useState<string>('1D');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [recommendationTrends, setRecommendationTrends] = useState<any[]>([]);
  const [trendsLoading, setTrendsLoading] = useState<boolean>(false);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading || !stock) {
    return (
      <div className="h-full flex items-center justify-center text-white/60">
        <div className="text-center">
          <Globe size={48} className="mx-auto mb-4 opacity-60" />
          <p className="text-xl">Select a stock to view details</p>
        </div>
      </div>
    );
  }

  const timeFrames = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  // Color scheme for recommendation trends
  const trendColors = {
    strongBuy: '#16a34a', // Bright green
    buy: '#4ade80',      // Light green
    hold: '#facc15',     // Yellow
    sell: '#f87171',     // Light red
    strongSell: '#dc2626', // Bright red
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex flex-col h-full bg-black/40 backdrop-blur-xl p-4 lg:p-6"
      >
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-semibold text-white">{stock.name}</h1>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/60">{stock.symbol}</span>
              <span className="text-white/60">•</span>
              <span className="text-white/60">{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Compact Price Section */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl font-medium">
            ${stock.currentPrice?.toFixed(2) || 'N/A'}
          </span>
          <motion.span
            animate={{
              color: (stock.totalReturn || 0) >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"
            }}
            className="flex items-center text-lg"
          >
            {(stock.totalReturn || 0) >= 0 ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
            {Math.abs(stock.totalReturn || 0).toFixed(2)}%
          </motion.span>
        </div>

        {/* Compact Time Frame Selector */}
        <div className="flex gap-1 mb-4 overflow-x-auto scrollbar-hide">
          {timeFrames.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeFrame(tf)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                timeFrame === tf
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Chart Container */}
        <div className="flex-1 bg-black/20 rounded-xl p-4 backdrop-blur-sm mb-4">
          <div className="h-full">
            <StockChart stock={stock} timeFrame={timeFrame} />
          </div>
        </div>

        {/* Compact Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: <Activity size={16} />, label: 'Volume', value: (stock.volume || 0).toLocaleString() },
            { icon: <TrendingUp size={16} />, label: 'High', value: `₹${(stock.high || 0).toFixed(2)}` },
            { icon: <BarChart2 size={16} />, label: 'Low', value: `₹${(stock.low || 0).toFixed(2)}` }
          ].map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-3">
              <div className="flex items-center gap-1 text-white/60 mb-1 text-xs">
                {stat.icon}
                <span className="font-medium">{stat.label}</span>
              </div>
              <p className="text-lg font-medium truncate">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recommendation Trends Section */}
        <div className="bg-black/20 rounded-xl p-4 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-4">Recommendation Trends</h3>
          {trendsLoading ? (
            <div className="flex justify-center items-center py-4">
              <span className="text-white/60">Loading trends...</span>
            </div>
          ) : recommendationTrends.length > 0 ? (
            <div className="space-y-4">
              {recommendationTrends.map((trend, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-3">
                  <p className="text-sm text-white/60 mb-2">Period: {trend.period}</p>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="text-center">
                      <p className="text-xs text-white/60">Strong Buy</p>
                      <p className="text-lg font-medium" style={{ color: trendColors.strongBuy }}>
                        {trend.strongBuy}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-white/60">Buy</p>
                      <p className="text-lg font-medium" style={{ color: trendColors.buy }}>
                        {trend.buy}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-white/60">Hold</p>
                      <p className="text-lg font-medium" style={{ color: trendColors.hold }}>
                        {trend.hold}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-white/60">Sell</p>
                      <p className="text-lg font-medium" style={{ color: trendColors.sell }}>
                        {trend.sell}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-white/60">Strong Sell</p>
                      <p className="text-lg font-medium" style={{ color: trendColors.strongSell }}>
                        {trend.strongSell}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-4">
              <span className="text-white/60">No recommendation trends available.</span>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};