import React from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

const LoadingOverlay: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.95 }}
      className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-8 flex flex-col items-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader className="w-8 h-8 text-blue-500" />
      </motion.div>
      <h3 className="mt-4 text-lg font-medium text-white">Authenticating</h3>
      <p className="text-sm text-white/60">Please wait while we verify your credentials...</p>
    </motion.div>
  </motion.div>
);

export default LoadingOverlay;