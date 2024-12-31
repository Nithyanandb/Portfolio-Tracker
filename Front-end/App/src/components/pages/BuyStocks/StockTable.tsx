import React from 'react';
import { Stock } from './stockApi';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StockTableProps {
  stocks: Stock[];
  onBuyClick: (stock: Stock) => void;
  loading: boolean;
}

export const StockTable: React.FC<StockTableProps> = ({
  stocks,
  onBuyClick,
  loading,
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 animate-pulse"
          >
            <div className="h-6 bg-zinc-800 rounded w-24 mb-2" />
            <div className="h-4 bg-zinc-800 rounded w-32" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {stocks.map((stock) => (
        <div
          key={stock.symbol}
          className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 hover:bg-zinc-900/70 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-medium">{stock.symbol}</h3>
                <span className="text-sm text-gray-400">{stock.name}</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-2xl font-medium">
                  ${stock.price.toFixed(2)}
                </span>
                <span
                  className={`flex items-center gap-1 text-sm ${
                    stock.change && stock.change > 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {stock.change && stock.change > 0 ? (
                    <ArrowUp size={16} />
                  ) : (
                    <ArrowDown size={16} />
                  )}
                  {Math.abs(stock.change || 0).toFixed(2)}%
                </span>
              </div>
            </div>
            <button
              onClick={() => onBuyClick(stock)}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Buy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};