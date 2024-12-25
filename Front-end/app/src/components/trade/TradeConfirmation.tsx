import React from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TradeRequest } from '../types/trading';

interface TradeConfirmationProps {
  isOpen: boolean;
  trade: TradeRequest | null;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

export const TradeConfirmation: React.FC<TradeConfirmationProps> = ({
  isOpen,
  trade,
  onConfirm,
  onCancel,
  loading
}) => {
  if (!trade) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          open={isOpen}
          onClose={onCancel}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

            <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-gray-900 shadow-xl rounded-2xl">
              <Dialog.Title className="text-lg font-medium text-white mb-4">
                Confirm {trade.action === 'buy' ? 'Purchase' : 'Sale'}
              </Dialog.Title>

              <div className="mt-2 space-y-4">
                <p className="text-sm text-gray-300">
                  Are you sure you want to {trade.action} {trade.quantity} shares of {trade.symbol}?
                </p>

                <div className="bg-white/5 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Symbol</p>
                      <p className="text-white">{trade.symbol}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Quantity</p>
                      <p className="text-white">{trade.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={loading}
                  className={`flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Processing...' : 'Confirm'}
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={loading}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-800 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};