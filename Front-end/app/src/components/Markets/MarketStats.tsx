import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const dummyData = Array.from({ length: 10 }, () => ({ value: Math.random() * 100 }));

const MarketStats = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Market Overview</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4"
        >
          <h3 className="text-sm text-gray-400 mb-2">Global Market Cap</h3>
          <p className="text-2xl font-bold text-white">$11.1T</p>
          <div className="h-12 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dummyData}>
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
          <span className="text-green-500 text-sm">+2.3%</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4"
        >
          <h3 className="text-sm text-gray-400 mb-2">24h Volume</h3>
          <p className="text-2xl font-bold text-white">$284.5B</p>
          <div className="h-12 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dummyData}>
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
          <span className="text-green-500 text-sm">+5.8%</span>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketStats;