import React from 'react';
import { Area } from '@ant-design/plots';
import { PortfolioStats } from './Portfolio';
import { ArrowUp, ArrowDown, Calendar, TrendingUp, Users, Activity } from 'lucide-react';

interface PortfolioPerformanceProps {
  stats: PortfolioStats | null;
}

export const PortfolioPerformance: React.FC<PortfolioPerformanceProps> = ({ stats }) => {
  if (!stats || !stats.dailyPerformance) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <p className="text-gray-400">Loading portfolio stats...</p>
      </div>
    );
  }

  // Calculate activity levels (similar to GitHub's contribution graph)
  const getActivityLevel = (value: number): number => {
    const max = Math.max(...stats.dailyPerformance.map(d => d.value));
    return max === 0 ? 0 : Math.ceil((value / max) * 4); // 0-4 levels like GitHub
  };

  const activityData = stats.dailyPerformance.map(day => ({
    ...day,
    level: getActivityLevel(day.value)
  }));

  // Group by weeks for the contribution graph
  const weeks = [];
  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7));
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-blue-400" />
            <div className="text-sm text-gray-400">Account Age</div>
          </div>
          <div className="text-2xl font-medium text-white">
            {Math.floor(stats.dailyPerformance.length / 30)} months
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-green-400" />
            <div className="text-sm text-gray-400">Trading Days</div>
          </div>
          <div className="text-2xl font-medium text-white">
            {stats.dailyPerformance.filter(d => d.value > 0).length} days
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <div className="text-sm text-gray-400">Best Day</div>
          </div>
          <div className="text-2xl font-medium text-green-500">
            ₹{Math.max(...stats.dailyPerformance.map(d => d.value)).toLocaleString()}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-yellow-400" />
            <div className="text-sm text-gray-400">Portfolio Size</div>
          </div>
          <div className="text-2xl font-medium text-white">
            {stats.totalInvestment?.toLocaleString() ?? 0} stocks
          </div>
        </div>
      </div>

      {/* Activity Graph */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-medium text-white mb-6">Trading Activity</h3>
        <div className="grid grid-cols-[repeat(53,1fr)] gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-3 h-3 rounded-sm transition-colors duration-200
                    ${day.level === 0 ? 'bg-white/5' :
                    day.level === 1 ? 'bg-green-900/50' :
                    day.level === 2 ? 'bg-green-700/50' :
                    day.level === 3 ? 'bg-green-500/50' :
                    'bg-green-300/50'}`}
                  title={`${day.date}: ₹${day.value.toLocaleString()}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-medium text-white mb-6">Performance</h3>
        <div className="h-[300px]">
          <Area {...config} data={stats.dailyPerformance} />
        </div>
      </div>
    </div>
  );
};

const config = {
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
  areaStyle: () => ({
    fill: 'l(270) 0:#1677ff00 0.5:#1677ff40 1:#1677ff',
  }),
}; 