import React, { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';
import { motion } from 'framer-motion';
import { PortfolioTable } from './PortfolioTable';
import { TransactionModal } from './TransactionModal';
import { formatMoney, formatPercent, Portfolio, PortfolioStats } from './Portfolio';
import { getPortfolio, getPortfolioStats } from './portfolioApi';
import WatchlistManager from '../Hero/WatchlistManager';
import MarketOverview from '../Hero/MarketOverview';
import { PortfolioChart } from './PortfolioChart';
import TrendingStocks from '../Hero/TrendingStocks';

export const performanceData = [
  { date: '2024-01-01', value: 10000 },
  { date: '2024-01-02', value: 10500 },
  { date: '2024-01-03', value: 10300 },
  { date: '2024-01-04', value: 10800 },
  { date: '2024-01-05', value: 11000 }
];

export const PortfolioDashboard: React.FC = () => {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [stats, setStats] = useState<PortfolioStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<string>('');
  const [transactionType, setTransactionType] = useState<'BUY' | 'SELL'>('BUY');
  const [activeTimeframe, setActiveTimeframe] = useState('1D');
  const timeframes = ['1D', '1W', '1M', '1Y', 'ALL'];

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [portfolioRes, statsRes] = await Promise.all([
        getPortfolio(),
        getPortfolioStats()
      ]);
      
      if (portfolioRes.data.success && statsRes.data.success) {
        setPortfolio(portfolioRes.data.data);
        setStats(statsRes.data.data);
      } else {
        setError('Failed to fetch portfolio data');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 " />
    </div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-red-500">{error}</div>
    </div>;
  }

  const handleTransaction = (type: 'BUY' | 'SELL', symbol: string) => {
    setTransactionType(type);
    setSelectedStock(symbol);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-gray-900">Portfolio</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Trade
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Portfolio Value Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {formatMoney(stats?.totalValue || 0)}
              </h2>
              <p className={`text-sm ${(stats?.todayChange ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercent(stats?.todayChange ?? 0)} today
              </p>
            </div>
            <div className="flex gap-4">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setActiveTimeframe(timeframe)}
                  className={`text-sm ${activeTimeframe === timeframe ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
          <PortfolioChart 
            data={performanceData}
            timeframes={timeframes}
            activeTimeframe={activeTimeframe}
            onTimeframeChange={setActiveTimeframe}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-sm font-medium text-gray-500">Portfolio Value</h3>
            <p className="text-2xl font-semibold mt-2">{formatMoney(stats?.totalValue || 0)}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-sm font-medium text-gray-500">Day's P&L</h3>
            <p className={`text-2xl font-semibold mt-2 ${(stats?.todayChange ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatMoney(stats?.todayChange || 0)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-sm font-medium text-gray-500">Total Return</h3>
            <p className={`text-2xl font-semibold mt-2 ${(stats?.totalReturn ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercent(stats?.totalReturn || 0)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-sm font-medium text-gray-500">Positions</h3>
            <p className="text-2xl font-semibold mt-2">{stats?.totalPositions || 0}</p>
          </motion.div>
        </div>

        {/* Holdings & Watchlist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-black rounded-xl shadow-sm">
              <div className="px-6 py-4 ">
                <h2 className="text-lg font-semibold text-gray-900">Holdings</h2>
              </div>
              <PortfolioTable
                data={portfolio}
                onBuyClick={(symbol) => handleTransaction('BUY', symbol)}
                onSellClick={(symbol) => handleTransaction('SELL', symbol)}
              />
            </div>
          </div>
          
          <div>
            <div className="bg-black rounded-xl shadow-sm mb-6">
              <TrendingStocks />
            </div>
            
            <div className="bg-black rounded-xl shadow-sm">
              <WatchlistManager watchlist={[]} onRemove={function (id: string): Promise<void> {
                throw new Error('Function not implemented.');
              } } onUpdate={function (id: string, data: any): Promise<void> {
                throw new Error('Function not implemented.');
              } } onAdd={function (symbol: string): Promise<void> {
                throw new Error('Function not implemented.');
              } } />
            </div>
          </div>
        </div>
      </main>

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

// Update the Portfolio interface to match PortfolioResponse
export interface Portfolio {
  id: number;
  symbol: string;
  name: string;
  shares: number;
  value: number;
  change: number;
  averagePrice: number;
  currentPrice: number;
  totalReturn: number;
  purchaseDate: string;
}