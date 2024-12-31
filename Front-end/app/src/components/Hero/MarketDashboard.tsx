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
      profit: 11629.57,
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
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/90 to-black" />
      
      <div className="relative max-w-10xl mx-auto px-0 sm:px-6 lg:px-8 py-12">
        {/* Market Status Bar with refined styling */}
        {/* <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4 backdrop-blur-xl bg-white/[0.02] px-4 py-2 rounded-2xl">
            <div className={`h-2.5 w-2.5 rounded-full ${marketStatus.isOpen ? 'bg-green-400' : 'bg-red-400'} 
              shadow-lg shadow-green-500/20 animate-pulse`} 
            />
          
          </div>
         
        </div> */}

        {/* Portfolio Value Section with glass effect
        <div className="mb-12 p-8 rounded-3xl bg-white/[0.02] backdrop-blur-xl">
          <div className="flex items-baseline justify-between mb-4">
            <div className="space-y-1">
              <h2 className="text-sm font-medium text-gray-400">Portfolio Value</h2>
              <h1 className="text-4xl font-light tracking-tight text-white">
                ${portfolioSummary.totalValue.toLocaleString()}
              </h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => refetch()}
              className="p-2.5 rounded-xl hover:bg-white/5 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 text-gray-400 ${isRefetching ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${
              portfolioSummary.todayChange > 0 ? 'text-green-400' : 'text-rose-400'
            }`}>
              {portfolioSummary.todayChange > 0 ? 
                <TrendingUp className="w-4 h-4" /> : 
                <TrendingDown className="w-4 h-4" />
              }
              <span className="text-lg font-medium">
                ${Math.abs(portfolioSummary.todayChange).toLocaleString()}
              </span>
            </div>
            <span className={`text-lg font-medium ${
              portfolioSummary.todayChange > 0 ? 'text-green-400' : 'text-rose-400'
            }`}>
              ({portfolioSummary.todayChangePercent}%)
            </span>
          </div>
        </div> */}

        {/* Timeframe Selector with premium styling */}
        <div className="flex gap-2 p-1 bg-white/[0.02] backdrop-blur-xl rounded-xl mb-8 w-fit">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedTimeframe === timeframe 
                ? 'bg-white text-black shadow-sm' 
                : 'text-gray-400 hover:text-white'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>

        {/* Holdings Grid with refined cards */}
        <div className="grid gap-4">
          {topHoldings.map((holding, index) => (
            <motion.div
              key={holding.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative backdrop-blur-xl bg-white/[0.02] hover:bg-white/[0.04] 
                rounded-2xl p-6 transition-all duration-500"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-medium text-white">{holding.company}</h3>
                      <span className="text-sm font-medium text-gray-400">{holding.symbol}</span>
                      <span className="px-3 py-1 text-xs font-medium text-gray-300 bg-white/[0.05] rounded-full">
                        {holding.sector}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {holding.shares} shares • Avg ${holding.avgPrice}
                    </div>
                  </div>

                  {/* Market Stats */}
                  <div className="grid grid-cols-3 gap-6 p-4 rounded-xl bg-white/[0.02]">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Market Value</div>
                      <div className="text-base font-medium text-white">
                        ${(holding.shares * holding.currentPrice).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Profit/Loss</div>
                      <div className={`text-base font-medium ${
                        holding.profit > 0 ? 'text-green-400' : 'text-rose-400'
                      }`}>
                        ${holding.profit.toLocaleString()} ({holding.profitPercent}%)
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Volume</div>
                      <div className="text-base font-medium text-white">{holding.volume}</div>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className="text-2xl font-light text-white">${holding.currentPrice}</div>
                  <div className={`flex items-center justify-end gap-2 ${
                    holding.dayChange > 0 ? 'text-green-400' : 'text-rose-400'
                  }`}>
                    {holding.dayChange > 0 ? 
                      <TrendingUp className="w-4 h-4" /> : 
                      <TrendingDown className="w-4 h-4" />
                    }
                    <span className="text-sm font-medium">
                      {holding.dayChange > 0 ? '+' : ''}{holding.dayChange}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions with glass effect */}
        <div className="mt-8 space-y-3">
          {['View All Holdings', 'Trade Now'].map((action, index) => (
            <motion.button
              key={action}
              whileHover={{ x: 4 }}
              className="w-full flex items-center justify-between p-4 bg-white/[0.02] hover:bg-white/[0.04] 
                backdrop-blur-xl rounded-xl transition-all duration-300 group"
            >
              <span className="text-sm font-medium text-white">{action}</span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketDashboard;