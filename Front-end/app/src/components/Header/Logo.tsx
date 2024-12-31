import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export const Logo = () => (
  <motion.a
    href="/"
    className="flex items-center gap-3 text-white group"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <motion.div
      className="relative"
      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
      transition={{ duration: 0.5 }}
    >
      <TrendingUp className="h-6 w-6 text-white" />
      <div className="absolute inset-0 bg-blue-500/20 blur-xl" />
    </motion.div>
    <div className="flex flex-col">
      <span className="text-xl font-bold tracking-[0.1em] bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        CapX
      <span className="text-[10px]  ml-[5px] font-light text-white tracking-[0.4em] lowercase">.live</span>
      </span>
    </div>
  </motion.a>
);