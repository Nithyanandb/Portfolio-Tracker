import React, { useState, useEffect } from 'react';
import { Search, ArrowUp, ArrowDown, Globe, DollarSign, Check } from 'lucide-react';
import { SellModal } from './SellModal';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header/Header';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { useAuth } from '@/components/hooks/useAuth';
import { StockDetail } from './StockDetail';
import { PortfolioTable } from '../../portfolio/PortfolioTable';
import { formatMoney, formatPercent, Portfolio } from '@/components/portfolio/Portfolio';

export const SellStocks: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState<Portfolio | null>(null);
  const [selectedStockDetail, setSelectedStockDetail] = useState<Portfolio | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]); // Initialize as an array
  const { user, token } = useAuth();

  // Fetch portfolio data on component mount
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('http://localhost:2000/portfolio', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch portfolio');
        }

        const { data } = await response.json();
        console.log('Backend Response:', data); // Debugging

        // Validate portfolio data
        if (Array.isArray(data)) {
          const validPortfolio = data.filter(
            (holding) => holding?.symbol && holding?.name
          );
          setPortfolio(validPortfolio);
        } else {
          throw new Error('Invalid portfolio data format');
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setError('Failed to load portfolio');
        setPortfolio([]); // Reset portfolio to an empty array in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [token]);

  const handleTransactionSuccess = () => {
    setShowSuccessPopup(true);
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };

  const handleStockSelect = (stock: Portfolio) => {
    setSelectedStockDetail(stock);
  };

  const handleSell = async (symbol: string, quantity: number) => {
    try {
      const response = await fetch('http://localhost:2000/transaction/sell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          stockSymbol: symbol,
          quantity,
          price: selectedStockDetail?.currentPrice || 0,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process transaction');
      }

      // Update the portfolio after selling
      setPortfolio((prevPortfolio) =>
        prevPortfolio.map((holding) => {
          if (holding.symbol === symbol) {
            const newQuantity = holding.quantity - quantity;
            return { ...holding, quantity: newQuantity };
          }
          return holding;
        }).filter((holding) => holding.quantity > 0) // Remove stocks with 0 quantity
      );

      handleTransactionSuccess();
    } catch (error) {
      console.error('Sell transaction failed:', error);
      setError('Failed to sell stock');
    }
  };

  // Filter portfolio based on search term
  const filteredPortfolio = (Array.isArray(portfolio) ? portfolio : []).filter(
    (holding) =>
      holding?.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white">
      <Header />
      <div>
        <div className="mt-32 absolute flex z-20 px-8 justify-end w-full">
          {selectedStockDetail && (
            <button
              onClick={() => setSelectedStock(selectedStockDetail)}
              className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all flex items-center gap-2"
            >
              <DollarSign size={20} />
              Sell {selectedStockDetail.symbol}
            </button>
          )}
        </div>
      </div>

      <div className="flex h-screen pt-20">
        {/* Sidebar */}
        <div className="w-98 bg-black/30 border-r border-white/10 overflow-hidden">
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

            {/* Portfolio List */}
            <div className="space-y-4 overflow-y-auto w-[400px] h-[calc(100vh-200px)]">
              {loading ? (
                <LoadingSpinner />
              ) : (
                filteredPortfolio.map((holding) => (
                  <motion.div
                    key={holding.symbol}
                    layout
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      selectedStockDetail?.symbol === holding.symbol
                        ? 'bg-white/10'
                        : 'bg-black/20 hover:bg-white/5'
                    }`}
                    onClick={() => handleStockSelect(holding)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{holding.symbol}</h3>
                        <p className="text-sm text-white/60">{holding.name}</p>
                      </div>
                      <motion.div
                        animate={{
                          color: (holding.totalReturn || 0) >= 0 ? '#34D399' : '#EF4444',
                        }}
                        className="text-right"
                      >
                        <p className="font-medium">{formatMoney(holding.currentPrice)}</p>
                        <p className="text-sm flex items-center gap-1">
                          {(holding.totalReturn !== undefined) && (
                            <>
                              {(holding.totalReturn >= 0) ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                              {formatPercent(Math.abs(holding.totalReturn))}
                            </>
                          )}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedStockDetail ? (
            <StockDetail
              stock={selectedStockDetail}
              onSellClick={setSelectedStock}
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

      {/* Portfolio Table */}
      <div className="p-8">
        <h2 className="text-xl font-bold mb-4">Your Portfolio</h2>
        <PortfolioTable data={portfolio} />
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

      {/* Sell Modal */}
      {selectedStock && (
        <SellModal
          stock={selectedStock}
          onClose={() => setSelectedStock(null)}
          onSuccess={handleSell}
        />
      )}
    </div>
  );
};

export default SellStocks;