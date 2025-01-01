import React, { useState } from 'react';
import { MinusIcon, PlusIcon, XIcon } from 'lucide-react';
import { useBuyStock } from './useBuyStock';
import { useAuth } from '../../hooks/useAuth';
import AuthModal from '../../Auth/AuthModal';

interface BuyModalProps {
  stock: {
    symbol: string;
    name: string;
    price: number;
  };
  onClose: () => void;
  onSuccess: () => void;
}
export const BuyModal: React.FC<BuyModalProps> = ({ stock, onClose, onSuccess }) => {

  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isProcessing, error, handlePurchase } = useBuyStock({ 
    onSuccess: onClose 
  });

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    await handlePurchase(stock, quantity);
    onSuccess();
    onClose();
  };


  return (
    <>
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
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black transition-colors"
              >
                <PlusIcon size={20} />
              </button>
            </div>
          </div>

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

          <div className="space-y-3">
            <button
              onClick={handleSubmit}
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


  <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          handlePurchase(stock, quantity);
        }}
      />
</>
  );
};