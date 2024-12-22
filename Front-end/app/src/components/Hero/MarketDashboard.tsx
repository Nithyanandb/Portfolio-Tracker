import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const internationalCompanies = [
  { name: 'Apple', symbol: 'AAPL', price: '173.50', change: '+1.2%', volume: '52.3M', marketCap: '2.8T' },
  { name: 'Microsoft', symbol: 'MSFT', price: '378.85', change: '+0.8%', volume: '23.1M', marketCap: '2.7T' },
  { name: 'NVIDIA', symbol: 'NVDA', price: '726.13', change: '+2.5%', volume: '45.2M', marketCap: '1.8T' },
  { name: 'Tesla', symbol: 'TSLA', price: '202.64', change: '-1.2%', volume: '108.5M', marketCap: '642.8B' },
  { name: 'Meta', symbol: 'META', price: '474.32', change: '+1.5%', volume: '18.7M', marketCap: '1.2T' },
  { name: 'Amazon', symbol: 'AMZN', price: '174.42', change: '+0.9%', volume: '35.6M', marketCap: '1.8T' }
];

const MarketDashboard = () => {
  return (
    <div className="sticky top-0 right-0 h-screen w-96 bg-black/50 backdrop-blur-xl border-l border-white/10 p-6 overflow-y-auto">
      <h2 className="text-xl font-bold mb-6 text-white">Market Overview</h2>
      
      {/* Market Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-dark rounded-xl p-4"
        >
          <h3 className="text-sm text-gray-400 mb-2">Global Market Cap</h3>
          <p className="text-2xl font-bold text-white">$11.1T</p>
          <span className="text-green-500 text-sm">+2.3%</span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-dark rounded-xl p-4"
        >
          <h3 className="text-sm text-gray-400 mb-2">24h Volume</h3>
          <p className="text-2xl font-bold text-white">$284.5B</p>
          <span className="text-green-500 text-sm">+5.8%</span>
        </motion.div>
      </div>

      {/* Companies List */}
      <div className="space-y-4">
        {internationalCompanies.map((company, index) => (
          <motion.div
            key={company.symbol}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-dark rounded-xl p-4 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-white">{company.name}</h3>
                <span className="text-sm text-gray-400">{company.symbol}</span>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">${company.price}</p>
                <span className={company.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                  {company.change}
                </span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-400">
                Vol: <span className="text-white">{company.volume}</span>
              </div>
              <div className="text-gray-400 text-right">
                MCap: <span className="text-white">{company.marketCap}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MarketDashboard;