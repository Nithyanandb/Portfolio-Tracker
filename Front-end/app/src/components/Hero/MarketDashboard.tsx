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
  Activity,
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
    lastUpdate: '2 min ago',
  };

  // Cryptocurrency Data
  const [cryptocurrencies, setCryptocurrencies] = useState([
    { pair: 'BAT/INR', vol: '17.037', change: '0.0%' },
    { pair: 'BTC/INR', vol: '5656600', change: '0.0%' },
    { pair: 'DENT/INR', vol: '0.086', change: '0.0%' },
    { pair: 'EOS/INR', vol: '51.94', change: '0.0%' },
    { pair: 'ETH/INR', vol: '303000', change: '0.0%' },
    { pair: 'HOT/INR', vol: '0.167', change: '0.0%' },
    { pair: 'ICX/INR', vol: '13.562', change: '0.0%' },
    { pair: 'IOST/INR', vol: '0.58', change: '0.0%' },
    { pair: 'NULS/INR', vol: '108', change: '0.0%' },
  ]);

  const timeframes = ['1D', '1W', '1M', '3M', '1Y'];


  // Indices Data
  const indices = [
    { name: 'Dow Jones', value: '42,738.63', change: '+346.36 (0.82%)' },
    { name: 'Nasdaq', value: '19,619.17', change: '+338.38 (1.75%)' },
    { name: 'S&P 500', value: '5,942.47', change: '+73.92 (1.26%)' },
  ];

  // Sort indices by name
  const sortedIndices = indices.sort((a, b) => a.name.localeCompare(b.name));

  // Key Indicators Data
  const keyIndicators = [
    { name: 'Crude Oil', ltp: '70.26', change: '0.64', changePercent: '0.92%' },
    { name: 'Gold', ltp: '2,620.56', change: '-12.49', changePercent: '-0.47%' },
    { name: 'Brent Crude', ltp: '73.81', change: '0.55', changePercent: '0.75%' },
    { name: 'DXY', ltp: '108.92', change: '-0.37', changePercent: '-0.33%' },
    { name: 'US 10Y', ltp: '4.600', change: '0.03', changePercent: '0.74%' },
    { name: 'YEN', ltp: '157.273', change: '-0.23', changePercent: '-0.14%' },
    { name: 'EURO', ltp: '1.031', change: '0.00', changePercent: '0.42%' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Premium gradient background */}
      <div className="absolute inset-0" />

      <div className="relative max-w-[400px] mx-auto  sm:p-6 lg:p-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => refetch()}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <RefreshCw className={`w-5 h-5 text-gray-400 ${isRefetching ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>

      
        {/* Indices Table */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">Indices</h2>
          <div className="">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Value</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Change</th>
                </tr>
              </thead>
              <tbody>
                {sortedIndices.map((index, i) => (
                  <tr key={i} className="hover:bg-white/[0.05] transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{index.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{index.value}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-green-400">{index.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
{/* Key Indicators Table */}
<div className="mb-6">
  <div className="flex items-center justify-between mb-3">
    <div className="p-0">
      <h2 className="text-xl font-semibold p-2 text-white mb-3">Key Indicators</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-2 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Name</th>
            <th className="px-2 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">LTP</th>
            <th className="px-2 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Change</th>
            <th className="px-2 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Change %</th>
          </tr>
        </thead>
        <tbody>
          {keyIndicators.map((indicator, i) => (
            <tr key={i} className="hover:bg-white/[0.05] transition-colors">
              <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{indicator.name}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{indicator.ltp}</td>
              <td className={`px-4 py-4 whitespace-nowrap text-sm ${
                indicator.change.startsWith('-') ? 'text-rose-400' : 'text-green-400'
              }`}>
                {indicator.change}
              </td>
              <td className={`px-4 py-4 whitespace-nowrap text-sm ${
                indicator.changePercent.startsWith('-') ? 'text-rose-400' : 'text-green-400'
              }`}>
                {/* Ensure the percent symbol is inline with the number */}
                <span>{indicator.changePercent}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
{/* Cryptocurrency Section */}
<div className="mb-6">
  <h2 className="text-xl font-semibold text-white mb-3">Top Cryptos</h2>
  <div className="">
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="px-4 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Pair</th>
          <th className="px-4 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Vol</th>
          <th className="px-4 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Change</th>
        </tr>
      </thead>
      <tbody>
        {cryptocurrencies.map((crypto, index) => (
          <tr key={index} className="hover:bg-white/[0.05] transition-colors">
            <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{crypto.pair}</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{crypto.vol}</td>
            <td className={`px-4 py-4 whitespace-nowrap text-sm ${
              crypto.change.startsWith('-') ? 'text-rose-400' : 'text-green-400'
            }`}>
              {crypto.change}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

        {/* Quick Links at the Bottom */}
        <div className="mt-6 space-y-2">
          {['Markets', 'News', 'Portfolio', 'Watchlist', 'Commodities'].map((link, i) => (
            <motion.button
              key={i}
              whileHover={{ x: 4 }}
              className="w-full flex items-center justify-between p-2  hover:bg-white/[0.04]transition-all duration-300 group"
            >
              <span className="text-sm font-medium text-white">{link}</span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketDashboard;