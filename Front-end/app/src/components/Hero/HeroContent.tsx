import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';


import { useAuth } from '../hooks/useAuth';
import AuthModal from '../Auth/AuthModal';

const HeroContent: React.FC = () => {

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
 
  
  

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 mt-20">
      {/* Enhanced Grok-style background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90" />
        
        {/* Side palette effect */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-500/5 via-purple-500/5 to-transparent" />
        
        {/* Primary glow effects */}
        <div className="absolute inset-0">
          {/* Main glow */}
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-[120px] animate-pulse" />
        </div>
      </div>
        
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        className="relative max-w-[640px] mx-auto text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight leading-[1.1] mb-6"
        >
          <span className="inline-block hover:text-blue-400 transition-colors duration-300">T</span>
          <span className="inline-block hover:text-blue-400 transition-colors duration-300">r</span>
          <span className="inline-block hover:text-blue-400 transition-colors duration-300">a</span>
          <span className="inline-block hover:text-blue-400 transition-colors duration-300">d</span>
          <span className="inline-block hover:text-blue-400 transition-colors duration-300">e</span>
          &nbsp;
          <span className="inline-block hover:text-purple-400 transition-colors duration-300">S</span>
          <span className="inline-block hover:text-purple-400 transition-colors duration-300">m</span>
          <span className="inline-block hover:text-purple-400 transition-colors duration-300">a</span>
          <span className="inline-block hover:text-purple-400 transition-colors duration-300">r</span>
          <span className="inline-block hover:text-purple-400 transition-colors duration-300">t</span>
          <span className="inline-block hover:text-purple-400 transition-colors duration-300">e</span>
          <span className="inline-block hover:text-purple-400 transition-colors duration-300">r</span>
          <br />
          <span className="inline-block hover:text-pink-400 transition-colors duration-300">W</span>
          <span className="inline-block hover:text-pink-400 transition-colors duration-300">i</span>
          <span className="inline-block hover:text-pink-400 transition-colors duration-300">t</span>
          <span className="inline-block hover:text-pink-400 transition-colors duration-300">h</span>
          &nbsp;
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            AI intelligence
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-white/60 mb-10 max-w-[540px] mx-auto leading-relaxed"
        >
          Experience the future of trading with real-time AI insights. 
          Make data-driven decisions with confidence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAuthModalOpen(true)}
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

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex items-center justify-center gap-8 text-white/40 text-sm"
        >
          <span>Real-time analysis</span>
          <span>•</span>
          <span>AI predictions</span>
          <span>•</span>
          <span>Smart alerts</span>
        </motion.div>
      </motion.div>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default HeroContent;