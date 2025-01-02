import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StockChartProps {
  data: {
    timestamps: number[];
    prices: number[];
  };
  isPositive: boolean;
}

export const StockChart: React.FC<StockChartProps> = ({ data, isPositive }) => {
  const chartData = {
    labels: data.timestamps.map(t => format(new Date(t * 1000), 'HH:mm')),
    datasets: [
      {
        label: 'Price',
        data: data.prices,
        borderColor: isPositive ? '#16a34a' : '#dc2626',
        backgroundColor: isPositive ? 'rgba(22, 163, 74, 0.1)' : 'rgba(220, 38, 38, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 6,
          color: '#9ca3af',
        },
      },
      y: {
        grid: {
          color: '#f3f4f6',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  return (
    <div className="h-[400px]">
      <Line data={chartData} options={options} />
    </div>
  );
};