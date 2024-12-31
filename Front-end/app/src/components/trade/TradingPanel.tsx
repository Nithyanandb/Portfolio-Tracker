import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTradingActions } from '../hooks/useTradingActions';
import { TradingForm } from '../trade/TradingForm';
import { TradeConfirmation } from '../trade/TradeConfirmation';
import type { TradeRequest } from '../types/trading';

export const TradingPanel: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tradeDetails, setTradeDetails] = useState<TradeRequest | null>(null);
  const { executeTrade, loading, error } = useTradingActions();

  const handleTradeSubmit = async (trade: TradeRequest) => {
    setTradeDetails(trade);
    setShowConfirmation(true);
  };

  const handleTradeConfirm = async () => {
    if (!tradeDetails) return;
    
    try {
      await executeTrade(tradeDetails);
      setShowConfirmation(false);
      // Show success notification
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/80 backdrop-blur-xl rounded-2xl p-6"
    >
      <h2 className="text-xl font-bold mb-6 text-white">Trading Panel</h2>
      
      <TradingForm onSubmit={handleTradeSubmit} />

      <TradeConfirmation
        isOpen={showConfirmation}
        trade={tradeDetails}
        onConfirm={handleTradeConfirm}
        onCancel={() => setShowConfirmation(false)}
        loading={loading}
      />

      {error && (
        <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}
    </motion.div>
  );
};