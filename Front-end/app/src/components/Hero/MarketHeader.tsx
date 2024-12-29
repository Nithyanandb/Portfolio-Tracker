import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, RefreshCw } from 'lucide-react';

interface MarketHeaderProps {
  onRefresh: () => void;
  isRefetching: boolean;
}

const MarketHeader: React.FC<MarketHeaderProps> = ({ onRefresh, isRefetching }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-6 bg-white/5 backdrop-blur-xl border border-white/10"
    >
      <div className="flex items-center gap-3">
        <LineChart className="w-5 h-5 text-white" />
        <h2 className="text-white tracking-[0.2em] font-light">MARKET OVERVIEW</h2>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRefresh}
        disabled={isRefetching}
        className="p-2 bg-white/5 hover:bg-white/10 transition-all duration-300"
      >
        <RefreshCw className={`w-4 h-4 text-white ${isRefetching ? 'animate-spin' : ''}`} />
      </motion.button>
    </motion.div>
  );
};

export default MarketHeader;