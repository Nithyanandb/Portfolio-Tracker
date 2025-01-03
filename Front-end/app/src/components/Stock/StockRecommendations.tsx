import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Sparkles, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BuyModal } from '../pages/BuyStocks/BuyModal'; // Import the BuyModal component

interface Recommendation {
  symbol: string;
  name: string;
  price: number; // Ensure this is a number
  change: string;
  recommendation: string;
  analysis: string;
  aiConfidence?: number;
  marketCap: string;
  volume: string;
  pe: number;
  sector: string;
  dayRange: {
    low: number;
    high: number;
    current: number;
  };
  technicalIndicators: {
    rsi: number;
    macd: string;
    movingAverage: string;
  };
  lastUpdated: string;
}

interface StockRecommendationsProps {
  recommendations: Recommendation[];
}

const StockRecommendations: React.FC<StockRecommendationsProps> = ({ recommendations }) => {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [selectedStock, setSelectedStock] = useState<Recommendation | null>(null); // State for BuyModal

  console.log('selectedStock:', selectedStock); // Debugging

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        No recommendations available
      </div>
    );
  }

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

      console.log('Transaction successful');
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  const handleTransaction = async (stock: Recommendation, type: 'Buy' | 'Sell') => {
    console.log('handleTransaction called', type, stock.symbol); // Debugging
    try {
      if (type === 'Buy') {
        console.log('Setting selectedStock:', stock.symbol); // Debugging
        setSelectedStock(stock); // Open BuyModal for Buy action
      } else {
        navigate(`/transaction/${type.toLowerCase()}/${stock.symbol}`, {
          state: {
            stock: {
              id: stock.symbol,
              name: stock.name,
              price: stock.price,
            },
          },
        });
      }
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  const timeframes = ['1D', '1W', '1M', '3M', '1Y'];

  return (
    <div className="p-6 space-y-6 bg-black">
      {/* Refined timeframe selector */}
      <div className="flex items-center gap-6 mb-8">
        <div className="flex gap-2 p-1 bg-black rounded-lg backdrop-blur-xl">
          {timeframes.map((timeframe) => (
            <button
              key={`timeframe-${timeframe}`}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedTimeframe === timeframe 
                ? 'bg-white text-black shadow-sm' 
                : 'text-gray-400 hover:text-white'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      {/* Updated stock cards */}
      <div className="grid gap-6">
        {recommendations.map((stock, index) => {
          // Ensure stock.price is a number
          const price = typeof stock.price === 'number' ? stock.price : 0;

          return (
            <motion.div
              key={`stock-${stock.symbol}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group bg-blue backdrop-blur-xl transition-all duration-500 overflow-hidden rounded-2xl"
            >
              <div className="p-6">
                {/* Stock Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-medium text-white">{stock.name}</span>
                      <span className="text-sm font-medium text-gray-400">{stock.symbol}</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-gray-300">
                        {stock.sector}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <span>Market Cap: {stock.marketCap}</span>
                      <span>P/E: {stock.pe}</span>
                      <span>Vol: {stock.volume}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-light text-white mb-1">
                      ${price.toFixed(2)} {/* Ensure price is a number before calling toFixed */}
                    </div>
                    <div className={`flex items-center gap-2 ${
                      stock.change.startsWith('+') ? 'text-green-400' : 'text-rose-400'
                    }`}>
                      {stock.change.startsWith('+') ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">{stock.change}</span>
                    </div>
                  </div>
                </div>

                {/* Analysis Section with refined styling */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-blue-400">AI ANALYSIS</span>
                    </div>
                    {stock.aiConfidence && stock.aiConfidence > 85 && (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 backdrop-blur-sm">
                        <Brain className="w-3.5 h-3.5 text-yellow-400" />
                        <span className="text-xs font-medium text-yellow-400">{stock.aiConfidence}% Confidence</span>
                      </div>
                    )}
                  </div>
                  <p className="text-base text-gray-300 leading-relaxed">
                    {stock.analysis}
                  </p>
                </div>

                {/* Technical Indicators with glass effect */}
                {stock.technicalIndicators && (
                  <div className="grid grid-cols-3 gap-6 mb-6 p-4 rounded-xl bg-white/[0.02] backdrop-blur-sm">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">RSI</div>
                      <div className={`text-base font-medium ${
                        stock.technicalIndicators.rsi > 70 ? 'text-red-400' :
                        stock.technicalIndicators.rsi < 30 ? 'text-green-400' :
                        'text-white'
                      }`}>
                        {stock.technicalIndicators.rsi}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">MACD</div>
                      <div className="text-base font-medium text-white">{stock.technicalIndicators.macd}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Moving Average</div>
                      <div className="text-base font-medium text-white">{stock.technicalIndicators.movingAverage}</div>
                    </div>
                  </div>
                )}

                {/* Updated action buttons with Apple-like design */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    key={`buy-${stock.symbol}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTransaction(stock, 'Buy')} // Open BuyModal
                    className={`relative py-3.5 px-6 rounded-2xl text-sm font-medium tracking-wide
                      transition-all duration-300 backdrop-blur-xl
                      bg-green-500/10 hover:bg-green-500/20 text-green-300`}
                  >
                    <span className="relative z-20">Buy Now</span>
                  </motion.button>
                  
                  <motion.button
                    key={`sell-${stock.symbol}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTransaction(stock, 'Sell')}
                    className={`relative py-3.5 px-6 rounded-2xl text-sm font-medium tracking-wide
                      transition-all duration-300 backdrop-blur-xl
                      bg-red-500/10 hover:bg-red-500/20 text-red-300`}
                  >
                    <span className="relative">Sell Now</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedStock && (
  <BuyModal
    stock={{
      symbol: selectedStock.symbol,
      name: selectedStock.name,
      price: typeof selectedStock.price === 'number' ? selectedStock.price : 0,
    }}
    onClose={() => setSelectedStock(null)}
    onSuccess={() => {
      handleBuy({
        stockSymbol: selectedStock.symbol,
        stockName: selectedStock.name,
        quantity: 1,
        price: typeof selectedStock.price === 'number' ? selectedStock.price : 0,
      });
      setSelectedStock(null);
    }}
  />
)}
    </div>
  );
};

export default StockRecommendations;