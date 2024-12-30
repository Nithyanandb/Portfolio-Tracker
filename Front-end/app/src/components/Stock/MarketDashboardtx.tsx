import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchMarketData } from '../Service/marketApi';
import StockDashboard from './StockDashboard';
import { MarketData } from '../types/markets';
import { Rocket, BarChart2, TrendingUp, TrendingDown, Globe2 } from 'lucide-react';

const MarketDashboard: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'global', label: 'Global', icon: Globe2 },
    { id: 'recommendations', label: 'Top Picks', icon: Rocket },
    { id: 'trends', label: 'Trends', icon: TrendingUp }
  ];

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

  return (
    <motion.div 
      className="relative bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Premium Glass Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      {/* Tabs */}
      <motion.div className="flex gap-0 p-6  overflow-x-auto hide-scrollbar">
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 text-xs rounded-full transition-all whitespace-nowrap
              ${activeTab === tab.id 
                ? 'bg-white/10 text-white shadow-lg shadow-black/20' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
          >
            <tab.icon className="w-3 h-3" />
            <span className="tracking-wider">{tab.label}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-8"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/20 border-t-white" />
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {marketData.slice(0, 6).map((item, index) => (
                    <motion.div
                      key={item.symbol}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group bg-white/5 p-4 hover:bg-white/10 transition-all duration-300 rounded-xl border border-white/5 hover:border-white/10"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white/90 text-sm font-light tracking-wider">{item.symbol}</h3>
                          <p className="text-xs text-gray-400">{item.name}</p>
                        </div>
                        <div className={`flex items-center gap-1.5 ${item.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {item.changePercent >= 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          <span className="text-xs tracking-wider">
                            {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-end">
                        <span className="text-lg text-white/90 font-light tracking-wider tabular-nums">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-400 tracking-wider tabular-nums">
                          Vol: {(item.volume / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <motion.div 
                        className="mt-3 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                        animate={{ scaleX: [0, 1] }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
              
              {activeTab === 'recommendations' && <StockDashboard />}
              
              {activeTab === 'global' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Global market indices here */}
                </div>
              )}
              
              {activeTab === 'trends' && (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-sm">Market trends coming soon...</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Premium gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </motion.div>
  );
};


export default MarketDashboard;