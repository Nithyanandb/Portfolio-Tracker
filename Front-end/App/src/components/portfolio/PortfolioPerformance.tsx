import React, { useEffect, useState } from 'react';
import { Area } from '@ant-design/plots';
import { Calendar, Activity, TrendingUp, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { portfolioApi } from './portfolioApi';
import { LoginActivityData, ActivityStats } from './Portfolio';
import { toast } from 'react-hot-toast';
import { ActivityHeatmap } from './ActivityHeatmap';
import { ActivityChart } from './ActivityChart'; // Import the component
import { ActivityCard } from './ActivityCard';

export const PortfolioPerformance: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [loginActivity, setLoginActivity] = useState<LoginActivityData[]>([]);
  const [activityStats, setActivityStats] = useState<ActivityStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Transformation function
  const transformActivityStats = (backendStats: any): ActivityStats => {
    if (!backendStats) {
      throw new Error('Backend stats data is undefined');
    }

    const mostActiveDayCount = Math.max(...backendStats.lastSevenDaysCounts);
    const mostActiveDayIndex = backendStats.lastSevenDaysCounts.indexOf(mostActiveDayCount);
    const mostActiveDayDate = new Date();
    mostActiveDayDate.setDate(mostActiveDayDate.getDate() - (6 - mostActiveDayIndex));

    return {
      totalLogins: backendStats.totalLogins,
      averagePerDay: backendStats.totalLogins / 7,
      mostActiveDay: {
        date: mostActiveDayDate.toISOString().split('T')[0],
        count: mostActiveDayCount,
      },
      lastSevenDays: {
        dates: Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          return date.toISOString().split('T')[0];
        }),
        counts: backendStats.lastSevenDaysCounts,
      },
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoading(true);
        const [activityRes, statsRes] = await Promise.all([
          portfolioApi.getLoginActivity(),
          portfolioApi.getActivityStats(),
        ]);

        setLoginActivity(activityRes.data.data);
        const transformedStats = transformActivityStats(statsRes.data.data);
        setActivityStats(transformedStats);
      } catch (err) {
        setError('Failed to fetch activity data');
        toast.error('Error loading activity data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
        <p className="text-gray-400">Please log in to view your activity.</p>
      </motion.div>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="space-y-6">
      {/* Activity Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ActivityCard
          icon={<Calendar className="text-blue-400" />}
          title="Today's Logins"
          value={activityStats?.lastSevenDays.counts[6] || 0}
        />
      </div>

      {/* Activity Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
        <h3 className="text-lg font-medium text-white mb-6">Login Activity</h3>
        <ActivityHeatmap data={loginActivity} />
      </motion.div>

      {/* Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
        <h3 className="text-lg font-medium text-white mb-6">Activity Trends</h3>
        <ActivityChart data={loginActivity} />
      </motion.div>
    </div>
  );
};