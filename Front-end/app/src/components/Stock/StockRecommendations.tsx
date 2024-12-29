import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
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
}

interface StockRecommendationsProps {
  recommendations: Recommendation[];
}

interface EnhancedRecommendation extends Recommendation {
  aiConfidence: number;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  keyMetrics: {
    pe: number;
    marketCap: string;
    volume: string;
  };
}

const StockRecommendations: React.FC<StockRecommendationsProps> = ({ recommendations = [] }) => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string | null>(null);

  // Query for getting button states
  const { data: buttonStates } = useQuery({
    queryKey: ['buttonStates'],
    queryFn: async () => {
      const states = {};
      for (const rec of recommendations) {
        const state = await buttonApi.getButtonState(`${rec.symbol}-button`);
        states[rec.symbol] = state;
      }
      return states;
    }
  });

  // Mutation for handling button actions
  const buttonMutation = useMutation({
    mutationFn: buttonApi.handleButtonAction,
    onSuccess: (data, variables) => {
      setActiveButton(variables.buttonId);
    }
  });

  const handleTransaction = async (stock: Recommendation, type: 'Buy' | 'Sell') => {
    try {
      // First, handle the button action
      await buttonMutation.mutateAsync({
        actionType: type,
        buttonId: `${stock.symbol}-${type.toLowerCase()}`,
        additionalData: JSON.stringify(stock)
      });

      // Then navigate to the transaction page
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
    <div className="space-y-4">
      {recommendations?.map((stock) => (
        <motion.div
          key={stock.symbol}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
        >
          {/* Enhanced Stock Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-lg font-medium text-white">{stock.symbol}</div>
              <div className="text-sm text-gray-400">{stock.name}</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-light text-white">${stock.price}</div>
              <div className={`text-sm ${stock.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {stock.change}
              </div>
            </div>
          </div>

          {/* AI Insights Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-gray-400">AI Confidence</span>
              <span className="text-white">{stock.aiConfidence}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${stock.aiConfidence}%` }}
              />
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {stock.keyMetrics && Object.entries(stock.keyMetrics).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-sm text-gray-400">{key.toUpperCase()}</div>
                <div className="text-white">{value}</div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTransaction(stock, 'Buy')}
              disabled={buttonMutation.isPending}
              className={`p-2 ${
                activeButton === `${stock.symbol}-buy`
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-green-500/10 hover:bg-green-500/20 text-green-400'
              } text-sm tracking-[0.2em] transition-all duration-300`}
            >
              {buttonMutation.isPending && activeButton === `${stock.symbol}-buy` 
                ? 'PROCESSING...' 
                : 'BUY'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTransaction(stock, 'Sell')}
              disabled={buttonMutation.isPending}
              className={`p-2 ${
                activeButton === `${stock.symbol}-sell`
                  ? 'bg-red-500/20 text-red-300'
                  : 'bg-red-500/10 hover:bg-red-500/20 text-red-400'
              } text-sm tracking-[0.2em] transition-all duration-300`}
            >
              {buttonMutation.isPending && activeButton === `${stock.symbol}-sell` 
                ? 'PROCESSING...' 
                : 'SELL'}
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StockRecommendations; 