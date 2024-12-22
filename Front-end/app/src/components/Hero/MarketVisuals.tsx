import React from 'react';
import { motion } from 'framer-motion';

const MarketVisuals = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="mt-10 lg:mt-0 lg:absolute lg:right-0 lg:top-1 lg:transform lg:-translate-y-1 lg:w-1/4"
    >
      <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
        {/* Live Market Data */}
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
          className="card-dark rounded-xl p-6 mb-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">S&P 500</h3>
            <span className="text-green-500 font-medium">+1.2%</span>
          </div>
          <div className="relative h-24">
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
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="card-dark rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-400">Global Volume</h4>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-white">$4.2T</p>
              <p className="ml-2 text-sm font-medium text-green-500">+12%</p>
            </div>
          </div>
          <div className="card-dark rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-400">Active Traders</h4>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-white">2.8M</p>
              <p className="ml-2 text-sm font-medium text-green-500">+3.4%</p>
            </div>
          </div>
        </motion.div>

        {/* Real-time Ticker */}
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 card-dark rounded-xl p-4"
        >
          <div className="flex space-x-8 overflow-hidden">
            <motion.div
              animate={{ x: [0, -100] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="flex space-x-8 whitespace-nowrap"
            >
              <span className="text-sm text-white">AAPL <span className="text-green-500">+2.3%</span></span>
              <span className="text-sm text-white">MSFT <span className="text-green-500">+1.8%</span></span>
              <span className="text-sm text-white">GOOGL <span className="text-red-500">-0.5%</span></span>
              <span className="text-sm text-white">AMZN <span className="text-green-500">+0.7%</span></span>
              <span className="text-sm text-white">AAPL <span className="text-green-500">+2.3%</span></span>
              <span className="text-sm text-white">MSFT <span className="text-green-500">+1.8%</span></span>
              <span className="text-sm text-white">GOOGL <span className="text-red-500">-0.5%</span></span>
              <span className="text-sm text-white">AMZN <span className="text-green-500">+0.7%</span></span>
              <span className="text-sm text-white">AAPL <span className="text-green-500">+2.3%</span></span>
              <span className="text-sm text-white">MSFT <span className="text-green-500">+1.8%</span></span>
              <span className="text-sm text-white">GOOGL <span className="text-red-500">-0.5%</span></span>
              <span className="text-sm text-white">AMZN <span className="text-green-500">+0.7%</span></span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MarketVisuals;