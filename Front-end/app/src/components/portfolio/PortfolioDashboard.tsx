import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { PortfolioTable } from './PortfolioTable';
import { TransactionModal } from './TransactionModal';
import { getPortfolio, getPortfolioStats, fetchLoginActivity } from './portfolioApi';
import WatchlistManager from '../Hero/WatchlistManager';
import { PortfolioPerformance } from './PortfolioPerformance';
import StockDashboard from '../Stock/StockDashboard';
import TrendingStocks from '../Hero/TrendingStocks';
import { Portfolio, PortfolioStats } from './Portfolio';
import { useAuth } from '../hooks/useAuth'; // Import the useAuth hook
import './portfolioDashboard.css';

export const PortfolioDashboard: React.FC = () => {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [stats, setStats] = useState<PortfolioStats | null>(null);
  const [loginActivity, setLoginActivity] = useState<{ date: string; count: number }[]>([]);
  const [weeklyLoginActivity, setWeeklyLoginActivity] = useState<{ date: string; count: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<string>('');
  const [transactionType, setTransactionType] = useState<'BUY' | 'SELL'>('BUY');
  const { isAuthenticated, user, token } = useAuth(); // Get authentication details

  useEffect(() => {
    if (isAuthenticated && user && token) {
      fetchData();
    } else {
      // Reset state if the user is not authenticated
      setPortfolio([]);
      setStats(null);
      setLoginActivity([]);
      setWeeklyLoginActivity([]);
      setIsLoading(false);
      setError(null);
    }
  }, [isAuthenticated, user, token]); // Re-fetch when auth state changes

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [portfolioRes, statsRes, loginActivityRes] = await Promise.all([
        getPortfolio(token), // Pass token to getPortfolio
        getPortfolioStats(token), // Pass token to getPortfolioStats
        fetchLoginActivity(token) // Pass token to fetchLoginActivity
      ]);
      
      if (portfolioRes.data?.success && statsRes.data?.success) {
        setPortfolio(portfolioRes.data.data || []);
        setStats(statsRes.data.data || null);
      } else {
        setError('Failed to fetch portfolio data');
      }

      if (loginActivityRes.data) {
        setLoginActivity(loginActivityRes.data);
        const weeklyData = aggregateWeeklyLoginActivity(loginActivityRes.data);
        setWeeklyLoginActivity(weeklyData);
      }
    } catch (err) {
      setError('An error occurred while fetching data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const aggregateWeeklyLoginActivity = (data: { date: string; count: number }[]) => {
    const weeklyData: { [key: string]: number } = {};

    data.forEach((entry) => {
      const date = new Date(entry.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay()); // Start of the week (Sunday)
      const weekKey = weekStart.toISOString().split('T')[0]; // Format as YYYY-MM-DD

      if (!weeklyData[weekKey]) {
        weeklyData[weekKey] = 0;
      }
      weeklyData[weekKey] += entry.count;
    });

    return Object.keys(weeklyData).map((weekKey) => ({
      date: weekKey,
      count: weeklyData[weekKey],
    }));
  };

  const filterLastYearData = (data: { date: string; count: number }[]) => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return data.filter((entry) => new Date(entry.date) >= oneYearAgo);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#fff' }}>Please log in to view your portfolio.</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ animation: 'spin 1s linear infinite', borderRadius: '50%', height: '8rem', width: '8rem', borderTop: '2px solid #6b7280', borderBottom: '2px solid #6b7280' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ color: '#ef4444' }}>{error}</div>
      </div>
    );
  }

  const handleTransaction = (type: 'BUY' | 'SELL', symbol: string) => {
    setTransactionType(type);
    setSelectedStock(symbol);
    setIsModalOpen(true);
  };

  return (
    <div className='pt-32' style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: '650px', backgroundColor: '#111', padding: '1.5rem', borderRight: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff', marginBottom: '1.5rem' }}>Login Activity</h2>
        <CalendarHeatmap
          startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))} // Last 1 year
          endDate={new Date()}
          values={filterLastYearData(weeklyLoginActivity)}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            return `color-custom-${Math.min(value.count, 4)}`; // Scale counts to 4 levels
          }}
          tooltipDataAttrs={(value) => ({
            'data-tooltip': value
              ? `${value.date}: ${value.count} login${value.count !== 1 ? 's' : ''}`
              : 'No data',
          })}
          showWeekdayLabels={true}
          onClick={(value) => {
            if (value) {
              alert(`Week of ${value.date}: ${value.count} logins`);
            }
          }}
        />
        {/* Portfolio Performance */}
        <PortfolioPerformance stats={{ dailyPerformance: loginActivity }} />
        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#161b22' }} />
            <span style={{ fontSize: '0.875rem', color: '#8b949e' }}>No activity</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#0e4429' }} />
            <span style={{ fontSize: '0.875rem', color: '#8b949e' }}>1 login</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#006d32' }} />
            <span style={{ fontSize: '0.875rem', color: '#8b949e' }}>2 logins</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#26a641' }} />
            <span style={{ fontSize: '0.875rem', color: '#8b949e' }}>3 logins</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#39d353' }} />
            <span style={{ fontSize: '0.875rem', color: '#8b949e' }}>4+ logins</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem' }}>
        {/* Header */}
        <header style={{ marginBottom: '2rem', display: 'inline-flex', justifyContent: 'space-between', alignItems: 'center'}}>
           {user && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4rem' }}>
              <span style={{ fontSize: '1.875rem', fontWeight: '600', color: '#f3f4f6' }}>Welcome, {user.name}</span>
            </div>
          )}
        </header>

        {/* Holdings Table */}
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '2rem' }}>
          <div style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#fff' }}>Holdings</h2>
          </div>
          <PortfolioTable
            data={portfolio}
            onBuyClick={(symbol) => handleTransaction('BUY', symbol)}
            onSellClick={(symbol) => handleTransaction('SELL', symbol)}
          />
        </div>

        {/* Stock Dashboard & Watchlist */}
        <div className="grid-container">
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)', overflow: 'hidden' }}>
            <StockDashboard />
          </div>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)', overflow: 'hidden' }}>
            <WatchlistManager 
              watchlist={[]} 
              onRemove={async (id) => {}} 
              onUpdate={async (id, data) => {}} 
              onAdd={async (symbol) => {}} 
            />
          </div>
        </div>

        {/* Trending Stocks */}
        <div style={{ marginTop: '2rem' }}>
          <TrendingStocks />
        </div>
      </div>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={transactionType}
        symbol={selectedStock}
        currentPrice={portfolio.find(p => p.symbol === selectedStock)?.currentPrice}
        onSubmit={handleTransaction}
      />
    </div>
  );
};