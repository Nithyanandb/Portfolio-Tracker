import React, { useState, useEffect } from 'react';
import { TrendingUp, Search, RefreshCw } from 'lucide-react';
import { Stock, fetchStocks } from './stockApi';
import { StockTable } from './StockTable';
import { BuyModal } from './BuyModal';

export const BuyStocks: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadStocks = async () => {
    try {
      setRefreshing(true);
      const data = await fetchStocks();
      setStocks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load stocks. Please try again later.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadStocks();
    // Auto-refresh every 1 minute
    const interval = setInterval(loadStocks, 50000);
    return () => clearInterval(interval);
  }, []);

  const handleBuy = async (quantity: number) => {
    if (!selectedStock) return;

    try {
      const response = await fetch('http://localhost:2000/transaction/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stockSymbol: selectedStock.symbol,
          stockName: selectedStock.name,
          quantity: quantity.toString(),
          price: selectedStock.price.toString(),
        }),
      });

      if (!response.ok) throw new Error('Failed to process buy order');
      
      setMessage({ type: 'success', text: 'Stock purchase successful!' });
      setSelectedStock(null);
      // Refresh stocks after purchase
      loadStocks();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to process buy order. Please try again.' });
    }
  };

  const filteredStocks = stocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-3">
            <TrendingUp className="text-green-400" />
            Buy Stocks
          </h1>
          <p className="text-gray-400 text-lg">
            {loading ? 'Loading market data...' : 'Real-time market data updated every minute'}
          </p>
        </div>

        {/* Search and Refresh Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search stocks by symbol or company name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={loadStocks}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:bg-gray-700/50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Messages */}
        {message && (
          <div className={`p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        {/* Main Content */}
        {error ? (
          <div className="text-red-400 text-center py-8 bg-red-900/20 rounded-xl">
            <p className="text-xl font-semibold">{error}</p>
          </div>
        ) : (
          <StockTable
            stocks={filteredStocks}
            onBuyClick={setSelectedStock}
            loading={loading}
          />
        )}

        {/* Buy Modal */}
        {selectedStock && (
          <BuyModal
            stock={selectedStock}
            onClose={() => setSelectedStock(null)}
            onSubmit={handleBuy}
          />
        )}
      </div>
    </div>
  );
};

export default BuyStocks;