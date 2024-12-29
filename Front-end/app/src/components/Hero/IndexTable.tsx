import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { MarketIndex } from '../types/market';
import { formatNumber, formatPercentage } from '/Users/nithy/Documents/Github/Portfolio-Tracker/Front-end/app/src/utils/formatters';

interface IndexTableProps {
  indices: MarketIndex[];
}

export const IndexTable: React.FC<IndexTableProps> = ({ indices }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 text-xs">
            <th className="text-left pb-4">Index</th>
            <th className="text-right pb-4">Last</th>
            <th className="text-right pb-4">Change</th>
            <th className="text-right pb-4">% Chg</th>
            <th className="text-right pb-4">High</th>
            <th className="text-right pb-4">Low</th>
            <th className="text-right pb-4">Time</th>
          </tr>
        </thead>
        <tbody>
          {indices.map((index) => (
            <tr key={index.symbol} className="border-t border-white/5">
              <td className="py-4">
                <div className="font-medium text-white">{index.name}</div>
                <div className="text-xs text-gray-400">{index.symbol}</div>
              </td>
              <td className="text-right text-white">
                {formatNumber(index.price)}
              </td>
              <td className={`text-right ${index.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                <span className="flex items-center justify-end gap-1">
                  {index.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {formatNumber(Math.abs(index.change))}
                </span>
              </td>
              <td className={`text-right ${index.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatPercentage(index.changePercent)}
              </td>
              <td className="text-right text-white">{formatNumber(index.high)}</td>
              <td className="text-right text-white">{formatNumber(index.low)}</td>
              <td className="text-right text-gray-400">
                {new Date(index.timestamp).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndexTable;