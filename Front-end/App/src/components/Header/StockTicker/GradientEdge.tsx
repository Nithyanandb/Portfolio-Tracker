import React from 'react';
import { motion } from 'framer-motion';

interface GradientEdgeProps {
  direction: 'left' | 'right';
}

export const GradientEdge: React.FC<GradientEdgeProps> = ({ direction }) => {
  const gradientClass = direction === 'left' 
    ? 'bg-gradient-to-r from-black via-black/80 to-transparent'
    : 'bg-gradient-to-l from-black via-black/80 to-transparent';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`absolute ${direction}-0 top-0 bottom-0 w-32 z-10 ${gradientClass}`}
    />
  );
};

export default GradientEdge;