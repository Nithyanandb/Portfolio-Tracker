import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid
} from 'recharts';

interface StockChartProps {
  symbol: string;
  onTimeframeChange?: (timeframe: string) => void;
}

const generateRandomPrice = (basePrice: number, volatility: number = 0.005) => {
  const change = basePrice * volatility * (Math.random() - 0.5);
  return basePrice + change;
};

const generateStockData = (timeframe: string, basePrice: number = 100) => {
  const dataPoints: { date: string; price: number }[] = [];
  const periods = {
    '1D': 24,
    '1W': 7 * 24,
    '1M': 30,
    '3M': 90,
    '1Y': 252,
    '5Y': 1260
  }[timeframe] || 24;

  let currentPrice = basePrice;
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

    dataPoints.unshift({
      date: date.toISOString(),
      price: Number(currentPrice.toFixed(2))
    });
  }

  return dataPoints;
};

export const StockChart: React.FC<StockChartProps> = ({ 
  symbol, 
  onTimeframeChange 
}) => {
  const [timeframe, setTimeframe] = useState('1D');

  // Generate data based on symbol
  const basePrice = {
    'AAPL': 150,
    'MSFT': 380,
    'GOOGL': 140,
    'TSLA': 250,
    'NVDA': 800
  }[symbol] || 100;

  const stockData = generateStockData(timeframe, basePrice);

  const handleTimeframeChange = (tf: string) => {
    setTimeframe(tf);
    onTimeframeChange?.(tf);
  };

  const priceChange = stockData[stockData.length - 1].price - stockData[0].price;
  const priceChangePercent = ((priceChange / stockData[0].price) * 100).toFixed(2);

  const timeframes = ['1D', '1W', '1M', '3M', '1Y', '5Y'];

  return (
    <motion.div
      key={symbol}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-[400px] bg-black/40 backdrop-blur-xl rounded-2xl p-6"
    >
      {/* Header with price change */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-medium text-white">{symbol}</h3>
          <div className={`text-sm ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {priceChange >= 0 ? '+' : ''}{priceChangePercent}%
          </div>
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
      <ResponsiveContainer width="100%" height="100%" style={{position: 'sticky', top: 0}}>
        <AreaChart data={stockData}>
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
            tickFormatter={(date) => {
              const d = new Date(date);
              if (timeframe === '1D') {
                return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              } else {
                return d.toLocaleDateString([], { day: 'numeric', month: 'short' });
              }
            }}
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
          />
          
          <YAxis
            domain={['auto', 'auto']}
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          
          <Tooltip
          
            contentStyle={{
              
              backgroundColor: 'rgba(0,0,0,0.9)',
              border: 'none',
              backdropFilter: 'blur(10px)',
              padding: '12px',
              borderRadius: '8px'
            }}
            labelFormatter={(date) => new Date(date).toLocaleString()}
          />
          
          <Area
          className='fixed'
            type="monotone"
            dataKey="price"
            stroke="#60A5FA"
            fill="url(#colorPrice)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default StockChart;