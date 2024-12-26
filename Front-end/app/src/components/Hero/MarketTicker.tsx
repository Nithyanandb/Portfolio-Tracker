import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { API_CONFIG } from '../config/API_CONFIG';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface StockTickerProps {
  symbol: string;
}

const MarketTicker: React.FC<StockTickerProps> = ({ symbol }) => {
  const { data: stock } = useQuery({
    queryKey: ['stock', symbol],
    queryFn: () => fetch(API_CONFIG.getEndpointUrl(`QUOTE/${symbol}`)).then(res => res.json()),
    refetchInterval: API_CONFIG.CACHE_DURATION,
  });

  if (!stock) return null;

  const isPositive = stock.changePercent >= 0;

  return (
    <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-white">{symbol}</h3>
          <p className="text-sm text-gray-400">{stock.companyName}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-white">{formatCurrency(stock.price)}</p>
          <div className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{formatPercentage(stock.changePercent)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketTicker;