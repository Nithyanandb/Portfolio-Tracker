import React from 'react';
import { ArrowUpRight, ArrowDownRight, BarChart2, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { MarketGraph } from './MarketGraph';
import { useQuery } from '@tanstack/react-query';
import { fetchQuote } from '../portfolio/stockQuoteData';
import { fetchCompanyInfo } from '../portfolio/companyInfo';
import { formatNumber } from '../types/apiUtils';

interface MarketTickerProps {
  symbol: string;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({ symbol }) => {
  const { data: quote } = useQuery({
    queryKey: ['quote', symbol],
    queryFn: () => fetchQuote(symbol),
    refetchInterval: 30000 // Refetch every 30 seconds
  });

  const { data: company } = useQuery({
    queryKey: ['company', symbol],
    queryFn: () => fetchCompanyInfo(symbol)
  });

  if (!quote || !company) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-xl rounded-xl p-4 hover:bg-white/10 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">{symbol}</h3>
            <span className={`px-2 py-0.5 text-xs rounded-full ${
              quote.changePercent >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {quote.changePercent >= 0 ? '+' : ''}{quote.changePercent.toFixed(2)}%
            </span>
          </div>
          <p className="text-sm text-gray-400">{company.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">${quote.price.toFixed(2)}</span>
          {quote.changePercent >= 0 ? 
            <ArrowUpRight className="w-6 h-6 text-green-400" /> : 
            <ArrowDownRight className="w-6 h-6 text-red-400" />
          }
        </div>
      </div>

      <MarketGraph symbol={symbol} />

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-black/20 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Volume</span>
          </div>
          <p className="text-white font-medium mt-1">{formatNumber(quote.volume)}</p>
        </div>
        <div className="bg-black/20 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Market Cap</span>
          </div>
          <p className="text-white font-medium mt-1">{formatNumber(quote.marketCap)}</p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <p className="text-sm text-gray-400 mb-2">52 Week Range</p>
          <div className="flex items-center gap-2">
            <span className="text-red-400">${quote.week52Low}</span>
            <div className="h-1 flex-1 bg-gray-700 rounded">
              <div 
                className="h-full bg-blue-400 rounded"
                style={{ 
                  width: `${((quote.price - quote.week52Low) / (quote.week52High - quote.week52Low)) * 100}%`
                }}
              />
            </div>
            <span className="text-green-400">${quote.week52High}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


export default MarketTicker;  