import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, TrendingUp, Globe2, AlertTriangle, Filter, ArrowRight } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: 'market' | 'tax' | 'global' | 'alert';
  timestamp: string;
  source: string;
  imageUrl: string;
}

const MarketWatch: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [hoveredNews, setHoveredNews] = useState<string | null>(null);

  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'Tesla Stock Surges on AI Breakthrough',
      description: 'Tesla announces major advancement in self-driving technology, stock up 15%',
      category: 'market',
      timestamp: '2h ago',
      source: 'Bloomberg',
      imageUrl: '/images/tesla-news.jpg'
    },
    {
      id: '2',
      title: 'Global Markets React to Fed Decision',
      description: 'Markets worldwide respond to Federal Reserve\'s latest interest rate decision',
      category: 'global',
      timestamp: '4h ago',
      source: 'Reuters',
      imageUrl: '/images/fed-news.jpg'
    },
    {
      id: '3',
      title: 'New Tax Regulations for Crypto Trading',
      description: 'Government announces updated tax guidelines for cryptocurrency transactions',
      category: 'tax',
      timestamp: '6h ago',
      source: 'Financial Times',
      imageUrl: '/images/crypto-tax.jpg'
    },

      {
      id: '3',
      title: 'New Tax Regulations for Crypto Trading',
      description: 'Government announces updated tax guidelines for cryptocurrency transactions',
      category: 'tax',
      timestamp: '6h ago',
      source: 'Financial Times',
      imageUrl: '/images/crypto-tax.jpg'
    }
  ];

  const filters = [
    { id: 'all', label: 'All News', icon: Newspaper },
    { id: 'market', label: 'Market Updates', icon: TrendingUp },
    { id: 'global', label: 'Global News', icon: Globe2 },
    { id: 'alert', label: 'Alerts', icon: AlertTriangle }
  ];

  const filteredNews = activeFilter === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeFilter);

  return (
    <div className="relative p-6">
      {/* Premium glass effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />

      {/* Header section */}
      <div className="relative flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Newspaper className="w-5 h-5 text-white/60" />
          <h2 className="text-lg font-light tracking-wider text-white">Market Watch</h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
        >
          <Filter className="w-4 h-4 text-white/60" />
          <span className="text-sm text-white/60">Filters</span>
        </motion.button>
      </div>

      {/* Filter tabs */}
      <div className="relative flex gap-2 mb-6 overflow-x-auto hide-scrollbar">
        {filters.map(filter => (
          <motion.button
            key={filter.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap
              ${activeFilter === filter.id 
                ? 'bg-white/10 text-white' 
                : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <filter.icon className="w-4 h-4" />
            <span className="tracking-wide">{filter.label}</span>
          </motion.button>
        ))}
      </div>

      {/* News grid */}
      <AnimatePresence mode="wait">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {filteredNews.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredNews(news.id)}
              onHoverEnd={() => setHoveredNews(null)}
              className="group relative overflow-hidden rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-500"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

              <div className="relative p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/60">
                    {news.source}
                  </span>
                  <span className="text-xs text-white/40">{news.timestamp}</span>
                </div>

                <h3 className="text-lg font-light text-white mb-2">{news.title}</h3>
                <p className="text-sm text-white/60 mb-4">{news.description}</p>

                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-blue-400 text-sm"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MarketWatch;