import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { MarketTicker } from './MarketTicker';
import type { MarketData } from '../types/market';

interface MarketWatchProps {
  marketData: MarketData[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export const MarketWatch: React.FC<MarketWatchProps> = ({
  marketData,
  isLoading,
  error,
  onRefresh,
}) => {
  return (
    <div className="
    lg:mt-8 lg:max-w-30 lg:mt-0 lg:px-4 lg:py-6 
    rounded-xl 
    xs:w-full xs:p-0 xs:mt-20  
    bg-gray-1000 bg-opacity-50 backdrop-blur-lg shadow-xl">
      <div className="flex items-center justify-between mb-4 xs:p-0">
        <h2 className="text-xl font-bold text-white">Market Watch</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRefresh}
          disabled={isLoading}
          className="text-gray-400 hover:text-white transition-colors xs:p-0"
        >
          <RefreshCw className={`w-10 h-6 ${isLoading ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>
      
      {error ? (
        <div className="text-red-400 text-center lg:py-4 xs:p-0">{error}</div>
      ) : (
        <div className="space-y-2 xs:max-h-[1500px] lg:max-h-[510px] overflow-y-auto custom-scrollbar xs:p-0 xs:w-full">
          {marketData.map((data) => (
            <MarketTicker key={data.symbol} data={data} />
          ))}
        </div>
      )}
    </div>
  );
};



export default MarketWatch;