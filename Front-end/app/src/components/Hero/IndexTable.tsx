import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { MarketIndex } from '../types/market';
import { formatNumber, formatPercentage } from '../Hero/utils/formatters';
import { Line } from 'react-chartjs-2';

interface IndexTableProps {
  indices: MarketIndex[];
  showMiniChart?: boolean;
}

export const IndexTable: React.FC<IndexTableProps> = ({ indices, showMiniChart = false }) => {
  const miniChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    elements: {
      point: { radius: 0 },
      line: { borderWidth: 1.5 }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 text-xs">
            <th className="text-left pb-4">Index</th>
            {showMiniChart && <th className="pb-4 w-[100px]">Trend</th>}
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
                <div className="font-medium text-white">{index.name || '-'}</div>
                <div className="text-xs text-gray-400">{index.symbol || '-'}</div>
              </td>
              {showMiniChart && (
                <td className="py-4">
                  <div className="h-[40px]">
                    {index.historicalData && index.historicalData.length > 0 ? (
                      <Line
                        data={{
                          labels: index.historicalData.map(d => d.timestamp),
                          datasets: [{
                            data: index.historicalData.map(d => d.price),
                            borderColor: (index.change || 0) >= 0 ? '#4ade80' : '#f87171',
                            fill: false
                          }]
                        }}
                        options={miniChartOptions}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No data
                      </div>
                    )}
                  </div>
                </td>
              )}
              <td className="text-right text-white">
                {formatNumber(index.price)}
              </td>
              <td className={`text-right ${(index.change || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                <span className="flex items-center justify-end gap-1">
                  {(index.change || 0) >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {formatNumber(Math.abs(index.change || 0))}
                </span>
              </td>
              <td className={`text-right ${(index.changePercent || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatPercentage(index.changePercent)}
              </td>
              <td className="text-right text-white">{formatNumber(index.high)}</td>
              <td className="text-right text-white">{formatNumber(index.low)}</td>
              <td className="text-right text-gray-400">
                {index.timestamp ? new Date(index.timestamp).toLocaleTimeString() : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};