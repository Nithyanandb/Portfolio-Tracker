import React from 'react';

interface TransactionActionsProps {
  type: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const TransactionActions: React.FC<TransactionActionsProps> = ({ type, onCancel, onConfirm }) => (
  <div className="flex space-x-4">
    <button
      onClick={onCancel}
      className="flex-1 py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
    >
      Cancel
    </button>
    <button
      onClick={onConfirm}
      className={`flex-1 py-3 px-4 rounded-lg font-medium ${
        type === 'buy' 
          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
          : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
      } transition-colors`}
    >
      Confirm {type.toUpperCase()}
    </button>
  </div>
);


export default TransactionActions;