import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency, formatPercentage } from './formatters';

interface MarketSummaryProps {
  data: any;
}

const MarketSummary: React.FC<MarketSummaryProps> = ({ data }) => {
  if (!data) return null;

  const indices = [
    { name: 'S&P 500', value: data.sp500 },
    { name: 'Dow Jones', value: data.dowJones },
    { name: 'Nasdaq', value: data.nasdaq },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-4 border-b border-white/10">
      {indices.map((index) => {
        const isPositive = index.value.changePercent >= 0;
        return (
          <div key={index.name} className="text-center">
            <h3 className="text-sm text-gray-400">{index.name}</h3>
            <p className="text-lg font-semibold text-white">{formatCurrency(index.value.price)}</p>
            <div className={`flex items-center justify-center gap-1 ${
              isPositive ? 'text-green-400' : 'text-red-400'
            }`}>
              {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              <span>{formatPercentage(index.value.changePercent)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MarketSummary;