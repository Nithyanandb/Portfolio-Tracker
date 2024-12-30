import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Area, AreaChart, ComposedChart, Bar
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { Globe, TrendingUp, Activity } from 'lucide-react';

interface MarketGraphProps {
  symbol: string;
  showGlobalComparison?: boolean;
  onTimeframeChange?: (timeframe: string) => void;
}

const generateRandomPrice = (basePrice: number, volatility: number = 0.02) => {
  const change = basePrice * volatility * (Math.random() - 0.5);
  return basePrice + change;
};

const generateMarketData = (timeframe: string, basePrice: number = 100) => {
  const dataPoints: { date: string; close: number; volume: number; marketIndex: number }[] = [];
  const periods = {
    '1D': 24,
    '1W': 7 * 24,
    '1M': 30,
    '3M': 90,
    '1Y': 252,
    '5Y': 1260
  }[timeframe] || 24;

  let currentPrice = basePrice;
  let currentMarketIndex = basePrice;
  const now = new Date();

  for (let i = 0; i < periods; i++) {
    const date = new Date(now);
    
    if (timeframe === '1D') {
      date.setHours(date.getHours() - i);
    } else if (timeframe === '1W') {
      date.setHours(date.getHours() - i);
    } else {
      date.setDate(date.getDate() - i);
    }

    currentPrice = generateRandomPrice(currentPrice);
    currentMarketIndex = generateRandomPrice(currentMarketIndex, 0.01);

    dataPoints.unshift({
      date: date.toISOString(),
      close: Number(currentPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 500000,
      marketIndex: Number(currentMarketIndex.toFixed(2))
    });
  }

  return dataPoints;
};

export const MarketGraph: React.FC<MarketGraphProps> = ({ 
  symbol, 
  showGlobalComparison = true,
  onTimeframeChange 
}) => {
  const [timeframe, setTimeframe] = useState('1D');
  const [showVolume, setShowVolume] = useState(true);

  // Generate data based on symbol
  const basePrice = {
    'AAPL': 150,
    'MSFT': 380,
    'GOOGL': 140,
    'TSLA': 250,
    'NVDA': 800
  }[symbol] || 100;

  const stockData = generateMarketData(timeframe, basePrice);
  const globalData = showGlobalComparison ? generateMarketData(timeframe, basePrice * 0.8) : null;

  const handleTimeframeChange = (tf: string) => {
    setTimeframe(tf);
    onTimeframeChange?.(tf);
  };

  const priceChange = stockData[stockData.length - 1].close - stockData[0].close;
  const priceChangePercent = ((priceChange / stockData[0].close) * 100).toFixed(2);

  const timeframes = ['1D', '1W', '1M', '3M', '1Y', '5Y'];

  const [stockLoading] = useState(false);

  if (stockLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      key={symbol}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-[400px] bg-black/40 backdrop-blur-xl rounded-2xl p-6"
    >
      {/* Header with price change */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-xl font-medium text-white">{symbol}</h3>
            <div className={`text-sm ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {priceChange >= 0 ? '+' : ''}{priceChangePercent}%
            </div>
          </div>
          {showGlobalComparison && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400">Global Market</span>
            </div>
          )}
        </div>
        
        {/* Timeframe selector */}
        <div className="flex gap-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => handleTimeframeChange(tf)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                timeframe === tf 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={stockData}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.1)"
            vertical={false}
          />
          
          <XAxis
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
          />
          
          <YAxis
            yAxisId="price"
            domain={['auto', 'auto']}
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          
          {showVolume && (
            <YAxis
              yAxisId="volume"
              orientation="right"
              stroke="rgba(255,255,255,0.3)"
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
            />
          )}
          
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.9)',
              border: 'none',
              backdropFilter: 'blur(10px)',
              padding: '12px',
              borderRadius: '8px'
            }}
            labelFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          
          <Area
            yAxisId="price"
            type="monotone"
            dataKey="close"
            stroke="#60A5FA"
            fill="url(#colorPrice)"
            strokeWidth={2}
          />
          
          {showVolume && (
            <Bar
              yAxisId="volume"
              dataKey="volume"
              fill="rgba(255,255,255,0.1)"
              radius={[4, 4, 0, 0]}
            />
          )}
          
          {showGlobalComparison && globalData && (
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="marketIndex"
              stroke="#34D399"
              strokeWidth={1.5}
              dot={false}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-400" />
          <span className="text-sm text-white/60">{symbol}</span>
        </div>
        {showGlobalComparison && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="text-sm text-white/60">Market Index</span>
          </div>
        )}
        <button
          onClick={() => setShowVolume(!showVolume)}
          className={`flex items-center gap-2 text-sm ${
            showVolume ? 'text-white/60' : 'text-white/30'
          }`}
        >
          <Activity className="w-4 h-4" />
          Volume
        </button>
      </div>
    </motion.div>
  );
};

export default MarketGraph;