import React, { useEffect, useState } from 'react';
import  BuyModal  from '@/components/pages/BuyStocks/BuyModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, Search } from 'lucide-react'; // Added Search icon for search functionality

interface StockHolding {
  symbol: string;
  quantity: number;
  currentPrice?: number;
  change?: number;
  changePercent?: number;
  highPrice?: number;
  lowPrice?: number;
  openPrice?: number;
  previousClose?: number;
  name?: string;
}

interface HoldingsTableProps {
  holdings: StockHolding[];
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({ holdings }) => {
  const [updatedHoldings, setUpdatedHoldings] = useState<StockHolding[]>(holdings);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStock, setSelectedStock] = useState<StockHolding | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Added search term state
  const API_KEY = 'ctre6q9r01qhb16mmh70ctre6q9r01qhb16mmh7g'; // Replace with your Finnhub API key

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        const updated = await Promise.all(
          holdings.map(async (holding) => {
            const quoteResponse = await fetch(
              `https://finnhub.io/api/v1/quote?symbol=${holding.symbol}&token=${API_KEY}`
            );
            const quoteData = await quoteResponse.json();

            return {
              ...holding,
              currentPrice: quoteData.c,
              change: quoteData.d,
              changePercent: quoteData.dp,
              highPrice: quoteData.h,
              lowPrice: quoteData.l,
              openPrice: quoteData.o,
              previousClose: quoteData.pc,
            };
          })
        );
        setUpdatedHoldings(updated);
      } catch (err) {
        setError('Failed to fetch stock data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (holdings.length > 0) {
      fetchStockData();
    }
  }, [holdings]);

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

      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
      console.log('Transaction completed successfully!');
    } catch (error) {
      setError('Transaction failed. Please try again.');
      console.error('Transaction failed:', error);
    }
  };

  // Filter holdings based on search term
  const filteredHoldings = updatedHoldings.filter(
    (holding) =>
      holding.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (holding.name && holding.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (!updatedHoldings || updatedHoldings.length === 0) {
    return <div className="text-center py-4 text-gray-400">No holdings available.</div>;
  }

  return (
    <div className="overflow-x-auto custom-scrollbar">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search holdings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-white/20 text-white"
        />
      </div>

      <table className="min-w-full bg-black text-white">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Symbol</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Current Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Change</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Change %</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">High Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Low Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Open Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Previous Close</th>
          </tr>
        </thead>
        <tbody>
          {filteredHoldings.map((holding) => (
            <tr
              key={holding.symbol}
              className="border-b border-white/10 hover:bg-white/5 cursor-pointer"
              onClick={() => setSelectedStock(holding)}
            >
              <td className="px-6 py-4 font-medium">{holding.symbol}</td>
              <td className="px-6 py-4 text-gray-300">{holding.name ?? 'N/A'}</td>
              <td className="px-6 py-4">{holding.quantity}</td>
              <td className="px-6 py-4">
                {holding.currentPrice === undefined ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  `$${holding.currentPrice.toFixed(2)}`
                )}
              </td>
              <td className={`px-6 py-4 ${(holding.change ?? 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {holding.change === undefined ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  `$${holding.change.toFixed(2)}`
                )}
              </td>
              <td className={`px-6 py-4 ${(holding.changePercent ?? 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {holding.changePercent === undefined ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  `${holding.changePercent.toFixed(2)}%`
                )}
              </td>
              <td className="px-6 py-4">
                {holding.highPrice === undefined ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  `$${holding.highPrice.toFixed(2)}`
                )}
              </td>
              <td className="px-6 py-4">
                {holding.lowPrice === undefined ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  `$${holding.lowPrice.toFixed(2)}`
                )}
              </td>
              <td className="px-6 py-4">
                {holding.openPrice === undefined ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  `$${holding.openPrice.toFixed(2)}`
                )}
              </td>
              <td className="px-6 py-4">
                {holding.previousClose === undefined ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  `$${holding.previousClose.toFixed(2)}`
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStock && (
        <BuyModal
          stock={{
            symbol: selectedStock.symbol,
            name: selectedStock.name || selectedStock.symbol,
            price: selectedStock.currentPrice || 0,
          }}
          onClose={() => setSelectedStock(null)}
          onBuy={handleBuy}
          onSuccess={() => {
            setShowSuccessPopup(true);
            setTimeout(() => {
              setShowSuccessPopup(false);
            }, 3000);
          }}
        />
      )}

      {/* Success Popup */}
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
    </div>
  );
};