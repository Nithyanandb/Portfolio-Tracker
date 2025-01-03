import React from 'react';

interface SellModalProps {
  stock: typeof symbols[0];
  onClose: () => void;
  onSuccess: () => void;
}

export const SellModal: React.FC<SellModalProps> = ({ stock, onClose, onSuccess }) => {
  const handleSell = () => {
    // Implement sell logic here
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-xl p-8 w-96">
        <h2 className="text-xl font-bold mb-4">Sell {stock.symbol}</h2>
        <p className="text-gray-400 mb-6">Enter the quantity you want to sell (in rupees).</p>
        <input
          type="number"
          placeholder="Quantity"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-white/20"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSell}
            className="px-6 py-2 bg-red-500 rounded-xl hover:bg-red-600 transition-all"
          >
            Sell
          </button>
        </div>
      </div>
    </div>
  );
};