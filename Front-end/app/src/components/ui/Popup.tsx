import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface PopupProps {
  isOpen: boolean;
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, message, type, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className={`
              relative z-50 p-6 rounded-xl shadow-xl
              ${type === 'success' ? 'bg-emerald-50' : 'bg-red-50'}
              border-2
              ${type === 'success' ? 'border-emerald-200' : 'border-red-200'}
              max-w-md w-full mx-4
            `}
          >
            <div className="flex items-start gap-4">
              {type === 'success' ? (
                <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
              )}
              <div className="flex-1">
                <h3 className={`
                  text-lg font-semibold mb-1
                  ${type === 'success' ? 'text-emerald-800' : 'text-red-800'}
                `}>
                  {type === 'success' ? 'Success' : 'Error'}
                </h3>
                <p className={`
                  text-sm
                  ${type === 'success' ? 'text-emerald-600' : 'text-red-600'}
                `}>
                  {message}
                </p>
              </div>
              <button
                onClick={onClose}
                className={`
                  p-1 rounded-full hover:bg-opacity-10
                  ${type === 'success' ? 'hover:bg-emerald-500' : 'hover:bg-red-500'}
                  transition-colors
                `}
              >
                <X className={`
                  w-5 h-5
                  ${type === 'success' ? 'text-emerald-500' : 'text-red-500'}
                `} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;