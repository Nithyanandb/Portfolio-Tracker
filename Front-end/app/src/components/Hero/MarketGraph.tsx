import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { fetchHistoricalData } from '../portfolio/stockHistoricalData';

interface MarketGraphProps {
  symbol: string;
}

export const MarketGraph: React.FC<MarketGraphProps> = ({ symbol }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['stockHistory', symbol],
    queryFn: () => fetchHistoricalData(symbol),
    refetchInterval: 60000
  });

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-white border-t-transparent rounded-none"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-64 mt-4 bg-black/40 backdrop-blur-xl"
    >
      {/* SpaceX-style grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
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
            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <YAxis
            domain={['auto', 'auto']}
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.9)',
              border: 'none',
              backdropFilter: 'blur(10px)',
              padding: '12px',
              fontSize: '12px',
              letterSpacing: '0.1em'
            }}
            labelFormatter={(date) => new Date(date).toLocaleDateString()}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
          />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#FFFFFF"
            strokeWidth={1.5}
            dot={false}
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default MarketGraph;