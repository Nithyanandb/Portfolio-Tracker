import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPortfolio, PortfolioStock } from './portfolioApi';

const PortfolioDashboard: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioStock[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalGainLoss, setTotalGainLoss] = useState(0);

  useEffect(() => {
    const loadPortfolio = () => {
      const portfolioData = getPortfolio();
      setPortfolio(portfolioData);
      
      // Calculate totals
      const value = portfolioData.reduce((acc, stock) => 
        acc + (stock.currentPrice || stock.buyPrice) * stock.quantity, 0);
      const gainLoss = portfolioData.reduce((acc, stock) => 
        acc + ((stock.currentPrice || stock.buyPrice) - stock.buyPrice) * stock.quantity, 0);
      
      setTotalValue(value);
      setTotalGainLoss(gainLoss);
    };

    loadPortfolio();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Portfolio Dashboard</h1>
         
          <Link
            to="/portfolio/add"
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <button style={{cursor:'pointer'}} >
            Add Stock
          </button>
          </Link>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-medium text-white">Total Value</h3>
            </div>
            <p className="text-2xl font-bold text-white">${totalValue.toFixed(2)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-xl rounded-xl p-6"
          >
            <h3 className="text-lg font-medium text-white mb-2">Total Gain/Loss</h3>
            <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${totalGainLoss.toFixed(2)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl rounded-xl p-6"
          >
            <h3 className="text-lg font-medium text-white mb-2">Total Positions</h3>
            <p className="text-2xl font-bold text-white">{portfolio.length}</p>
          </motion.div>
        </div>

        {/* Portfolio Table */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Symbol</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Buy Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Current Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Gain/Loss</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((stock) => (
                <tr key={stock.id} className="border-b border-white/5">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-white">{stock.symbol}</p>
                      <p className="text-sm text-gray-400">{stock.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">{stock.quantity}</td>
                  <td className="px-6 py-4 text-white">${stock.buyPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 text-white">${(stock.currentPrice || stock.buyPrice).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`${
                      ((stock.currentPrice || stock.buyPrice) - stock.buyPrice) >= 0 
                        ? 'text-green-400' 
                        : 'text-red-400'
                    }`}>
                      ${(((stock.currentPrice || stock.buyPrice) - stock.buyPrice) * stock.quantity).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/portfolio/edit/${stock.id}`}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDashboard;