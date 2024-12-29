import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchMarketData } from '../Service/marketApi';
import StockDashboard from '../Stock/StockDashboard';
import { MarketData } from '../types/markets';
import { Rocket, BarChart2, TrendingUp } from 'lucide-react';

const MarketDashboard: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchMarketData();
        setMarketData(data);
      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative w-16 h-16"
        >
          <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-glow"></div>
          <div className="absolute inset-0 rounded-full border-r-2 border-purple-500 animate-glow" style={{ animationDelay: "0.5s" }}></div>
          <div className="absolute inset-0 rounded-full border-b-2 border-pink-500 animate-glow" style={{ animationDelay: "1s" }}></div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-black p-6 overflow-hidden"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-12">
        <h1 className="text-4xl font-bold text-gradient mb-4">Market Intelligence</h1>
        <p className="text-gray-400">Real-time market insights and AI-powered recommendations</p>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div variants={itemVariants} className="flex gap-6 mb-8">
        {[
          { id: 'overview', icon: BarChart2, label: 'Market Overview' },
          { id: 'recommendations', icon: Rocket, label: 'Smart Recommendations' },
          { id: 'trends', icon: TrendingUp, label: 'Market Trends' }
        ].map(tab => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === tab.id
                ? 'glass-effect text-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketData.slice(0, 6).map((item, index) => (
                <motion.div
                  key={item.symbol}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass-card p-6 animate-glow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.symbol}</h3>
                      <p className="text-3xl font-medium text-gradient">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                      className={`text-lg font-medium ${
                        item.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {activeTab === 'recommendations' && <StockDashboard recommendations={recommendations} />}
          
          {activeTab === 'trends' && (
            <motion.div
              variants={itemVariants}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-gradient">Market Trends</h3>
              <p className="text-gray-400">Market trend analysis coming soon...</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default MarketDashboard;