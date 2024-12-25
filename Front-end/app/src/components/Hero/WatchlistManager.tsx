import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit2, Save } from 'lucide-react';
import type { WatchlistItem } from '../types/market';

interface WatchlistManagerProps {
  watchlist: WatchlistItem[];
  onRemove: (id: string) => Promise<void>;
  onUpdate: (id: string, data: Partial<WatchlistItem>) => Promise<void>;
}

export const WatchlistManager: React.FC<WatchlistManagerProps> = ({
  watchlist,
  onRemove,
  onUpdate,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<WatchlistItem>>({});

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

  return (
    <div className="bg-gray-800 rounded-xl p-4">
      <h2 className="text-xl font-bold text-white mb-4">Watchlist</h2>
      
      <div className="space-y-4">
        {watchlist.map((item) => (
          <motion.div
            key={item.id}
            layout
            className="bg-gray-700 rounded-lg p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-white">{item.symbol}</h3>
                {editingId === item.id ? (
                  <div className="space-y-2 mt-2">
                    <input
                      type="number"
                      placeholder="Alert price"
                      value={editForm.alertPrice || ''}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        alertPrice: parseFloat(e.target.value)
                      })}
                      className="w-full bg-gray-600 rounded px-2 py-1 text-white"
                    />
                    <textarea
                      placeholder="Notes"
                      value={editForm.notes || ''}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        notes: e.target.value
                      })}
                      className="w-full bg-gray-600 rounded px-2 py-1 text-white"
                    />
                  </div>
                ) : (
                  <>
                    {item.alertPrice && (
                      <p className="text-sm text-gray-400">
                        Alert: ${item.alertPrice}
                      </p>
                    )}
                    {item.notes && (
                      <p className="text-sm text-gray-400 mt-1">
                        {item.notes}
                      </p>
                    )}
                  </>
                )}
              </div>
              
              <div className="flex space-x-2">
                {editingId === item.id ? (
                  <button
                    onClick={() => handleSave(item.id)}
                    className="text-green-400 hover:text-green-300"
                  >
                    <Save size={18} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit2 size={18} />
                  </button>
                )}
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};