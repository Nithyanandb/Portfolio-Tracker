import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatNumber, formatPercentage } from '../../../utils/formatters';

interface TrendingValueProps {
  value: number;
  formatter?: (value: number) => string;
}

export const TrendingValue: React.FC<TrendingValueProps> = ({ 
  value, 
  formatter = formatNumber 
}) => {
  const isPositive = value >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const trendColor = isPositive ? 'text-green-400' : 'text-red-400';

  return (
    <span className={`flex items-center justify-end gap-1 ${trendColor}`}>
      <TrendIcon size={16} />
      {formatter(Math.abs(value))}
    </span>
  );
};