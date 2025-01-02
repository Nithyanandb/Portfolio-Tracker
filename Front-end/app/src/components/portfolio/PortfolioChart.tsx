import React from 'react';
import { Area } from '@ant-design/plots';

interface PortfolioChartProps {
  data: Array<{ date: string; value: number }>;
  timeframes?: string[];
  activeTimeframe?: string;
  onTimeframeChange?: (timeframe: string) => void;
}

export const PortfolioChart: React.FC<PortfolioChartProps> = ({
  data,
  timeframes = ['1D', '1W', '1M', '1Y', 'ALL'],
  activeTimeframe = '1D',
  onTimeframeChange = () => {}
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-white">Performance</h2>
        <div className="flex gap-2 bg-white/5 backdrop-blur-sm rounded-xl p-1">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => onTimeframeChange(timeframe)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                ${activeTimeframe === timeframe 
                  ? 'bg-white text-black shadow-lg' 
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[400px]">
        <Area {...chartConfig} data={data} />
      </div>
    </div>
  );
};

const chartConfig = {
  xField: "date",
  yField: "value",
  smooth: true,
  line: {
    color: '#fff',
  },
  areaStyle: {
    fill: 'l(270) 0:#ffffff00 0.5:#ffffff10 1:#ffffff20',
  },
  xAxis: {
    label: {
      style: {
        fill: '#666',
      },
    },
    grid: {
      line: {
        style: {
          stroke: '#ffffff10',
          lineDash: [4, 4],
        },
      },
    },
  },
  yAxis: {
    label: {
      formatter: (v: any) => `$${v}`,
      style: {
        fill: '#666',
      },
    },
    grid: {
      line: {
        style: {
          stroke: '#ffffff10',
          lineDash: [4, 4],
        },
      },
    },
  }
};