import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { generateMarketData, portfolioStocks, marketInsights } from '../types/mockData';

const MarketMetrics = () => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M'>('1M');
  const marketData = generateMarketData(timeframe === '1D' ? 24 : 
    timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : 90);

  const formatValue = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Global Market Metrics</h2>
        <div className="flex gap-2">
          {['1D', '1W', '1M', '3M'].map((tf) => (
            <button
              key={tf}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setTimeframe(tf as any)}
              className={`px-3 py-1 rounded-lg ${
                timeframe === tf
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Main Chart */}
        <div className="bg-white/5 rounded-xl p-4">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF"
                  tickFormatter={(date) => format(new Date(date), 'MMM d')}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => formatValue(value)}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  fill="url(#colorValue)"
                  strokeWidth={2}
                />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Insights Grid */}
        <div className="grid grid-cols-4 gap-4">
          {marketInsights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 rounded-xl p-4"
            >
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-gray-400">{insight.title}</h4>
                {insight.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : insight.trend === 'down' ? (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                ) : (
                  <Activity className="w-4 h-4 text-blue-400" />
                )}
              </div>
              <p className="text-2xl font-bold text-white mt-2">{insight.value}</p>
              <p className={`text-sm mt-1 ${insight.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {insight.change > 0 ? '+' : ''}{insight.change}%
              </p>
            </motion.div>
          ))}
        </div>

        {/* Portfolio Overview */}
        <div className="bg-white/5 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Portfolio Overview</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm">
                  <th className="text-left pb-4">Asset</th>
                  <th className="text-right pb-4">Quantity</th>
                  <th className="text-right pb-4">Avg Price</th>
                  <th className="text-right pb-4">Current Price</th>
                  <th className="text-right pb-4">24h Change</th>
                  <th className="text-right pb-4">Value</th>
                </tr>
              </thead>
              <tbody>
                {portfolioStocks.map((stock) => (
                  <tr key={stock.symbol} className="border-t border-white/5">
                    <td className="py-4">
                      <div>
                        <div className="font-medium text-white">{stock.symbol}</div>
                        <div className="text-sm text-gray-400">{stock.name}</div>
                      </div>
                    </td>
                    <td className="text-right text-white">{stock.quantity}</td>
                    <td className="text-right text-white">{formatValue(stock.averagePrice)}</td>
                    <td className="text-right text-white">{formatValue(stock.currentPrice)}</td>
                    <td className={`text-right ${stock.change24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.change24h > 0 ? '+' : ''}{stock.change24h}%
                    </td>
                    <td className="text-right text-white">
                      {formatValue(stock.quantity * stock.currentPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MarketMetrics;
