import React from 'react';
import type { MarketIndex } from '../../Hero/types/market';
import { formatNumber } from '../../../utils/formatters';
import { MiniChart } from './MiniChart';
import { TrendingValue } from './TableCell';

interface TableRowProps {
  index: MarketIndex;
  showMiniChart: boolean;
}

export const TableRow: React.FC<TableRowProps> = ({ index, showMiniChart }) => {
  return (
    <tr className="border-t border-white/5">
      <td className="py-4">
        <div className="font-medium text-white">{index.name || '-'}</div>
        <div className="text-xs text-gray-400">{index.symbol || '-'}</div>
      </td>
      {showMiniChart && (
        <td className="py-4">
          <div className="h-[40px]">
            <MiniChart 
              historicalData={index.historicalData || []} 
              change={index.change || 0} 
            />
          </div>
        </td>
      )}
      <td className="text-right text-white">
        {formatNumber(index.price)}
      </td>
      <td className="text-right">
        <TrendingValue value={index.change || 0} />
      </td>
      <td className="text-right">
        <TrendingValue 
          value={index.changePercent || 0} 
          formatter={(value) => `${value.toFixed(2)}%`}
        />
      </td>
      <td className="text-right text-white">{formatNumber(index.high)}</td>
      <td className="text-right text-white">{formatNumber(index.low)}</td>
      <td className="text-right text-gray-400">
        {index.timestamp ? new Date(index.timestamp).toLocaleTimeString() : '-'}
      </td>
    </tr>
  );
};