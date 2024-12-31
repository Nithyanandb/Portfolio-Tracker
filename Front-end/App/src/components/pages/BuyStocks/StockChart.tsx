import React, { useState, useEffect } from 'react';
import { Stock } from './stockApi';
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
  stock: Stock;
  timeFrame: string;
}

export const StockChart: React.FC<StockChartProps> = ({ stock, timeFrame }) => {
  const [priceHistory, setPriceHistory] = useState<number[]>([stock.price]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPriceHistory(prev => {
        if (prev.length > 100) prev.shift();
        return [...prev, stock.price];
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [stock.price]);

  const chartData = {
    labels: priceHistory.map((_, i) => i.toString()),
    datasets: [{
      label: stock.symbol,
      data: priceHistory,
      borderColor: stock.change !== undefined && stock.change >= 0 ? 'rgb(52, 211, 153)' : 'rgb(239, 68, 68)',
      backgroundColor: stock.change !== undefined && stock.change >= 0 
        ? 'rgba(52, 211, 153, 0.1)' 
        : 'rgba(239, 68, 68, 0.1)',
      tension: 0.4,
      fill: true,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'normal' as const,
        },
        bodyFont: {
          size: 14,
        },
        callbacks: {
          label: function(context: any) {
            return `₹ ${context.parsed.y.toFixed(2)}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.4)',
          font: {
            size: 10,
          },
          maxRotation: 0,
          maxTicksLimit: 6,
        },
      },
      y: {
        position: 'right' as const,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.4)',
          font: {
            size: 10,
          },
          callback: function(value: any) {
            return '₹' + value.toFixed(0);
          },
          maxTicksLimit: 5,
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px] relative">
      <Line data={chartData} options={options} />
      <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-xl rounded-lg px-2 py-1">
        <div className="text-xs text-white/60">Current</div>
        <div className="text-sm font-medium">₹{(stock.price * 83).toFixed(2)}</div>
      </div>
    </div>
  );
}; 