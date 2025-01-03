import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { PortfolioTable } from './PortfolioTable';
import { TransactionModal } from './TransactionModal';
import { portfolioApi } from './portfolioApi';
import WatchlistManager from '../Hero/WatchlistManager';
import StockDashboard from '../Stock/StockDashboard';
import TrendingStocks from '../Hero/TrendingStocks';
import { Portfolio, PortfolioStats } from './Portfolio';
import { useAuth } from '../hooks/useAuth';
import { BuyModal } from '../pages/BuyStocks/BuyModal';
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
  const [buyModalStock, setBuyModalStock] = useState<{ symbol: string; name: string; price: number } | null>(null);
  const { isAuthenticated, user, token } = useAuth();

  // Calculate portfolio value and profit/loss
  const portfolioValue = portfolio.reduce((total, stock) => {
    return total + (stock.quantity * (stock.currentPrice || 0));
  }, 0);

  const totalInvested = portfolio.reduce((total, stock) => {
    return total + (stock.quantity * (stock.averagePrice || 0));
  }, 0);

  const profitLoss = portfolioValue - totalInvested;
  const profitLossPercentage = ((profitLoss / totalInvested) * 100).toFixed(2);

  // Fetch real-time stock prices periodically
  useEffect(() => {
    const fetchStockPrices = async () => {
      try {
        const updatedPortfolio = await Promise.all(
          portfolio.map(async (stock) => {
            const quote = await fetchStockQuote(stock.symbol); // Replace with your API call
            return {
              ...stock,
              currentPrice: quote?.currentPrice || stock.currentPrice,
            };
          })
        );
        setPortfolio(updatedPortfolio);
      } catch (err) {
        console.error('Error fetching stock prices:', err);
      }
    };

    const interval = setInterval(fetchStockPrices, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, [portfolio]);

  // Fetch portfolio data on mount or auth change
  useEffect(() => {
    if (isAuthenticated && user && token) {
      fetchData();
    } else {
      setPortfolio([]);
      setStats(null);
      setLoginActivity([]);
      setWeeklyLoginActivity([]);
      setIsLoading(false);
      setError(null);
    }
  }, [isAuthenticated, user, token]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [portfolioRes, statsRes, loginActivityRes] = await Promise.all([
        portfolioApi.getPortfolio(),
        portfolioApi.getPortfolioStats(),
        portfolioApi.getLoginActivity()
      ]);

      if (portfolioRes.data?.success && statsRes.data?.success) {
        setPortfolio(portfolioRes.data.data || []);
        setStats(statsRes.data.data || null);
      } else {
        setError('Failed to fetch portfolio data');
      }

      if (loginActivityRes.data?.success) {
        setLoginActivity(loginActivityRes.data.data);
        const weeklyData = aggregateWeeklyLoginActivity(loginActivityRes.data.data);
        setWeeklyLoginActivity(weeklyData);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('An error occurred while fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  const aggregateWeeklyLoginActivity = (data: { date: string; count: number }[]) => {
    const weeklyData: { [key: string]: number } = {};

    data.forEach((entry) => {
      const date = new Date(entry.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekKey = weekStart.toISOString().split('T')[0];

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
      const response = await fetch('http://localhost:2000/transaction/buy', {
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

      // Update portfolio after successful transaction
      fetchData();
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
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff', marginBottom: '1.5rem' }}>Contributions</h2>
        <CalendarHeatmap
          startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
          endDate={new Date()}
          values={filterLastYearData(weeklyLoginActivity)}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            return `color-custom-${Math.min(value.count, 4)}`;
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
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Header with Portfolio Value */}
        <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>
              <span style={{ fontSize: '1.875rem', fontWeight: '600', color: '#f3f4f6' }}>Welcome, {user.name}</span>
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: '600', color: '#f3f4f6' }}>
              Portfolio Value: ₹{portfolioValue.toLocaleString()}
            </span>
            <span
              style={{
                fontSize: '1rem',
                color: profitLoss >= 0 ? '#34D399' : '#EF4444',
              }}
            >
              {profitLoss >= 0 ? '+' : '-'}₹{Math.abs(profitLoss).toLocaleString()} ({profitLossPercentage}%)
            </span>
          </div>
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

        {/* Stock Dashboard & Watchlist */}
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div style={{ flex: 2, backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)', overflow: 'hidden' }}>
            <StockDashboard />
          </div>
          <div style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)', overflow: 'hidden' }}>
            <WatchlistManager
              watchlist={[]}
              onRemove={async (id) => {}}
              onUpdate={async (id, data) => {}}
              onAdd={async (symbol) => {}}
            />
          </div>
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
        currentPrice={portfolio.find(p => p.symbol === selectedStock)?.currentPrice}
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

// Mock function to fetch stock quotes (replace with your API call)
const fetchStockQuote = async (symbol: string) => {
  // Replace with your API call to fetch the latest stock price
  return { currentPrice: Math.random() * 1000 }; // Mock data
};