import React from 'react';
import { motion } from 'framer-motion';
import { List, Plus, X } from 'lucide-react';

interface WatchlistProps {
  watchlist: any[];
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
  return (
    <div className="relative bg-black/90 backdrop-blur-2xl border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <List className="w-4 h-4 text-white/90" />
          <h2 className="text-white/90 text-xs tracking-[0.2em] font-light">
            WATCHLIST
          </h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-white/5 hover:bg-white/10 transition-all duration-300"
        >
          <Plus className="w-3 h-3 text-white/90" />
        </motion.button>
      </div>

      {/* Watchlist Content */}
      <div className="p-6 space-y-3">
        {watchlist.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 text-xs tracking-wider">No stocks in watchlist</p>
          </div>
        ) : (
          watchlist.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <div className="space-y-1">
                <div className="text-white/90 text-sm font-light tracking-wider">{item.symbol}</div>
                <div className="text-xs text-gray-400">{item.name}</div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onRemove(item.id)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-full transition-all duration-300"
              >
                <X className="w-3 h-3 text-white/90" />
              </motion.button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default WatchlistManager;