import React from 'react';
import { motion } from 'framer-motion';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'BUY' | 'SELL';
  symbol: string;
  currentPrice?: number;
  onSubmit: (type: 'BUY' | 'SELL', symbol: string) => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  type,
  symbol,
  currentPrice,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-white mb-4">{type} {symbol}</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Current Price</span>
            <span className="text-white">₹{currentPrice?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Quantity</span>
            <input
              type="number"
              className="bg-white/10 text-white rounded-lg px-3 py-1.5 w-20"
              placeholder="0"
            />
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total</span>
            <span className="text-white">₹0.00</span>
          </div>
          <button
            className="w-full bg-green-500/10 text-green-400 rounded-lg py-2.5 text-sm font-medium hover:bg-green-500/20 transition-colors"
            onClick={() => onSubmit(type, symbol)}
          >
            {type}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};