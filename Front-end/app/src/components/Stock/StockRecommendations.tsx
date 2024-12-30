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

const StockRecommendations: React.FC<StockRecommendationsProps> = ({ recommendations }) => {
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
    <div className="p-6 space-y-6 glass-button bg-black border-0">
      {recommendations.map((stock, index) => (
        <motion.div
          key={stock.symbol}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/5 p-4 space-y-4"
        >
          {/* Stock Info */}
          <div className="flex justify-between  items-start">
            <div className="space-y-1">
              <div className="text-white font-light tracking-wider">{stock.symbol}</div>
              <div className="text-sm text-gray-400">{stock.name}</div>
            </div>
            <div className="text-right">
              <div className="text-white font-light">${stock.price}</div>
              <div className={`text-sm flex items-center gap-1 ${
                stock.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {stock.change.startsWith('+') ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {stock.change}
              </div>
            </div>
          </div>

          {/* Analysis */}
          <div className="text-sm text-gray-400">
            {stock.analysis}
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