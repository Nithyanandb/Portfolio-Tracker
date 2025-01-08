import React, { useState } from 'react';

interface SellModalProps {
  stock: {
    symbol: string;
    quantity: number; // Add quantity to the stock interface
  };
  onClose: () => void;
  onSuccess: (symbol: string, quantity: number) => void; // Update onSuccess to accept symbol and quantity
}

export const SellModal: React.FC<SellModalProps> = ({ stock, onClose, onSuccess }) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleSell = () => {
    // Validate the quantity
    if (quantity <= 0) {
      setError('Quantity must be greater than 0.');
      return;
    }

    if (quantity > stock.quantity) {
      setError('Quantity exceeds available shares.');
      return;
    }

    // Clear any previous errors
    setError(null);

    // Call the onSuccess callback with the symbol and quantity
    onSuccess(stock.symbol, quantity);

    // Close the modal
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
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-white/20"
        />
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
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