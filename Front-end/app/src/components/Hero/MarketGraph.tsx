import React from 'react';
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
    refetchInterval: 60000 // Refetch every minute
  });

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis 
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
            stroke="#666"
          />
          <YAxis 
            domain={['auto', 'auto']}
            stroke="#666"
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '4px',
            }}
            labelFormatter={(date) => new Date(date).toLocaleDateString()}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
          />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#4ade80"
            strokeWidth={2}
            dot={false}
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketGraph;