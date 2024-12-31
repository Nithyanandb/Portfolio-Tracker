import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, ArrowUp, ArrowDown, RefreshCcw, Clock, BarChart2, Globe, DollarSign } from 'lucide-react';
import { Stock, fetchStocks } from './stockApi';
import { StockChart } from './StockChart';

import { BuyModal } from './BuyModal';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header/Header';
import { StockDetail } from './StockDetail';

export const BuyStocks: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStockDetail, setSelectedStockDetail] = useState<Stock | null>(null);
  const [priceChanges, setPriceChanges] = useState<Record<string, number>>({});
  const [sortBy, setSortBy] = useState<'gainers' | 'losers' | 'all'>('all');
  const [stockDetailLoading, setStockDetailLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [timeFrame, setTimeFrame] = useState('1D');

  const loadStocks = async () => {
    setLoading(true);
    try {
      const fetchedStocks = await fetchStocks();
      setStocks(fetchedStocks);
      // Set the first stock as default selected stock
      if (fetchedStocks.length > 0 && !selectedStockDetail) {
        setSelectedStockDetail(fetchedStocks[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stocks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStocks();
    // Update prices every second
    const interval = setInterval(loadStocks, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => {
        const newStocks = prevStocks.map(stock => {
          const change = (Math.random() - 0.5) * 2; // Random price change
          const newPrice = stock.price + change;
          
          // Update price changes
          setPriceChanges(prev => ({
            ...prev,
            [stock.symbol]: change
          }));

          return {
            ...stock,
            price: newPrice
          };
        });

        // Sort stocks based on price changes
        return [...newStocks].sort((a, b) => {
          const changeA = priceChanges[a.symbol] || 0;
          const changeB = priceChanges[b.symbol] || 0;
          return Math.abs(changeB) - Math.abs(changeA);
        });
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleBuy = async (stockData: {
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
        body: JSON.stringify(stockData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process transaction');
      }

      setMessage({ type: 'success', text: 'Transaction completed successfully!' });
      loadStocks();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Transaction failed'
      });
    }
  };

  const filteredStocks = stocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStockSelect = async (stock: Stock) => {
    setStockDetailLoading(true);
    setSelectedStockDetail(stock);
    
    try {
      // Simulate loading detailed stock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Here you would typically fetch additional stock details
      
    } catch (error) {
      console.error('Failed to load stock details:', error);
    } finally {
      setStockDetailLoading(false);
    }
  };

  const handleTransactionSuccess = () => {
    setMessage({
      type: 'success',
      text: 'Transaction completed successfully!'
    });
    loadStocks(); // Refresh the stock list
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white">
      {/* Tesla-inspired fixed header */}
      <Header/>
      {/* <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-8 py-4">
          <h1 className="text-2xl font-medium">Trade Stocks</h1>
          {selectedStockDetail && (
            <button
              onClick={() => setSelectedStock(selectedStockDetail)}
              className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all flex items-center gap-2"
            >
              <DollarSign size={20} />
              Buy {selectedStockDetail.symbol}
            </button>
          )}
        </div>
      </div> */}

      <div className="flex h-screen pt-20">
        {/* Sidebar */}
        <div className="w-96 bg-black/30 border-r border-white/10 overflow-hidden">
          <div className="p-6">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
              <input
                type="text"
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
            
            {/* Stock List with real-time updates */}
            <div className="space-y-4 overflow-y-auto h-[calc(100vh-200px)]">
              {stocks.map((stock) => (
                <motion.div
                  key={stock.symbol}
                  layout
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedStockDetail?.symbol === stock.symbol
                      ? 'bg-white/10'
                      : 'bg-black/20 hover:bg-white/5'
                  }`}
                  onClick={() => setSelectedStockDetail(stock)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{stock.symbol}</h3>
                      <p className="text-sm text-white/60">{stock.name}</p>
                    </div>
                    <motion.div
                      animate={{
                        color: stock.change !== undefined && stock.change >= 0 ? "#34D399" : "#EF4444"
                      }}
                      className="text-right"
                    >
                      <p className="font-medium">₹{(stock.price * 83).toFixed(2)}</p>
                      <p className="text-sm flex items-center gap-1">
                        {stock.change !== undefined && (
                          <>
                            {stock.change >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                            {Math.abs(stock.change).toFixed(2)}%
                          </>
                        )}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedStockDetail ? (
            <StockDetail
              stock={selectedStockDetail}
              onBuyClick={setSelectedStock}
              loading={loading}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-white/60">
              <div className="text-center">
                <Globe size={48} className="mx-auto mb-4 opacity-60" />
                <p className="text-xl">Select a stock to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Buy Modal */}
      {selectedStock && (
        <BuyModal
          stock={selectedStock}
          onClose={() => setSelectedStock(null)}
        />
      )}
    </div>
  );
};

export default BuyStocks;