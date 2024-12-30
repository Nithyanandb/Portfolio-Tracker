import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, Plus, X, Search, Star, Bell, MoreHorizontal } from 'lucide-react';

interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  price: string;
  change: string;
  alerts?: {
    price?: number;
    volume?: number;
  };
}

interface WatchlistProps {
  watchlist: WatchlistItem[];
  onRemove: (id: string) => Promise<void>;
  onUpdate: (id: string, data: any) => Promise<void>;
  onAdd: (symbol: string) => Promise<void>;
}

const WatchlistManager: React.FC<WatchlistProps> = ({
  watchlist,
  onRemove,
  onUpdate,
  onAdd
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredWatchlist = watchlist.filter(item =>
    item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative bg-black/90 backdrop-blur-2xl rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 ">
        <div className="flex items-center gap-3">
          <List className="w-4 h-4 text-white/90" />
          <h2 className="text-white/90 text-xs tracking-[0.2em] font-light">
            WATCHLIST
          </h2>
          <span className="text-xs text-gray-500">({watchlist.length})</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300"
        >
          <Plus className="w-3 h-3 text-white/90" />
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="px-6 pt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search watchlist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white/90 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Watchlist Content */}
      <div className="p-6 space-y-3">
        <AnimatePresence>
          {filteredWatchlist.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <p className="text-gray-400 text-xs tracking-wider">
                {searchQuery ? 'No matching stocks found' : 'No stocks in watchlist'}
              </p>
            </motion.div>
          ) : (
            filteredWatchlist.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-yellow-400/50 group-hover:text-yellow-400 transition-colors" />
                  <div className="space-y-1">
                    <div className="text-white/90 text-sm font-light tracking-wider">{item.symbol}</div>
                    <div className="text-xs text-gray-400">{item.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-white/10 rounded-full transition-all duration-300"
                  >
                    <Bell className="w-3 h-3 text-white/90" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-white/10 rounded-full transition-all duration-300"
                  >
                    <MoreHorizontal className="w-3 h-3 text-white/90" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onRemove(item.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 rounded-full transition-all duration-300"
                  >
                    <X className="w-3 h-3 text-red-400" />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WatchlistManager;