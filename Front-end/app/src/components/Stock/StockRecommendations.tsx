import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Sparkles, Brain, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { buttonApi } from '../../services/buttonApi';
import { useMutation } from '@tanstack/react-query';

interface Recommendation {
  symbol: string;
  name: string;
  price: string;
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
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [hoveredStock, setHoveredStock] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        No recommendations available
      </div>
    );
  }

  const buttonMutation = useMutation({
    mutationFn: buttonApi.handleButtonAction,
    onSuccess: (_data, variables) => {
      setActiveButton(variables.buttonId);
    }
  });

  const handleTransaction = async (stock: Recommendation, type: 'Buy' | 'Sell') => {
    try {
      await buttonMutation.mutateAsync({
        actionType: type,
        buttonId: `${stock.symbol}-${type.toLowerCase()}`,
        additionalData: JSON.stringify(stock)
      });

      navigate(`/transaction/${type.toLowerCase()}/${stock.symbol}`, {
        state: {
          stock: {
            id: stock.symbol,
            name: stock.name,
            price: parseFloat(stock.price),
          }
        }
      });
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  const timeframes = ['1D', '1W', '1M', '3M', '1Y'];

  return (
    <div className="p-6 space-y-6">
      {/* Updated header with Apple-like styling */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-semibold tracking-tight text-white">Stock Recommendations</h2>
          <p className="text-base text-gray-400">AI-powered trading insights</p>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Last updated: {recommendations[0]?.lastUpdated}</span>
        </div>
      </div>

      {/* Refined timeframe selector */}
      <div className="flex items-center gap-6 mb-8">
        <span className="text-sm font-medium text-gray-400">Timeframe:</span>
        <div className="flex gap-2 p-1 bg-white/[0.03] rounded-lg backdrop-blur-xl">
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
        {recommendations.map((stock, index) => (
          <motion.div
            key={`stock-${stock.symbol}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group rounded-2xl backdrop-blur-xl bg-white/[0.02] hover:bg-white/[0.04] 
              transition-all duration-500 overflow-hidden"
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
                  <div className="text-3xl font-light text-white mb-1">${stock.price}</div>
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
                  onClick={() => handleTransaction(stock, 'Buy')}
                  disabled={buttonMutation.isPending}
                  className={`relative py-3.5 px-6 rounded-2xl text-sm font-medium tracking-wide
                    transition-all duration-300 backdrop-blur-xl
                    ${activeButton === `${stock.symbol}-buy`
                      ? 'bg-green-500/20 text-green-200'
                      : 'bg-green-500/10 hover:bg-green-500/20 text-green-300'
                    }`}
                >
                  <span className="relative">
                    {buttonMutation.isPending && activeButton === `${stock.symbol}-buy` 
                      ? 'Processing...' 
                      : 'Buy Now'}
                  </span>
                </motion.button>
                
                <motion.button
                  key={`sell-${stock.symbol}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTransaction(stock, 'Sell')}
                  disabled={buttonMutation.isPending}
                  className={`relative py-3.5 px-6 rounded-2xl text-sm font-medium tracking-wide
                    transition-all duration-300 backdrop-blur-xl
                    ${activeButton === `${stock.symbol}-sell`
                      ? 'bg-red-500/20 text-red-200'
                      : 'bg-red-500/10 hover:bg-red-500/20 text-red-300'
                    }`}
                >
                  <span className="relative">
                    {buttonMutation.isPending && activeButton === `${stock.symbol}-sell` 
                      ? 'Processing...' 
                      : 'Sell Now'}
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StockRecommendations; 