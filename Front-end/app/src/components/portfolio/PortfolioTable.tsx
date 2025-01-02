import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Portfolio } from './Portfolio';

interface PortfolioTableProps {
  data: Portfolio[];
  onBuyClick: (symbol: string) => void;
  onSellClick: (symbol: string) => void;
}

export const PortfolioTable: React.FC<PortfolioTableProps> = ({
  data = [],
  onBuyClick,
  onSellClick,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 ">
        <p className="text-gray-400 text-lg font-medium">No holdings found</p>
        <p className="text-gray-500 text-sm mt-2">Start your investment journey today</p>
      </div>
    );
  }

  const formatNumber = (value: number | undefined) => {
    return value?.toFixed(2) ?? '0.00';
  };

  return (
    <div className="overflow-hidden backdrop-blur-xl ">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-4 px-6 text-xs font-medium text-gray-400 text-left">Instrument</th>
            <th className="py-4 px-6 text-xs font-medium text-gray-400 text-right">Qty.</th>
            <th className="py-4 px-6 text-xs font-medium text-gray-400 text-right">Avg. Price</th>
            <th className="py-4 px-6 text-xs font-medium text-gray-400 text-right">Current Price</th>
            <th className="py-4 px-6 text-xs font-medium text-gray-400 text-right">Current Value</th>
            <th className="py-4 px-6 text-xs font-medium text-gray-400 text-right">P&L</th>
            <th className="py-4 px-6 text-xs font-medium text-gray-400 text-center">Actions</th>
            <th className="py-4 px-6 text-xs font-medium text-gray-400 text-center">Last Updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((holding) => (
            <tr key={holding.id} className="hover:bg-white/5 transition-colors">
              <td className="py-4 px-6">
                <div>
                  <div className="font-medium text-white">{holding.symbol}</div>
                  <div className="text-xs text-gray-400">{holding.name}</div>
                </div>
              </td>
              <td className="py-4 px-6 text-right font-mono text-white">
                {holding.shares}
              </td>
              <td className="py-4 px-6 text-right font-mono text-white">
                ₹{formatNumber(holding.averagePrice)}
              </td>
              <td className="py-4 px-6 text-right font-mono text-white">
                ₹{formatNumber(holding.currentPrice)}
              </td>
              <td className="py-4 px-6 text-right font-mono text-white">
                ₹{formatNumber(holding.value)}
              </td>
              <td className="py-4 px-6 text-right">
                <div className={`flex items-center justify-end gap-1.5 font-mono
                  ${(holding.totalReturn ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}
                >
                  {(holding.totalReturn ?? 0) >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  <span>₹{formatNumber(Math.abs(holding.totalReturn ?? 0))}</span>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onBuyClick(holding.symbol)}
                    className="px-4 py-1.5 bg-green-500/10 text-green-400 rounded-lg text-xs font-medium 
                             hover:bg-green-500/20 transition-colors"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => onSellClick(holding.symbol)}
                    className="px-4 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs font-medium
                             hover:bg-red-500/20 transition-colors"
                  >
                    Sell
                  </button>
                </div>
              </td>
              <td className="py-4 px-6 text-right font-mono text-white">
                {holding.purchaseDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};