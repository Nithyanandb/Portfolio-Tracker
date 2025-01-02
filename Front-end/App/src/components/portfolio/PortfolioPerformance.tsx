import React, { useEffect, useState } from 'react';
import { Area } from '@ant-design/plots';
import { Calendar, Activity, TrendingUp, Users } from 'lucide-react';
import { useAuth } from '../hooks/useAuth'; // Import the useAuth hook
import { toast } from 'react-hot-toast';

interface LoginActivity {
  date: string;
  count: number;
}

interface PortfolioPerformanceProps {
  stats: {
    dailyPerformance: LoginActivity[];
    totalInvestment?: number;
  } | null;
}

export const PortfolioPerformance: React.FC<PortfolioPerformanceProps> = ({ stats }) => {
  const { isAuthenticated, user, token } = useAuth(); // Get authentication details
  const [loginActivity, setLoginActivity] = useState<LoginActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch login activity data
  useEffect(() => {
    const fetchLoginActivity = async () => {
      if (!isAuthenticated || !user || !token) {
        // Reset state if the user is not authenticated
        setLoginActivity([]);
        setIsLoading(false);
        setError(null);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('http://localhost:2000/api/user/login-activity', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch login activity');
        }

        const data = await response.json();
        setLoginActivity(data);
      } catch (error) {
        setError('Error fetching login activity');
        toast.error('Error fetching login activity');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoginActivity();
  }, [isAuthenticated, user, token]); // Re-fetch when auth state changes

  if (!isAuthenticated) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <p className="text-gray-400">Please log in to view your portfolio performance.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <p className="text-gray-400">Loading login activity...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!loginActivity || loginActivity.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <p className="text-gray-400">No login activity found.</p>
      </div>
    );
  }

  // Calculate activity levels (similar to GitHub's contribution graph)
  const getActivityLevel = (count: number): number => {
    const max = Math.max(...loginActivity.map((d) => d.count));
    return max === 0 ? 0 : Math.ceil((count / max) * 4); // 0-4 levels like GitHub
  };

  const activityData = loginActivity.map((day) => ({
    ...day,
    level: getActivityLevel(day.count),
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
            {Math.floor(loginActivity.length / 30)} months
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-green-400" />
            <div className="text-sm text-gray-400">Active Days</div>
          </div>
          <div className="text-2xl font-medium text-white">
            {loginActivity.filter((d) => d.count > 0).length} days
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <div className="text-sm text-gray-400">Most Active Day</div>
          </div>
          <div className="text-2xl font-medium text-green-500">
            {Math.max(...loginActivity.map((d) => d.count))} logins
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-yellow-400" />
            <div className="text-sm text-gray-400">Total Logins</div>
          </div>
          <div className="text-2xl font-medium text-white">
            {loginActivity.reduce((acc, curr) => acc + curr.count, 0)}
          </div>
        </div>
      </div>

      {/* Activity Graph */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-medium text-white mb-6">Login Activity</h3>
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
                  title={`${day.date}: ${day.count} logins`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-medium text-white mb-6">Login Performance</h3>
        <div className="h-[300px]">
          <Area {...config} data={loginActivity} />
        </div>
      </div>
    </div>
  );
};

const config = {
  xField: 'date',
  yField: 'count',
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
      formatter: (v: string) => `${Number(v)} logins`,
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