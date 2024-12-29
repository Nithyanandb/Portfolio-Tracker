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
  watchlist = [],
  onRemove,
  onUpdate,
  onAdd
}) => {
  return (
    <div className="relative bg-black/40 backdrop-blur-xl border border-white/10">
      {/* SpaceX-style grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <List className="w-5 h-5 text-white" />
            <h2 className="text-white tracking-[0.2em] font-light">
              WATCHLIST
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            <Plus className="w-4 h-4 text-white" />
          </motion.button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-white">Watchlist</h2>
            <span className="text-sm text-gray-400">
              {watchlist?.length || 0} items
            </span>
          </div>

          {/* Watchlist Content */}
          <div className="space-y-4">
            {watchlist.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 tracking-wider">No stocks in watchlist</p>
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
                    <div className="text-white font-light tracking-wider">{item.symbol}</div>
                    <div className="text-sm text-gray-400">{item.name}</div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onRemove(item.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-full transition-all duration-300"
                  >
                    <X className="w-4 h-4 text-white" />
                  </motion.button>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchlistManager;