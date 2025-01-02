import React from 'react';

export const TrendingStocks: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <h2 className="text-lg font-medium text-white mb-4">Trending Stocks</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-white">AAPL</span>
          <span className="text-green-400">+1.23%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white">TSLA</span>
          <span className="text-red-400">-0.56%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white">AMZN</span>
          <span className="text-green-400">+2.34%</span>
        </div>
      </div>
    </div>
  );
};