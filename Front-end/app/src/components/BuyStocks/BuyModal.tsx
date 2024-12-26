import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Stock } from './stockApi';
import DynamicBackground from '../background/DynamicBackground';

interface BuyModalProps {
  stock: Stock;
  onClose: () => void;
  onSubmit: (quantity: number) => void;
}

const backgroundSections = [
  {
    type: 'image',
    content: {
      src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    },
    effects: {
      gradient: {
        colors: ['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)'],
        opacity: 0.8,
      },
      overlay: {
        type: 'grid',
        opacity: 0.1,
      },
      particles: true,
    },
  },
];

// Component for managing scroll on route changes
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

export const BuyModal: React.FC<BuyModalProps> = ({ stock, onClose, onSubmit }) => {
  const [quantity, setQuantity] = useState(1);
  const total = stock.price * quantity;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <DynamicBackground sections={backgroundSections} currentSection={0} />
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-bold mb-4">Buy {stock.symbol}</h3>
        <p className="text-gray-400 mb-4">{stock.name}</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Price per share</span>
              <span className="text-white">${stock.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-gray-400">Total</span>
              <span className="text-green-400">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => onSubmit(quantity)}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};