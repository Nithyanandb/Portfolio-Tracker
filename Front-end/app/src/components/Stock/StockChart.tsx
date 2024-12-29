import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartGradient } from './ChartGradient';
import { ChartTooltip } from './ChartTooltip';
import { motion } from 'framer-motion';

interface StockChartProps {
  data: Array<{
    date: string;
    price: number;
  }>;
  trend: 'up' | 'down';
}

const StockChart: React.FC<StockChartProps> = ({ data, trend }) => {
  const [chartData, setChartData] = useState(data);
  const gradientColor = trend === 'up' ? '#22c55e' : '#ef4444';
  
  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(currentData => {
        const newData = [...currentData];
        const lastPrice = newData[newData.length - 1].price;
        const randomChange = (Math.random() - 0.5) * 2; // Random value between -1 and 1
        const newPrice = lastPrice + randomChange;
        
        // Shift array and add new point
        newData.shift();
        newData.push({
          date: new Date().toLocaleTimeString(),
          price: newPrice
        });
        
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[300px] w-full bg-black/20 backdrop-blur-sm rounded-xl p-4"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <ChartGradient id="colorPrice" color={gradientColor} />
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#374151" 
            vertical={false}
          />
          
          <XAxis 
            dataKey="date" 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          
          <YAxis 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            domain={['dataMin - 1', 'dataMax + 1']}
          />
          
          <Tooltip content={<ChartTooltip />} />
          
          <Area
            type="monotone"
            dataKey="price"
            stroke={gradientColor}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPrice)"
            isAnimationActive={true}
            animationDuration={500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default StockChart;