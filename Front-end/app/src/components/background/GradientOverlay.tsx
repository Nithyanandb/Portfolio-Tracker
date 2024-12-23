import React from 'react';
import { motion } from 'framer-motion';

interface GradientOverlayProps {
  colors: string[];
  opacity: number;
}

const GradientOverlay: React.FC<GradientOverlayProps> = ({ colors, opacity }) => {
  return (
    <motion.div
      className="absolute inset-0 mix-blend-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1 }}
      style={{
        background: `linear-gradient(45deg, ${colors.join(', ')})`
      }}
    />
  );
};

export default GradientOverlay;
