import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HeroContent: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 mt-20">
      {/* Gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90" />
        {/* Enhanced glow effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>
      </div>
        
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        className="relative max-w-[640px] mx-auto text-center"
      >
        {/* Refined Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-6"
        >
          
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight leading-[1.1] mb-6"
        >
          Trade Smarter with
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            AI Intelligence
          </span>
        </motion.h1>

        {/* Refined Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-white/60 mb-10 max-w-[540px] mx-auto leading-relaxed"
        >
          Experience the future of trading with real-time AI insights. 
          Make data-driven decisions with confidence.
        </motion.p>

        {/* Refined CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-white rounded-2xl text-black text-base font-medium tracking-wide flex items-center gap-2 hover:bg-white/90 transition-all duration-300 group w-full sm:w-auto"
          >
            Start Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-white/[0.03] rounded-2xl text-white text-base font-medium tracking-wide backdrop-blur-xl border border-white/[0.05] hover:bg-white/[0.08] transition-all duration-300 w-full sm:w-auto"
          >
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Optional: Add feature highlights below buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex items-center justify-center gap-8 text-white/40 text-sm"
        >
          <span>Real-time Analysis</span>
          <span>•</span>
          <span>AI Predictions</span>
          <span>•</span>
          <span>Smart Alerts</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroContent;