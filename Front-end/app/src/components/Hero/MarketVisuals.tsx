import React from 'react';
import { motion } from 'framer-motion';

const MarketVisuals = () => {
  return (
    <div className="bg-black/80 backdrop-blur-xl  rounded-2xl p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="lg:col-span-2 bg-white/5 rounded-xl p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">S&P 500</h3>
            <span className="text-green-500 font-medium">+1.2%</span>
          </div>
          <div className="relative h-48">
            <svg className="w-full h-full" viewBox="0 0 100 40">
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M0,20 Q25,5 50,25 T100,20"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
              />
            </svg>
          </div>
        </motion.div>

        {/* Market Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-400">Global Volume</h4>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-white">$4.2T</p>
              <p className="ml-2 text-sm font-medium text-green-500">+12%</p>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-400">Active Traders</h4>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-white">2.8M</p>
              <p className="ml-2 text-sm font-medium text-green-500">+3.4%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


export default MarketVisuals;