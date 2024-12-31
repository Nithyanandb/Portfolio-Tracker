import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Clock } from 'lucide-react';

interface StockMetricsProps {
  metrics: {
    marketCap: string;
    volume: string;
    dayRange: string;
    yearRange: string;
    peRatio: number;
  };
  trend: 'up' | 'down';
}

const StockMetrics: React.FC<StockMetricsProps> = ({ metrics, trend }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white/5 p-4 rounded-lg">
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <DollarSign className="w-4 h-4" />
          <span>Market Cap</span>
        </div>
        <p className="text-lg font-semibold">{metrics.marketCap}</p>
      </div>

      <div className="bg-white/5 p-4 rounded-lg">
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <BarChart3 className="w-4 h-4" />
          <span>Volume</span>
        </div>
        <p className="text-lg font-semibold">{metrics.volume}</p>
      </div>

      <div className="bg-white/5 p-4 rounded-lg">
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <Clock className="w-4 h-4" />
          <span>Day Range</span>
        </div>
        <p className="text-lg font-semibold">{metrics.dayRange}</p>
      </div>

      <div className="bg-white/5 p-4 rounded-lg">
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span>52 Week Range</span>
        </div>
        <p className="text-lg font-semibold">{metrics.yearRange}</p>
      </div>

      <div className="bg-white/5 p-4 rounded-lg">
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <DollarSign className="w-4 h-4" />
          <span>P/E Ratio</span>
        </div>
        <p className="text-lg font-semibold">{metrics.peRatio.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default StockMetrics;