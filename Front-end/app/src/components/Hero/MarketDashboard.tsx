import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, 
  RefreshCw, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart2, 
  PieChart,
  ChevronRight,
  Clock,
  Activity
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchMarketData } from '../Service/marketApi';
import { MarketData } from '../types/markets';

const MarketDashboard: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [isLoading, setLoading] = useState(true);

  const { isRefetching, refetch } = useQuery({
    queryKey: ['marketData'],
    queryFn: fetchMarketData,
    enabled: true,
    onSettled: (data: MarketData[] | undefined) => {
      if (data) {
        setMarketData(data);
      }
      setLoading(false);
    },
  });

  // Market Status
  const marketStatus = {
    isOpen: true,
    nextOpen: '2024-03-19 09:30:00',
    lastUpdate: '2 min ago'
  };

  // Portfolio Summary Data
  const portfolioSummary = {
    totalValue: 156432.89,
    todayChange: 1243.56,
    todayChangePercent: 2.3,
    totalShares: 1205,
    totalCompanies: 12,
    profitLoss: 12453.67,
    profitLossPercent: 8.64,
    dayRange: {
      low: 154234.56,
      high: 157890.23,
      current: 156432.89
    }
  };

  // Holdings Data with more details
  const topHoldings = [
    {
      company: 'Apple Inc.',
      symbol: 'AAPL',
      shares: 150,
      avgPrice: 145.32,
      currentPrice: 173.50,
      profit: 4227.00,
      profitPercent: 19.32,
      dayChange: 2.45,
      marketCap: '2.8T',
      volume: '52.3M'
    },
    {
      company: 'Microsoft',
      symbol: 'MSFT',
      shares: 85,
      avgPrice: 242.15,
      currentPrice: 378.85,
      profit: 11629.50,
      profitPercent: 56.45,
      dayChange: 1.23,
      marketCap: '2.9T',
      volume: '22.1M',
      sector: 'Technology',
      pe: 35.2
    },
    {
      company: 'Tesla',
      symbol: 'TSLA',
      shares: 100,
      avgPrice: 180.45,
      currentPrice: 202.64,
      profit: 2219.00,
      profitPercent: 12.30,
      dayChange: -2.15,
      marketCap: '642.1B',
      volume: '108.5M',
      sector: 'Automotive',
      pe: 47.8
    },
    {
      company: 'NVIDIA',
      symbol: 'NVDA',
      shares: 45,
      avgPrice: 245.75,
      currentPrice: 875.28,
      profit: 28324.85,
      profitPercent: 256.17,
      dayChange: 3.85,
      marketCap: '2.2T',
      volume: '45.2M',
      sector: 'Technology',
      pe: 72.4
    },
    {
      company: 'Amazon',
      symbol: 'AMZN',
      shares: 120,
      avgPrice: 135.45,
      currentPrice: 178.15,
      profit: 5124.00,
      profitPercent: 31.52,
      dayChange: 0.95,
      marketCap: '1.9T',
      volume: '32.8M',
      sector: 'E-commerce',
      pe: 60.8
    },
    {
      company: 'Meta Platforms',
      symbol: 'META',
      shares: 75,
      avgPrice: 298.45,
      currentPrice: 505.95,
      profit: 15562.50,
      profitPercent: 69.53,
      dayChange: 2.75,
      marketCap: '1.3T',
      volume: '18.4M',
      sector: 'Technology',
      pe: 34.2
    }
    // ... other holdings
  ];

  const timeframes = ['1D', '1W', '1M', '3M', '1Y'];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-black to-neutral-950" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Market Status Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className={`h-2 w-2 rounded-full ${marketStatus.isOpen ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
            <span className="text-sm text-gray-400">
              {marketStatus.isOpen ? 'Market Open' : `Opens ${marketStatus.nextOpen}`}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Last updated {marketStatus.lastUpdate}</span>
          </div>
        </div>

        {/* Portfolio Value Section */}
        <div className="mb-12">
          <div className="flex items-baseline justify-between">
            <h1 className="text-4xl font-light tracking-tight">
              ${portfolioSummary.totalValue.toLocaleString()}
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => refetch()}
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 text-gray-400 ${isRefetching ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>
          
          <div className="flex items-center mt-2 space-x-3">
            <div className={`flex items-center space-x-2 ${portfolioSummary.todayChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {portfolioSummary.todayChange > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-lg">${Math.abs(portfolioSummary.todayChange).toLocaleString()}</span>
            </div>
            <span className={`text-lg ${portfolioSummary.todayChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
              ({portfolioSummary.todayChangePercent}%)
            </span>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex space-x-4 mb-8">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedTimeframe === timeframe 
                ? 'bg-white/10 text-white' 
                : 'text-gray-400 hover:text-white'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>

        {/* Holdings Grid */}
        <div className="grid gap-6">
          {topHoldings.map((holding, index) => (
            <motion.div
              key={holding.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative backdrop-blur-xl bg-white/5 rounded-3 p-4 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-medium">{holding.company}</h3>
                    <span className="text-sm text-gray-400">{holding.symbol}</span>
                  </div>
                  <div className="mt-1 text-sm text-gray-400">
                    {holding.shares} shares • Avg ${holding.avgPrice}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl">${holding.currentPrice}</div>
                  <div className={`text-sm ${holding.dayChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {holding.dayChange > 0 ? '+' : ''}{holding.dayChange}%
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              <div className="mt-6 grid grid-cols-3 gap-6 text-sm">
                <div>
                  <div className="text-gray-400">Market Value</div>
                  <div className="mt-1">${(holding.shares * holding.currentPrice).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-400">Profit/Loss</div>
                  <div className={`mt-1 ${holding.profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${holding.profit.toLocaleString()} ({holding.profitPercent}%)
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Volume</div>
                  <div className="mt-1">{holding.volume}</div>
                </div>
              </div>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 space-y-3">
          {['View All Holdings', 'Trade Now'].map((action, index) => (
            <motion.button
              key={action}
              whileHover={{ x: 4 }}
              className="w-full flex items-center justify-between p-4 bg-white/5 backdrop-blur-xl rounded-xl transition-all duration-300 group"
            >
              <span className="text-sm font-medium">{action}</span>
              <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketDashboard;