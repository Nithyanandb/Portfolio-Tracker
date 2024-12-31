import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { API_CONFIG } from '../config/API_CONFIG';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface MarketTickerProps {
  symbol: string;
}

const MarketTicker: React.FC<MarketTickerProps> = ({ symbol }) => {
  const { data: quote } = useQuery({
    queryKey: ['stock-quote', symbol],
    queryFn: () => fetch(API_CONFIG.getEndpointUrl(`QUOTE/${symbol}`)).then(res => res.json()),
    refetchInterval: API_CONFIG.CACHE_DURATION,
  });

  if (!quote) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
    >
      <div className="flex justify-between items-center p-4">
        <div>
          <h3 className="text-xs text-white tracking-[0.2em] font-light">
            {symbol}
          </h3>
          <p className="text-xs text-gray-400 tracking-wider mt-1">
            {quote.companyName}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-white font-light tracking-wider tabular-nums">
            {formatCurrency(quote.price)}
          </p>
          <div className={`flex items-center gap-1.5 ${
            quote.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {quote.changePercent >= 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span className="text-xs tracking-wider">
              {formatPercentage(quote.changePercent)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MarketTicker;