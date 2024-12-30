import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, TrendingUp, Globe2, AlertTriangle, Building2, Landmark, Flag, ArrowRight } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: 'market' | 'company' | 'politics' | 'national' | 'global';
  timestamp: string;
  source: string;
  imageUrl: string;
  impact: 'high' | 'medium' | 'low';
  change: string;
  price: string;
  image: string;
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
      price: '$892.54',
      image: 'https://images.unsplash.com/photo-1642052502780-8ee67e3bf130?q=80&w=1000&auto=format&fit=crop',
      imageUrl: ''
    },
    {
      id: '2',
      title: 'Reliance Industries Expands Digital Portfolio',
      description: 'Major acquisition in AI and cloud computing space',
      category: 'company',
      timestamp: '1h ago',
      source: 'Economic Times',
      impact: 'high',
      change: '+3.2%',
      price: '₹2,890.45',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
      imageUrl: ''
    },
    {
      id: '3',
      title: 'RBI Announces New Crypto Regulations',
      description: 'Central bank unveils framework for digital asset trading',
      category: 'national',
      timestamp: '2h ago',
      source: 'Financial Express',
      impact: 'medium',
      change: '-1.2%',
      price: '₹82.45',
      image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1000&auto=format&fit=crop',
      imageUrl: ''
    },
    {
      id: '4',
      title: 'Tech Mahindra AI Innovation Hub',
      description: 'New R&D center focuses on enterprise AI solutions',
      category: 'company',
      timestamp: '3h ago',
      source: 'Tech Today',
      impact: 'medium',
      change: '+2.8%',
      price: '₹1,245.30',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
      imageUrl: ''
    },
    {
      id: '5',
      title: 'Global Markets Rally on Fed Pivot',
      description: 'International markets respond to US Federal Reserve policy shift',
      category: 'global',
      timestamp: '4h ago',
      source: 'Reuters',
      impact: 'high',
      change: '+1.8%',
      price: '$4,782.20',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop',
      imageUrl: ''
    },
    {
      id: '6',
      title: 'New Trade Policy Boosts Export Sector',
      description: 'Government announces incentives for manufacturing exports',
      category: 'politics',
      timestamp: '5h ago',
      source: 'Business Standard',
      impact: 'medium',
      change: '+0.9%',
      price: '₹425.60',
      image: 'https://images.unsplash.com/photo-1566473965997-3de9c817e938?q=80&w=1000&auto=format&fit=crop',
      imageUrl: ''
    }
  ];

  const filters = [
    { id: 'all', label: 'Top Stories', icon: Newspaper },
    { id: 'market', label: 'Markets', icon: TrendingUp },
    { id: 'company', label: 'Companies', icon: Building2 },
    { id: 'politics', label: 'Politics', icon: Landmark },
    { id: 'national', label: 'India', icon: Flag },
    { id: 'global', label: 'Global', icon: Globe2 },
    
  ];

  const filteredNews = activeFilter === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeFilter);

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Updated premium glass effect with Apple-like gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-black/95" />

      {/* Header section with Apple-like typography */}
      <div className="relative flex items-center justify-between py-8">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Market Watch</h2>
        </div>
      </div>

      {/* Updated filter tabs with Apple-like design */}
      <div className="relative flex gap-4 mb-8 overflow-x-auto hide-scrollbar">
        {filters.map(filter => (
          <motion.button
            key={filter.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all
              ${activeFilter === filter.id 
                ? 'bg-white text-black' 
                : 'text-white/80 hover:text-white hover:bg-white/10'}`}
          >
            <filter.icon className="w-4 h-4" />
            <span>{filter.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Updated news grid without borders */}
      <AnimatePresence mode="wait">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
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
              className="group relative bg-white/[0.03] hover:bg-white/[0.06] 
                rounded-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image with gradient overlay */}
              <div className="relative w-full h-40">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
              </div>

              {/* Content section */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium text-white/60">{news.timestamp}</span>
                  {news.impact && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      news.impact === 'high' ? 'bg-blue-500/20 text-blue-300' :
                      news.impact === 'medium' ? 'bg-purple-500/20 text-purple-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {news.impact.toUpperCase()}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-medium text-white mb-2 leading-tight">{news.title}</h3>
                <p className="text-sm text-white/70 mb-3 line-clamp-2">{news.description}</p>

                {/* Updated metrics display */}
                {news.change && (
                  <div className="flex items-center gap-3 mb-3 font-medium">
                    <span className={`text-sm ${
                      news.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {news.change}
                    </span>
                    {news.price && (
                      <span className="text-sm text-white/80">{news.price}</span>
                    )}
                  </div>
                )}

                {/* Updated footer without border */}
                <div className="flex justify-between items-center pt-3">
                  <span className="text-xs font-medium text-white/60">{news.source}</span>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-1.5 text-blue-300 text-sm font-medium"
                  >
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MarketWatch;