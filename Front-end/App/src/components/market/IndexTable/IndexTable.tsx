import React from 'react';
import type { MarketIndex } from '../../Hero/types/market';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

interface IndexTableProps {
  indices: MarketIndex[];
  showMiniChart?: boolean;
}

export const IndexTable: React.FC<IndexTableProps> = ({ indices, showMiniChart = false }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <TableHeader showMiniChart={showMiniChart} />
        </thead>
        <tbody>
          {indices.map((index) => (
            <TableRow 
              key={index.symbol} 
              index={index} 
              showMiniChart={showMiniChart} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};