import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MarketGraph } from './MarketGraph';
import type { MarketData } from '../types/market';
import { generateMockGraphData } from '../../utils/marketUtils';

interface MarketTickerProps {
  data: MarketData;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({ data }) => {
  const isPositive = data.changePercent >= 0;
  const { graphData, timeLabels } = generateMockGraphData(24, isPositive);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center justify-between p-4 rounded-lg ${
        isPositive ? 'bg-opacity-20 bg-green-900' : 'bg-opacity-20 bg-red-900'
      }`}
    >
      <div className="flex items-center space-x-4">
        <span className="text-lg font-semibold text-white">{data.symbol}</span>
        <div className="flex flex-col">
          <span className="text-sm text-gray-300">
            Vol: {(data.volume / 1000000).toFixed(2)}M
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">
              H: ${data.high24h?.toFixed(2)}
            </span>
            <span className="text-xs text-gray-400">
              L: ${data.low24h?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <MarketGraph 
          data={graphData}
          labels={timeLabels}
          symbol={data.symbol}
          isPositive={isPositive}
        />
        <div className="flex flex-col items-end">
          <span className="text-lg font-bold text-white">
            ${data.price.toFixed(2)}
          </span>
          <span
            className={`flex items-center text-sm ${
              isPositive ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {data.changePercent.toFixed(2)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};



export default MarketTicker;