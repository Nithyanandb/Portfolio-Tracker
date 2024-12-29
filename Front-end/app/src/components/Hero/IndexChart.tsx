import React, { useMemo } from 'react';
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
  ChartOptions
} from 'chart.js';
import type { MarketIndex } from '../types/market';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IndexChartProps {
  indices: MarketIndex[];
}

export const IndexChart: React.FC<IndexChartProps> = ({ indices }) => {
  const chartData = useMemo(() => {
    return {
      labels: indices.map(index => index.name),
      datasets: [
        {
          label: 'Price Change %',
          data: indices.map(index => index.changePercent),
          borderColor: indices.map(index => 
            index.changePercent >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'
          ),
          backgroundColor: indices.map(index => 
            index.changePercent >= 0 ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)'
          ),
        }
      ]
    };
  }, [indices]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  return (
    <div className="h-[300px] bg-white/5 rounded-lg p-4">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default IndexChart;