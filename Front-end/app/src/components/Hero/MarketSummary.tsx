import React from 'react';
import { motion } from 'framer-motion';

const MarketSummary: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 bg-black/90 backdrop-blur-2xl border-y border-white/10 p-6"
    >
      <h3 className="text-white/90 text-xs tracking-[0.2em] font-light">MARKET INDICES</h3>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-2">
          <div className="text-xs text-white/60 tracking-[0.2em]">S&P 500</div>
          <div className="text-lg text-white/90 font-light tabular-nums">4,587.64</div>
          <div className="text-xs text-emerald-400/90 tracking-wider">+0.63%</div>
        </div>
        <div className="space-y-2">
          <div className="text-xs text-white/60 tracking-[0.2em]">NASDAQ</div>
          <div className="text-lg text-white/90 font-light tabular-nums">14,346.02</div>
          <div className="text-xs text-emerald-400/90 tracking-wider">+0.82%</div>
        </div>
      </div>
    </motion.div>
  );
};

export default MarketSummary;