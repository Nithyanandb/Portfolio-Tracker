import React from 'react';
import { Flame } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { API_CONFIG } from '../config/API_CONFIG';
import { formatCurrency, formatPercentage } from './formatters';

const TrendingStocks: React.FC = () => {
  const { data: trending } = useQuery({
    queryKey: ['trending-stocks'],
    queryFn: () => fetch(API_CONFIG.getEndpointUrl('TRENDING')).then(res => res.json()),
    refetchInterval: API_CONFIG.CACHE_DURATION,
  });

  return (
    <div className="bg-gray-900 rounded-xl border border-white/10">
      <div className="flex items-center gap-2 p-4 border-b border-white/10">
        <Flame className="w-5 h-5 text-orange-400" />
        <h2 className="text-lg font-semibold text-white">Trending</h2>
      </div>
      <div className="p-4 space-y-2">
        {trending?.map((stock: any) => (
          <div key={stock.symbol} className="flex justify-between items-center">
            <div>
              <p className="font-medium text-white">{stock.symbol}</p>
              <p className="text-sm text-gray-400">{stock.companyName}</p>
            </div>
            <div className="text-right">
              <p className="text-white">{formatCurrency(stock.price)}</p>
              <p className={stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}>
                {formatPercentage(stock.changePercent)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingStocks;