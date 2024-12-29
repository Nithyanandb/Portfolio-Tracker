import React from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

const LoadingOverlay: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center"
  >
    {/* Enhanced Background with Grid and Gradients */}
    <div className="absolute inset-0">
      {/* Dark Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-95" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>
      
      {/* Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-30" />
    </div>

    {/* Content Container */}
    <motion.div
      initial={{ scale: 0.95, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.95, y: 20 }}
      className="relative z-10 flex flex-col items-center space-y-8 p-8"
    >
      {/* Enhanced Loading Animation */}
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 rounded-full border-t-2 border-r-2 border-blue-500/30"
        />
        
        {/* Middle Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-2 rounded-full border-t-2 border-l-2 border-purple-500/30"
        />
        
        {/* Inner Loader */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Loader className="w-8 h-8 text-blue-500" />
        </motion.div>
      </div>

      {/* Text Content */}
      <div className="text-center space-y-3">
        <h3 className="text-xl font-light tracking-wider text-white">
          Authenticating
        </h3>
        <p className="text-sm text-white/60 tracking-wide">
          Please wait while we verify your credentials...
        </p>
      </div>
    </motion.div>
  </motion.div>
);

export default LoadingOverlay;