import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

interface MiniChartProps {
  data: number[];
  isPositive: boolean;
  width?: number;
  height?: number;
}

export const MiniChart: React.FC<MiniChartProps> = ({ 
  data, 
  isPositive, 
  width = 100, 
  height = 32 
}) => {
  const chartData = useMemo(() => ({
    labels: new Array(data.length).fill(''),
    datasets: [
      {
        data,
        fill: true,
        tension: 0.4,
        borderColor: isPositive ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)',
        borderWidth: 1.5,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, height);
          if (isPositive) {
            gradient.addColorStop(0, 'rgba(34, 197, 94, 0.2)');
            gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
          } else {
            gradient.addColorStop(0, 'rgba(239, 68, 68, 0.2)');
            gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
          }
          return gradient;
        },
        pointRadius: 0,
        pointHoverRadius: 0
      }
    ]
  }), [data, isPositive, height]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
        grid: {
          display: false
        }
      },
      y: {
        display: false,
        grid: {
          display: false
        }
      }
    },
    plugins: {
      tooltip: {
        enabled: false
      },
      legend: {
        display: false
      }
    },
    interaction: {
      intersect: false
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ width, height }}
    >
      <Line data={chartData} options={options} />
    </motion.div>
  );
}; 