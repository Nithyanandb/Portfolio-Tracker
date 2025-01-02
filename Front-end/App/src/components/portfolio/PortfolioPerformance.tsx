import React from 'react';
import { Area } from '@ant-design/plots';
import { PortfolioStats } from './Portfolio';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface PortfolioPerformanceProps {
  stats: PortfolioStats;
}

export const PortfolioPerformance: React.FC<PortfolioPerformanceProps> = ({ stats }) => {
  const config = {
    data: stats.dailyPerformance,
    xField: 'date',
    yField: 'value',
    smooth: true,
    animation: true,
    xAxis: {
      type: 'time',
      tickCount: 5,
      label: {
        style: {
          fill: '#ffffff80',
          fontSize: 12,
        },
      },
      grid: {
        line: {
          style: {
            stroke: '#ffffff10',
          },
        },
      },
    },
    yAxis: {
      label: {
        formatter: (v: string) => `₹${Number(v).toLocaleString()}`,
        style: {
          fill: '#ffffff80',
          fontSize: 12,
        },
      },
      grid: {
        line: {
          style: {
            stroke: '#ffffff10',
          },
        },
      },
    },
    tooltip: {
      customContent: (title: string, items: any[]) => {
        if (!items?.length) return '';
        const data = items[0];
        return `
          <div style="padding: 8px 12px;">
            <div style="color: white;">${title}</div>
            <div style="color: #1677ff;">₹${Number(data?.value).toLocaleString()}</div>
            <div style="color: ${data?.change >= 0 ? '#22c55e' : '#ef4444'};">
              ${data?.change >= 0 ? '▲' : '▼'} ${Math.abs(data?.change).toFixed(2)}%
            </div>
          </div>
        `;
      },
    },
    areaStyle: () => ({
      fill: 'l(270) 0:#1677ff00 0.5:#1677ff40 1:#1677ff',
    }),
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="text-sm text-gray-400">Total Investment</div>
          <div className="text-2xl font-medium text-white mt-2">
            ₹{stats.totalInvestment.toLocaleString()}
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="text-sm text-gray-400">Current Value</div>
          <div className="text-2xl font-medium text-white mt-2">
            ₹{stats.currentValue.toLocaleString()}
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="text-sm text-gray-400">Today's P&L</div>
          <div className={`text-2xl font-medium text-white flex items-center gap-2 ${
            stats.todaysPnL >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {stats.todaysPnL >= 0 ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
            ₹{Math.abs(stats.todaysPnL).toLocaleString()}
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="text-sm text-gray-400">Total P&L</div>
          <div className={`text-2xl font-medium text-white flex items-center gap-2 ${
            stats.totalPnL >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {stats.totalPnL >= 0 ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
            ₹{Math.abs(stats.totalPnL).toLocaleString()} ({stats.totalPnLPercentage.toFixed(2)}%)
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-medium text-white mb-6">Portfolio Performance</h3>
        <div className="h-[400px]">
          <Area {...config} />
        </div>
      </div>
    </div>
  );
}; 