import React from 'react';

interface TradingChartProps {
  className?: string;
}

const TradingChart: React.FC<TradingChartProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white/5 rounded-lg p-4 ${className}`}>
      <div className="aspect-video bg-white/10 rounded-lg" />
    </div>
  );
};

export default TradingChart;