import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export const LogoC = () => (
  <motion.a
    href="/"
    className="flex items-center gap-2 text-white mt-10"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <TrendingUp className="h-8 w-8" />
    <span className="text-xl font-bold">CapX.in</span>
  </motion.a>
);

export default LogoC;