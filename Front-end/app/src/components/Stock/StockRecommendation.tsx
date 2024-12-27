import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface StockRecommendation {
  symbol: string;
  name: string;
  price: number;
  change: number;
  recommendation: 'buy' | 'sell' | 'hold';
  reason: string;
  targetPrice: number;
  riskLevel: 'low' | 'medium' | 'high';
}

interface StockRecommendationsProps {
  recommendations: StockRecommendation[];
}

const StockRecommendation: React.FC<StockRecommendationsProps> = ({ recommendations }) => {
  const navigate = useNavigate();

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const handleTransaction = (stock: StockRecommendation, type: 'buy' | 'sell') => {
    navigate(`/${type}/${stock.symbol}`, {
      state: {
        stock: {
          id: stock.symbol,
          name: stock.name,
          price: stock.price,
        },
      },
    });
  };

  return (
    <div className="static bg-gray-1000  rounded-xl space-y-0 p-0 " style={{ width: '100%' }}>
      <h3 className="text-lg font-semibold text-white mb-6"></h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
        {recommendations.map((stock, index) => (
          <motion.div
            key={stock.symbol}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-xl rounded-xl mr-0 border-none glass-card px-3 py-4"
          >
            <div className="flex justify-between items-start mb-6">
              <div className='bg-white/10 rounded-3 pl-6 px-12 py-2'>
                <h5 className="text-white font-medium mb-2">{stock.name}</h5>
                <p className="text-sm text-gray-400">{stock.symbol}</p>
              </div>
           
            </div>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-sm text-gray-400">Current Price</p>
                <p className="text-white font-medium">${stock.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Target Price</p>
                <p className="text-white font-medium">${stock.targetPrice.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle size={16} className={getRiskColor(stock.riskLevel)} />
              <span className={`text-sm ${getRiskColor(stock.riskLevel)}`}>
                {stock.riskLevel.charAt(0).toUpperCase() + stock.riskLevel.slice(1)} Risk
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4">{stock.reason}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleTransaction(stock, 'buy')}
                className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
              >
                Buy
              </button>
              <button
                onClick={() => handleTransaction(stock, 'sell')}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                Sell
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StockRecommendation;
