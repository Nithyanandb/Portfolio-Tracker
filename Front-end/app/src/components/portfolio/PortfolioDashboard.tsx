import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { PortfolioTable } from './PortfolioTable';
import { TransactionModal } from './TransactionModal';
import { portfolioApi } from './portfolioApi';
import WatchlistManager from '../Hero/WatchlistManager';
import { PortfolioPerformance } from './PortfolioPerformance';
import StockDashboard from '../Stock/StockDashboard';
import TrendingStocks from '../Hero/TrendingStocks';
import { Portfolio, PortfolioStats } from './Portfolio';
import { useAuth } from '../hooks/useAuth';
import { BuyModal } from '../pages/BuyStocks/BuyModal';
import { TrendingUp, TrendingDown } from 'lucide-react'; // Import icons
import './portfolioDashboard.css';

export const PortfolioDashboard: React.FC = () => {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [stats, setStats] = useState<PortfolioStats | null>(null);
  const [pageViews, setPageViews] = useState<{ date: string; count: number }[]>([]);
  const [weeklyPageViews, setWeeklyPageViews] = useState<{ date: string; count: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<string>('');
  const [transactionType, setTransactionType] = useState<'BUY' | 'SELL'>('BUY');
  const [buyModalStock, setBuyModalStock] = useState<{ symbol: string; name: string; price: number } | null>(null);
  const { isAuthenticated, user, token } = useAuth();

  // Track previous portfolio value
  const prevPortfolioValueRef = useRef<number>(0);
  const portfolioValue = calculatePortfolioValue(portfolio);

  // Determine if portfolio value has increased or decreased
  const portfolioChange = portfolioValue - prevPortfolioValueRef.current;
  const portfolioChangePercent = ((portfolioChange / prevPortfolioValueRef.current) * 100).toFixed(2);

  // Update previous portfolio value
  useEffect(() => {
    prevPortfolioValueRef.current = portfolioValue;
  }, [portfolioValue]);

  // Track page views
  useEffect(() => {
    if (isAuthenticated) {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      const updatedPageViews = [...pageViews];
      const existingEntryIndex = updatedPageViews.findIndex((entry) => entry.date === today);

      if (existingEntryIndex !== -1) {
        updatedPageViews[existingEntryIndex].count += 1; // Increment count for today
      } else {
        updatedPageViews.push({ date: today, count: 1 }); // Add new entry for today
      }

      setPageViews(updatedPageViews);
      const weeklyData = aggregateWeeklyPageViews(updatedPageViews);
      setWeeklyPageViews(weeklyData);
    }
  }, [isAuthenticated]);

  // Fetch portfolio data
  useEffect(() => {
    if (isAuthenticated && user && token) {
      fetchData();
    } else {
      setPortfolio([]);
      setStats(null);
      setPageViews([]);
      setWeeklyPageViews([]);
      setIsLoading(false);
      setError(null);
    }
  }, [isAuthenticated, user, token]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [portfolioRes, statsRes] = await Promise.all([
        portfolioApi.getPortfolio(),
        portfolioApi.getPortfolioStats(),
      ]);

      if (portfolioRes.data?.success && statsRes.data?.success) {
        setPortfolio(portfolioRes.data.data || []);
        setStats(statsRes.data.data || null);
      } else {
        setError('Failed to fetch portfolio data');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('An error occurred while fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  const aggregateWeeklyPageViews = (data: { date: string; count: number }[]) => {
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

  const handleBuy = async (transactionData: {
    stockSymbol: string;
    stockName: string;
    quantity: number;
    price: number;
  }) => {
    try {
      const response = await fetch('https://production-backend-production.up.railway.app/transaction/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process transaction');
      }

      console.log('Transaction successful');
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  const handleTransaction = (type: 'BUY' | 'SELL', symbol: string) => {
    setTransactionType(type);
    setSelectedStock(symbol);
    setIsModalOpen(true);
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

  return (
    <div className='pt-32' style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: '650px', backgroundColor: '#111', padding: '1.5rem', borderRight: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff', marginBottom: '1.5rem' }}>Page Views</h2>
        <CalendarHeatmap
          startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
          endDate={new Date()}
          values={filterLastYearData(weeklyPageViews)}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            if (value.count === 0) {
              return 'color-github-0';
            } else if (value.count <= 3) {
              return 'color-github-1';
            } else if (value.count <= 6) {
              return 'color-github-2';
            } else if (value.count <= 9) {
              return 'color-github-3';
            } else {
              return 'color-github-4';
            }
          }}
          tooltipDataAttrs={(value) => ({
            'data-tooltip': value
              ? `${value.date}: ${value.count} page view${value.count !== 1 ? 's' : ''}`
              : 'No data',
          })}
          showWeekdayLabels={true}
          onClick={(value) => {
            if (value) {
              alert(`Week of ${value.date}: ${value.count} page views`);
            }
          }}
        />

        <div style={{ display: 'flex', gap: '2rem' }}>
          {/* Stock Dashboard */}
          <div style={{ flex: 2, backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)', overflow: 'hidden' }}>
            <StockDashboard
              onBuy={(symbol) => handleTransaction('BUY', symbol)}
              onSell={(symbol) => handleTransaction('SELL', symbol)}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Header */}
        <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>
              <span style={{ fontSize: '1.875rem', fontWeight: '600', color: '#f3f4f6' }}>Welcome, {user.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: '500', color: '#f3f4f6' }}>
                  Portfolio Value: ${portfolioValue.toFixed(2)}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {portfolioChange >= 0 ? (
                    <TrendingUp size={20} color="#34D399" /> // Green for increase
                  ) : (
                    <TrendingDown size={20} color="#EF4444" /> // Red for decrease
                  )}
                  <span
                    style={{
                      fontSize: '1rem',
                      fontWeight: '500',
                      color: portfolioChange >= 0 ? '#34D399' : '#EF4444',
                    }}
                  >
                    {portfolioChange >= 0 ? '+' : ''}
                    {portfolioChangePercent}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Holdings Table */}
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#fff' }}>Holdings</h2>
          </div>
          <PortfolioTable
            data={portfolio}
            onBuyClick={(symbol) => handleTransaction('BUY', symbol)}
            onSellClick={(symbol) => handleTransaction('SELL', symbol)}
          />
        </div>

        {/* Watchlist Manager */}
        <div style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)', overflow: 'hidden' }}>
          <WatchlistManager
            watchlist={[]}
            onRemove={async (id) => {}}
            onUpdate={async (id, data) => {}}
            onAdd={async (symbol) => {}}
          />
        </div>

        {/* Trending Stocks */}
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.5rem' }}>
          <TrendingStocks />
        </div>
      </div>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={transactionType}
        symbol={selectedStock}
        currentPrice={portfolio.find((p) => p.symbol === selectedStock)?.currentPrice}
        onSubmit={handleTransaction}
      />

      {/* Buy Modal */}
      {buyModalStock && (
        <BuyModal
          stock={{
            symbol: buyModalStock.symbol,
            name: buyModalStock.name,
            price: typeof buyModalStock.price === 'number' ? buyModalStock.price : 0,
          }}
          onClose={() => setBuyModalStock(null)}
          onSuccess={() => {
            handleBuy({
              stockSymbol: buyModalStock.symbol,
              stockName: buyModalStock.name,
              quantity: 1,
              price: typeof buyModalStock.price === 'number' ? buyModalStock.price : 0,
            });
            setBuyModalStock(null);
          }}
        />
      )}
    </div>
  );
};

const calculatePortfolioValue = (portfolio: Portfolio[]) => {
  return portfolio.reduce((total, holding) => {
    const value = holding.value || 0; 
    return total + value; 
  }, 0);
};