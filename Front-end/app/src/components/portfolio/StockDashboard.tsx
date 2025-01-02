import React from 'react';

export const StockDashboard: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <h2 className="text-lg font-medium text-white mb-4">Stock Dashboard</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Current Price</span>
          <span className="text-white">₹0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Change</span>
          <span className="text-green-400">+0.00%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Volume</span>
          <span className="text-white">0</span>
        </div>
      </div>
    </div>
  );
};