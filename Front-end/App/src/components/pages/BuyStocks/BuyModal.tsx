import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface BuyModalProps {
  stock: {
    symbol: string;
    name: string;
    price: number;
  };
  onClose: () => void;
}

export const BuyModal: React.FC<BuyModalProps> = ({ stock, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handlePurchase = async () => {
    if (!user) {
      setError('Please login to continue');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:2000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` // Assuming you have a token in user object
        },
        body: JSON.stringify({
          userId: user.id,
          stockSymbol: stock.symbol,
          stockName: stock.name,
          quantity: quantity,
          price: stock.price,
          totalAmount: stock.price * quantity,
          transactionType: 'BUY'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process transaction');
      }

      // Transaction successful
      onClose();
      // You might want to show a success message or update the UI
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-black/90 border border-white/10 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-medium mb-4">Buy {stock.symbol}</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white/60 mb-1">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
            />
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-white/60">Price per share</span>
              <span>₹{stock.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-medium">
              <span>Total Amount</span>
              <span>₹{(stock.price * quantity).toFixed(2)}</span>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              onClick={handlePurchase}
              disabled={isProcessing}
              className="flex-1 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Confirm Purchase'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};