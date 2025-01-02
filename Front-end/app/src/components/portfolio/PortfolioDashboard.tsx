import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PortfolioTable } from './PortfolioTable';
import { TransactionModal } from './TransactionModal';
import { Portfolio, PortfolioStats } from './Portfolio';
import { getPortfolio, getPortfolioStats } from './portfolioApi';
import WatchlistManager from '../Hero/WatchlistManager';
import MarketOverview from '../Hero/MarketOverview';
import { PortfolioPerformance } from './PortfolioPerformance';
import StockDashboard from '../Stock/StockDashboard';
import TrendingStocks from '../Hero/TrendingStocks';

export const performanceData = [
  { date: '2024-01-01', value: 10000 },
  { date: '2024-01-02', value: 10500 },
  { date: '2024-01-03', value: 10300 },
  { date: '2024-01-04', value: 10800 },
  { date: '2024-01-05', value: 11000 }
];

export interface PortfolioStats {
  dailyPerformance: Array<{
    date: string;
    value: number;
  }>;
  totalInvestment: number;
}

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
      
      if (portfolioRes.data?.success && statsRes.data?.success) {
        setPortfolio(portfolioRes.data.data || []);
        setStats(statsRes.data.data || null);
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
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white/20" />
      </div>
    );
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
        {/* Portfolio Performance Section */}
        <div className="mb-8">
          <PortfolioPerformance stats={stats} />
        </div>

        {/* Stock Dashboard & Holdings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Holdings */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
              <div className="p-6">
                <h2 className="text-lg font-medium text-white">Holdings</h2>
              </div>
              <PortfolioTable
                data={portfolio}
                onBuyClick={(symbol) => handleTransaction('BUY', symbol)}
                onSellClick={(symbol) => handleTransaction('SELL', symbol)}
              />
            </div>
          </div>

          {/* Right Column - Stock Dashboard */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              <StockDashboard />
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              <WatchlistManager 
                watchlist={[]} 
                onRemove={async (id) => {}} 
                onUpdate={async (id, data) => {}} 
                onAdd={async (symbol) => {}} 
              />
            </div>
          </div>
        </div>

        {/* Market Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            <MarketOverview />
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            <TrendingStocks />
          </div>
        </div>
      </main>

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