import React from 'react';

interface WatchlistManagerProps {
  watchlist: any[];
  onRemove: (id: string) => Promise<void>;
  onUpdate: (id: string, data: any) => Promise<void>;
  onAdd: (symbol: string) => Promise<void>;
}

export const WatchlistManager: React.FC<WatchlistManagerProps> = ({
  watchlist,
  onRemove,
  onUpdate,
  onAdd,
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <h2 className="text-lg font-medium text-white mb-4">Watchlist</h2>
      <div className="space-y-4">
        {watchlist.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div>
              <h3 className="text-white">{item.symbol}</h3>
              <p className="text-gray-400 text-sm">{item.name}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="text-red-400 hover:text-red-500 transition-colors"
                onClick={() => onRemove(item.id)}
              >
                Remove
              </button>
              <button
                className="text-blue-400 hover:text-blue-500 transition-colors"
                onClick={() => onUpdate(item.id, {})}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
        <button
          className="w-full bg-white/10 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-white/20 transition-colors"
          onClick={() => onAdd('')}
        >
          Add Stock
        </button>
      </div>
    </div>
  );
};