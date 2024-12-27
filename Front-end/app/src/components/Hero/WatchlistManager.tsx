import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit2, Save, Bell, Plus } from 'lucide-react';
import type { WatchlistItem } from '../types/market';
import { cn } from '../../utils/cn';

interface WatchlistManagerProps {
  watchlist: WatchlistItem[];
  onRemove: (id: string) => Promise<void>;
  onUpdate: (id: string, data: Partial<WatchlistItem>) => Promise<void>;
  onAdd: (symbol: string) => Promise<void>;
}

export const WatchlistManager: React.FC<WatchlistManagerProps> = ({
  watchlist,
  onRemove,
  onUpdate,
  onAdd,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<WatchlistItem>>({});
  const [newSymbol, setNewSymbol] = useState('');

  const handleEdit = (item: WatchlistItem) => {
    setEditingId(item.id);
    setEditForm({
      alertPrice: item.alertPrice,
      notes: item.notes,
    });
  };

  const handleSave = async (id: string) => {
    await onUpdate(id, editForm);
    setEditingId(null);
    setEditForm({});
  };

  const handleAddSymbol = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newSymbol) {
      await onAdd(newSymbol.toUpperCase());
      setNewSymbol('');
    }
  };

  return (
    <div className="bg-black/90 backdrop-blur-xl border border-gray-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Watchlist</h2>
        <form onSubmit={handleAddSymbol} className="flex gap-2">
          <input
            type="text"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
            placeholder="Add symbol..."
            className={cn(
              "px-3 py-1.5 text-sm rounded-lg",
              "bg-gray-800/50 border border-gray-700",
              "text-gray-200 placeholder-gray-500",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            )}
          />
          <button
            type="submit"
            className={cn(
              "p-1.5 rounded-lg",
              "bg-blue-500/10 border border-blue-500/20",
              "text-blue-400 hover:text-blue-300",
              "transition-colors"
            )}
          >
            <Plus size={18} />
          </button>
        </form>
      </div>
      
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {watchlist.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={cn(
                "bg-gray-800/50 backdrop-blur-sm",
                "border border-gray-700/50",
                "rounded-lg p-4"
              )}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-white">{item.symbol}</h3>
                    {item.alertPrice && (
                      <Bell size={16} className="text-blue-400" />
                    )}
                  </div>
                  
                  {editingId === item.id ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-2"
                    >
                      <input
                        type="number"
                        placeholder="Alert price"
                        value={editForm.alertPrice || ''}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          alertPrice: parseFloat(e.target.value)
                        })}
                        className={cn(
                          "w-full px-3 py-1.5 text-sm rounded-lg",
                          "bg-gray-700/50 border border-gray-600",
                          "text-gray-200 placeholder-gray-500",
                          "focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        )}
                      />
                      <textarea
                        placeholder="Notes"
                        value={editForm.notes || ''}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          notes: e.target.value
                        })}
                        className={cn(
                          "w-full px-3 py-1.5 text-sm rounded-lg",
                          "bg-gray-700/50 border border-gray-600",
                          "text-gray-200 placeholder-gray-500",
                          "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                          "resize-none"
                        )}
                        rows={2}
                      />
                    </motion.div>
                  ) : (
                    <AnimatePresence mode="wait">
                      {(item.alertPrice || item.notes) && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-1"
                        >
                          {item.alertPrice && (
                            <p className="text-sm text-gray-400">
                              Alert at ${item.alertPrice}
                            </p>
                          )}
                          {item.notes && (
                            <p className="text-sm text-gray-400">
                              {item.notes}
                            </p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  {editingId === item.id ? (
                    <button
                      onClick={() => handleSave(item.id)}
                      className="p-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 hover:text-green-300 transition-colors"
                    >
                      <Save size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};