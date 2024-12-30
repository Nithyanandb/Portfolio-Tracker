import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart2, 
  TrendingUp, 
  Globe2, 
  AlertTriangle, 
  Filter, 
  ArrowRight, 
  Clock,
  DollarSign,
  LineChart
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: 'market' | 'earnings' | 'analysis' | 'alert';
  timestamp: string;
  source: string;
  impact: 'high' | 'medium' | 'low';
  change?: string;
  price?: string;
}

const MarketWatch: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'NVIDIA (NVDA) Breaks All-Time High',
      description: 'AI chip demand drives unprecedented growth in semiconductor sector',
      category: 'market',
      timestamp: '12m ago',
      source: 'Market Analysis',
      impact: 'high',
      change: '+5.8%',
      price: '$892.54'
    },
    {
      id: '2',
      title: 'Fed Minutes Signal Rate Strategy',
      description: 'Federal Reserve hints at maintaining higher rates through Q2',
      category: 'analysis',
      timestamp: '1h ago',
      source: 'Economic Update',
      impact: 'high'
    },
    {
      id: '3',
      title: 'Apple (AAPL) Q1 Earnings Beat',
      description: 'Revenue surpasses expectations, iPhone sales strong in Asia',
      category: 'earnings',
      timestamp: '2h ago',
      source: 'Earnings Report',
      impact: 'medium',
      change: '+3.2%',
      price: '$184.25'
    },
    {
      id: '4',
      title: 'Market Alert: Tech Sector Surge',
      description: 'Technology stocks lead market rally amid AI optimism',
      category: 'alert',
      timestamp: '30m ago',
      source: 'Sector Watch',
      impact: 'high'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Updates', icon: BarChart2 },
    { id: 'market', label: 'Market Moves', icon: TrendingUp },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'analysis', label: 'Analysis', icon: LineChart },
    { id: 'alert', label: 'Alerts', icon: AlertTriangle }
  ];

  const filteredNews = activeFilter === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeFilter);

  return (
    <div className="relative">
      {/* Header section */}
      <div className="relative flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BarChart2 className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-medium text-white">Market Watch</h2>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5">
            <Clock className="w-3 h-3 text-blue-400" />
            <span className="text-xs text-white/60">Live</span>
          </div>
        </div>
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
                ? 'bg-blue-500/10 text-blue-400' 
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
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-6 backdrop-blur-xl bg-white/[0.03] hover:bg-white/[0.05] rounded-2xl transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs text-white/40">{news.timestamp}</span>
                {news.impact && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    news.impact === 'high' ? 'bg-blue-500/20 text-blue-400' :
                    news.impact === 'medium' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {news.impact.toUpperCase()}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-medium text-white mb-2">{news.title}</h3>
              <p className="text-sm text-white/60 mb-4">{news.description}</p>

              {news.change && (
                <div className="flex items-center gap-4 mb-4">
                  <span className={`text-sm ${
                    news.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {news.change}
                  </span>
                  {news.price && (
                    <span className="text-sm text-white/60">{news.price}</span>
                  )}
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-xs text-white/40">{news.source}</span>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-blue-400 text-sm"
                >
                  Details <ArrowRight className="w-4 h-4" />
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