import React from 'react';
import { motion } from 'framer-motion';

interface TransactionActionsProps {
  type: string;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const TransactionActions: React.FC<TransactionActionsProps> = ({ 
  type, 
  onCancel, 
  onConfirm, 
  isLoading = false 
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex space-x-4 p-6"
  >
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onCancel}
      disabled={isLoading}
      className="flex-1 py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-white font-light tracking-[0.2em] transition-all duration-300"
    >
      CANCEL
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onConfirm}
      disabled={isLoading}
      className={`flex-1 py-3 px-4 rounded-lg font-light tracking-[0.2em] transition-all duration-300 ${
        type.toLowerCase() === 'buy' 
          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
          : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
      }`}
    >
      {isLoading ? 'PROCESSING...' : `CONFIRM ${type.toUpperCase()}`}
    </motion.button>
  </motion.div>
);

export default TransactionActions;