import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Sparkles, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { buttonApi } from '../../services/buttonApi';
import { useQuery, useMutation } from '@tanstack/react-query';

interface Recommendation {
  symbol: string;
  name: string;
  price: string;
  change: string;
  recommendation: string;
  analysis: string;
  aiConfidence?: number;
}

interface StockRecommendationsProps {
  recommendations: Recommendation[];
}

const StockRecommendations: React.FC<StockRecommendationsProps> = ({ recommendations }) => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [hoveredStock, setHoveredStock] = useState<string | null>(null);

  const buttonMutation = useMutation({
    mutationFn: buttonApi.handleButtonAction,
    onSuccess: (data, variables) => {
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

  return (
    <div className="p-6 space-y-4">
      {recommendations.map((stock, index) => (
        <motion.div
          key={stock.symbol}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onHoverStart={() => setHoveredStock(stock.symbol)}
          onHoverEnd={() => setHoveredStock(null)}
          className="relative group p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-500"
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

          <div className="relative">
            {/* Stock Info */}
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-white/90 text-sm font-light tracking-wider">{stock.symbol}</span>
                  {stock.aiConfidence && stock.aiConfidence > 85 && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/20">
                      <Brain className="w-3 h-3 text-yellow-400" />
                      <span className="text-[10px] text-yellow-400">{stock.aiConfidence}% AI Confidence</span>
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-400">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="text-white/90 text-sm font-light tracking-wider tabular-nums">${stock.price}</div>
                <div className={`flex items-center gap-1.5 ${
                  stock.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {stock.change.startsWith('+') ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="text-xs tracking-wider">{stock.change}</span>
                </div>
              </div>
            </div>

            {/* Analysis with premium styling */}
            <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span className="text-xs text-blue-400 tracking-wider">AI ANALYSIS</span>
              </div>
              <div className="text-xs text-gray-400 leading-relaxed">
                {stock.analysis}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTransaction(stock, 'Buy')}
                disabled={buttonMutation.isPending}
                className={`relative p-2 ${
                  activeButton === `${stock.symbol}-buy`
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-green-500/10 hover:bg-green-500/20 text-green-400'
                } rounded-lg text-xs tracking-[0.2em] transition-all duration-300 overflow-hidden`}
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-green-500/20 opacity-0 hover:opacity-100 blur-sm transition-opacity duration-300" />
                <span className="relative">
                  {buttonMutation.isPending && activeButton === `${stock.symbol}-buy` 
                    ? 'PROCESSING...' 
                    : 'BUY'}
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTransaction(stock, 'Sell')}
                disabled={buttonMutation.isPending}
                className={`relative p-2 ${
                  activeButton === `${stock.symbol}-sell`
                    ? 'bg-red-500/20 text-red-300'
                    : 'bg-red-500/10 hover:bg-red-500/20 text-red-400'
                } rounded-lg text-xs tracking-[0.2em] transition-all duration-300 overflow-hidden`}
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-red-500/20 opacity-0 hover:opacity-100 blur-sm transition-opacity duration-300" />
                <span className="relative">
                  {buttonMutation.isPending && activeButton === `${stock.symbol}-sell` 
                    ? 'PROCESSING...' 
                    : 'SELL'}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StockRecommendations; 