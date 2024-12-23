import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, AreaChart, Area } from 'recharts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dummyData = Array.from({ length: 20 }, (_, i) => ({
  value: Math.random() * 100 + 50
}));

const MarketMetrics = () => {
  return (
    <div className="bg-black/80 backdrop-blur-xl  rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Global Metrics</h2>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-8"
      >
        {/* Main Chart */}
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dummyData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                fill="url(#colorValue)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Market Stats Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-400">Market Cap</h4>
            <p className="text-2xl font-bold text-white mt-1">$2.1T</p>
            <div className="h-16 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dummyData.slice(-90)}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4ADE80" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-400">24h Volume</h4>
            <p className="text-2xl font-bold text-white mt-1">$84.5B</p>
            <div className="h-16 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dummyData.slice(-10)}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#F43F5E" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MarketMetrics;