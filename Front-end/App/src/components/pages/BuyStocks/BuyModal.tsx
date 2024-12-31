import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { MinusIcon, PlusIcon, XIcon } from 'lucide-react';

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
      const response = await fetch('http://localhost:2000/transaction/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
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

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-xl z-50 flex items-center justify-center">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 bg-black w-[30%] h-auto max-w-xl shadow-2xl">
        <div className="flex justify-between items-center bg-black mb-8">
          <h2 className="text-2xl font-semibold bg-black text-white">{stock.name}</h2>
          <button 
            onClick={onClose}
            className="text-white transition-colors"
          >
            <XIcon size={24} />
          </button>
        </div>
        
        <div className="space-y-8">
          {/* Quantity Selector */}
          <div className="flex flex-col items-center space-y-4">
            <span className="text-sm text-white">Select Quantity</span>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black transition-colors"
              >
                <MinusIcon size={20} />
              </button>
              <span className="text-3xl font-medium text-white w-12 text-center">
                {quantity}
              </span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black transition-colors"   >
                <PlusIcon size={20} />
              </button>
            </div>
          </div>

          {/* Price Details */}
          <div className="space-y-3 border-t border-gray-200 pt-6">
            <div className="flex justify-between text-sm text-white">
              <span>Price per share</span>
              <span>₹{stock.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-medium text-white">
              <span>Total</span>
              <span>₹{(stock.price * quantity).toFixed(2)}</span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handlePurchase}
              disabled={isProcessing}
              className="w-full py-4 bg-white text-black rounded-full font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Buy Now'}
            </button>
            <button
              onClick={onClose}
              className="w-full py-4 text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};