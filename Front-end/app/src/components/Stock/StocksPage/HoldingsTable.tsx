import React, { useEffect, useState } from 'react';
import { BuyModal } from '@/components/pages/BuyStocks/BuyModal';
import { SuccessModal } from './SuccessModal'; // Import the SuccessModal
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
import { Check } from 'lucide-react'; // Import the Check icon

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
  name?: string; // Add company name
}

interface HoldingsTableProps {
  holdings: StockHolding[];
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({ holdings }) => {
  const [updatedHoldings, setUpdatedHoldings] = useState<StockHolding[]>(holdings);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStock, setSelectedStock] = useState<StockHolding | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false); // Track popup visibility
  const API_KEY = 'ctre6q9r01qhb16mmh70ctre6q9r01qhb16mmh7g'; // Replace with your Finnhub API key

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        const updated = await Promise.all(
          holdings.map(async (holding) => {
            // Fetch quote data
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

      // Show success popup
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000); // Hide popup after 3 seconds
      console.log('Transaction completed successfully!');
    } catch (error) {
      // Show error message
      setError('Transaction failed. Please try again.');
      console.error('Transaction failed:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-4 text-gray-400">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (!updatedHoldings || updatedHoldings.length === 0) {
    return <div className="text-center py-4 text-gray-400">No holdings available.</div>;
  }

  return (
    <div className="overflow-x-auto custom-scrollbar">
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
          {updatedHoldings.map((holding) => (
            <tr
              key={holding.symbol}
              className="border-b border-white/10 hover:bg-white/5 cursor-pointer"
              onClick={() => setSelectedStock(holding)} // Open BuyModal on row click
            >
              <td className="px-6 py-4 font-medium">{holding.symbol}</td>
              <td className="px-6 py-4 text-gray-300">{holding.name ?? 'N/A'}</td>
              <td className="px-6 py-4">{holding.quantity}</td>
              <td className="px-6 py-4">${holding.currentPrice?.toFixed(2) ?? 'N/A'}</td>
              <td className={`px-6 py-4 ${(holding.change ?? 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ${holding.change?.toFixed(2) ?? 'N/A'}
              </td>
              <td className={`px-6 py-4 ${(holding.changePercent ?? 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {holding.changePercent?.toFixed(2) ?? 'N/A'}%
              </td>
              <td className="px-6 py-4">${holding.highPrice?.toFixed(2) ?? 'N/A'}</td>
              <td className="px-6 py-4">${holding.lowPrice?.toFixed(2) ?? 'N/A'}</td>
              <td className="px-6 py-4">${holding.openPrice?.toFixed(2) ?? 'N/A'}</td>
              <td className="px-6 py-4">${holding.previousClose?.toFixed(2) ?? 'N/A'}</td>
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
      setShowSuccessPopup(true); // Show the success popup
      setTimeout(() => {
        setShowSuccessPopup(false); // Hide the popup after 3 seconds
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