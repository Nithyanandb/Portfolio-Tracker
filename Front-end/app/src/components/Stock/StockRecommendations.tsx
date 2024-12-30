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
      {/* Timeframe Selector */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex space-x-4">
          {timeframes.map((timeframe) => (
            <button
              key={`timeframe-${timeframe}`}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedTimeframe === timeframe 
                ? 'bg-white/10 text-white' 
                : 'text-gray-400 hover:text-white'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Last updated: {recommendations[0]?.lastUpdated}</span>
        </div>
      </div>

      {recommendations.map((stock, index) => (
        <motion.div
          key={`stock-${stock.symbol}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative group rounded-2xl backdrop-blur-xl bg-white/5 p-6 hover:bg-white/10 transition-all duration-300"
        >
          {/* Stock Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-xl font-medium">{stock.name}</span>
                <span className="text-sm text-gray-400">{stock.symbol}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                  {stock.sector}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Market Cap: {stock.marketCap}</span>
                <span>P/E: {stock.pe}</span>
                <span>Vol: {stock.volume}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-light">${stock.price}</div>
              <div className={`flex items-center gap-1.5 ${
                stock.change.startsWith('+') ? 'text-green-400' : 'text-rose-400'
              }`}>
                {stock.change.startsWith('+') ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm">{stock.change}</span>
              </div>
            </div>
          </div>

          {/* Analysis Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">ANALYSIS</span>
              {stock.aiConfidence && stock.aiConfidence > 85 && (
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/20">
                  <Brain className="w-3 h-3 text-yellow-400" />
                  <span className="text-[10px] text-yellow-400">{stock.aiConfidence}% AI Confidence</span>
                </div>
              )}
            </div>
            <div className="text-gray-300 text-sm leading-relaxed">
              {stock.analysis}
            </div>
          </div>

          {/* Technical Indicators */}
          {stock.technicalIndicators && (
            <div className="grid grid-cols-3 gap-6 mb-6 text-sm">
              <div>
                <div className="text-gray-400 mb-1">RSI</div>
                <div className={`font-medium ${
                  stock.technicalIndicators.rsi > 70 ? 'text-red-400' :
                  stock.technicalIndicators.rsi < 30 ? 'text-green-400' :
                  'text-white'
                }`}>
                  {stock.technicalIndicators.rsi}
                </div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">MACD</div>
                <div className="font-medium">{stock.technicalIndicators.macd}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Moving Average</div>
                <div className="font-medium">{stock.technicalIndicators.movingAverage}</div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              key={`buy-${stock.symbol}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTransaction(stock, 'Buy')}
              disabled={buttonMutation.isPending}
              className={`relative p-3 ${
                activeButton === `${stock.symbol}-buy`
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
              } rounded-xl text-sm font-medium tracking-wider transition-all duration-300`}
            >
              <span className="relative">
                {buttonMutation.isPending && activeButton === `${stock.symbol}-buy` 
                  ? 'PROCESSING...' 
                  : 'BUY'}
              </span>
            </motion.button>
            
            <motion.button
              key={`sell-${stock.symbol}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTransaction(stock, 'Sell')}
              disabled={buttonMutation.isPending}
              className={`relative p-3 ${
                activeButton === `${stock.symbol}-sell`
                  ? 'bg-red-500/20 text-red-300'
                  : 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
              } rounded-xl text-sm font-medium tracking-wider transition-all duration-300`}
            >
              <span className="relative">
                {buttonMutation.isPending && activeButton === `${stock.symbol}-sell` 
                  ? 'PROCESSING...' 
                  : 'SELL'}
              </span>
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StockRecommendations; 