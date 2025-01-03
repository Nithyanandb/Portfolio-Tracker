import React, { useState, useEffect, useCallback } from 'react';
import { Search, TrendingUp, ArrowUp, ArrowDown, RefreshCcw, Clock, BarChart2, Globe, DollarSign } from 'lucide-react';
import { Stock, fetchStocks } from './stockApi';
import { StockChart } from './StockChart';
import { Check } from 'lucide-react';
import { BuyModal } from './BuyModal';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header/Header';
import { StockDetail } from './StockDetail';
import { useAuth } from '@/components/hooks/useAuth';

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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleTransactionSuccess = () => {
    setShowSuccessPopup(true);
    loadStocks();
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };

  const loadStocks = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedStocks = await fetchStocks();
      setStocks(fetchedStocks);
      setError(null);
    } catch (err) {
      setError('Failed to load stocks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStocks();
    // Update every 10 seconds to respect API rate limits
    const interval = setInterval(loadStocks, 10000);
    return () => clearInterval(interval);
  }, [loadStocks]);

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



  const handleStockSelect = async (stock: Stock) => {
    setStockDetailLoading(true);
    setSelectedStockDetail(stock);
    
    try {
      // Fetch additional stock details if needed
      const detailedStock = { ...stock }; // Add API call here if needed
      setSelectedStockDetail(detailedStock);
    } catch (error) {
      console.error('Failed to load stock details:', error);
      setError('Failed to load stock details');
    } finally {
      setStockDetailLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white">
      {/* Tesla-inspired fixed header */}
      <Header/>
      <div>
        <div className="mt-32 absolute flex z-20 px-8 justify-end w-full">
         
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
      </div>

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
                  onClick={() => handleStockSelect(stock)}
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
          {stockDetailLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : selectedStockDetail ? (
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

      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-1">
                <Check className="w-4 h-4" />
              </div>
              <span>Transaction completed successfully!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Buy Modal */}
      {selectedStock && (
        <BuyModal
          stock={selectedStock}
          onClose={() => setSelectedStock(null)}
          onSuccess={handleTransactionSuccess}
        /> 
      )}
    </div>
  );
};

export default BuyStocks;