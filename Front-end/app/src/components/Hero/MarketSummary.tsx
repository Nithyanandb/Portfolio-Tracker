import React from 'react';
import { motion } from 'framer-motion';

const MarketSummary: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 bg-white/5 backdrop-blur-xl border border-white/10 p-6"
    >
      <h3 className="text-white tracking-[0.2em] font-light text-sm">MARKET INDICES</h3>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-2">
          <div className="text-sm text-gray-400 tracking-[0.2em]">S&P 500</div>
          <div className="text-2xl text-white font-light">4,587.64</div>
          <div className="text-sm text-green-400 tracking-wider">+0.63%</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-gray-400 tracking-[0.2em]">NASDAQ</div>
          <div className="text-2xl text-white font-light">14,346.02</div>
          <div className="text-sm text-green-400 tracking-wider">+0.82%</div>
        </div>
      </div>
    </motion.div>
  );
};
export default MarketSummary;