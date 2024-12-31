import React, { useState } from 'react';
import { X, DollarSign, Hash, AlertCircle, Loader2, Check } from 'lucide-react';
import { Stock } from './stockApi';
import { motion, AnimatePresence } from 'framer-motion';

interface BuyModalProps {
  stock: Stock;
  onClose: () => void;
}

export const BuyModal: React.FC<BuyModalProps> = ({ stock, onClose }) => {
  const [quantity, setQuantity] = useState<string>('1');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:2000/transaction/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stockSymbol: stock.symbol,
          stockName: stock.name,
          quantity: parseInt(quantity),
          price: stock.price,
        }),
      });

      if (!response.ok) {
        throw new Error('Transaction failed');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError('Failed to process transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-zinc-900/90 backdrop-blur-2xl rounded-3xl p-8 w-full max-w-md relative"
        >
          {success ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-medium text-white mb-4">Success!</h3>
              <p className="text-xl text-gray-400">
                You've successfully purchased {quantity} shares of {stock.symbol}
              </p>
            </motion.div>
          ) : (
            <>
              <button
                onClick={onClose}
                className="absolute right-6 top-6 text-white/60 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2 className="text-3xl font-medium mb-2">Buy {stock.symbol}</h2>
                  <p className="text-white/60">{stock.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Current Price
                  </label>
                  <div className="text-3xl font-medium">
                    ₹{(stock.price * 83).toFixed(2)}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Total Amount
                  </label>
                  <div className="text-3xl font-medium">
                    ₹{(stock.price * parseInt(quantity || '0') * 83).toFixed(2)}
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-500">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black py-4 rounded-full text-lg font-medium flex items-center justify-center gap-2 hover:bg-white/90 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <DollarSign size={24} />
                      Buy Now
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};