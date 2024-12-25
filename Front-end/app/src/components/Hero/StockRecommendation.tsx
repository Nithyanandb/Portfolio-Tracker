import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

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

export const StockRecommendations: React.FC<StockRecommendationsProps> = ({ recommendations }) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-1" style={{width:'450px'}}>
      <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 lg:gap-4 lg:w-50 xs:max-w-100 xs:mr-40 xs:gap-8 lg:mr-0">

        {recommendations.map((stock, index) => (
          <motion.div
            key={stock.symbol}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 rounded-xl p-3"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-white font-medium">{stock.name}</h4>
                <p className="text-sm text-gray-400">{stock.symbol}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                stock.recommendation === 'buy' ? 'bg-green-500/20 text-green-400' :
                stock.recommendation === 'sell' ? 'bg-red-500/20 text-red-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {stock.recommendation.toUpperCase()}
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

            <p className="text-sm text-gray-400">{stock.reason}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};



export default StockRecommendation;