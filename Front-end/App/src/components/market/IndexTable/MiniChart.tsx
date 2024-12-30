import React from 'react';
import { Line } from 'react-chartjs-2';
import type { MarketIndex } from '../../../types/market';

interface MiniChartProps {
  historicalData: MarketIndex['historicalData'];
  change: number;
}

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

export const MiniChart: React.FC<MiniChartProps> = ({ historicalData, change }) => {
  if (!historicalData || historicalData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No data
      </div>
    );
  }

  return (
    <Line
      data={{
        labels: historicalData.map(d => d.timestamp),
        datasets: [{
          data: historicalData.map(d => d.price),
          borderColor: change >= 0 ? '#4ade80' : '#f87171',
          fill: false
        }]
      }}
      options={miniChartOptions}
    />
  );
};