import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { MarketIndex } from '../types/market';
import { formatNumber, formatPercentage } from '../../utils/formatters';

interface IndexTableProps {
  indices: MarketIndex[];
}

export const IndexTable: React.FC<IndexTableProps> = ({ indices }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-4 px-4">
              <span className="text-xs text-gray-400 tracking-[0.2em] font-light">INDEX</span>
            </th>
            <th className="text-right py-4 px-4">
              <span className="text-xs text-gray-400 tracking-[0.2em] font-light">LAST</span>
            </th>
            <th className="text-right py-4 px-4">
              <span className="text-xs text-gray-400 tracking-[0.2em] font-light">CHANGE</span>
            </th>
            <th className="text-right py-4 px-4">
              <span className="text-xs text-gray-400 tracking-[0.2em] font-light">% CHG</span>
            </th>
            <th className="text-right py-4 px-4">
              <span className="text-xs text-gray-400 tracking-[0.2em] font-light">HIGH</span>
            </th>
            <th className="text-right py-4 px-4">
              <span className="text-xs text-gray-400 tracking-[0.2em] font-light">LOW</span>
            </th>
            <th className="text-right py-4 px-4">
              <span className="text-xs text-gray-400 tracking-[0.2em] font-light">TIME</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {indices.map((index, i) => (
            <motion.tr
              key={index.symbol}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border-b border-white/5 hover:bg-white/5 transition-colors group"
            >
              <td className="py-4 px-4">
                <div className="font-light tracking-wider text-white">{index.name}</div>
                <div className="text-xs text-gray-400 tracking-wider mt-1">{index.symbol}</div>
              </td>
              <td className="text-right py-4 px-4">
                <span className="text-white font-light tracking-wider">
                  {formatNumber(index.price)}
                </span>
              </td>
              <td className={`text-right py-4 px-4 ${index.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                <span className="flex items-center justify-end gap-1">
                  {index.change >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="font-light tracking-wider">
                    {formatNumber(Math.abs(index.change))}
                  </span>
                </span>
              </td>
              <td className={`text-right py-4 px-4 ${index.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                <span className="font-light tracking-wider">
                  {formatPercentage(index.changePercent)}
                </span>
              </td>
              <td className="text-right py-4 px-4">
                <span className="text-white font-light tracking-wider">
                  {formatNumber(index.high)}
                </span>
              </td>
              <td className="text-right py-4 px-4">
                <span className="text-white font-light tracking-wider">
                  {formatNumber(index.low)}
                </span>
              </td>
              <td className="text-right py-4 px-4">
                <span className="text-gray-400 font-light tracking-wider">
                  {new Date(index.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndexTable;

