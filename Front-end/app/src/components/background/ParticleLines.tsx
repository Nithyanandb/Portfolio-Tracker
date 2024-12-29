import React from 'react';
import { motion } from 'framer-motion';

export const ParticleLines = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-[1px] w-full"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              ${i % 2 === 0 ? 'rgba(59,130,246,0.15)' : 'rgba(236,72,153,0.15)'} 50%, 
              transparent 100%)`,
            top: `${5 + i * 8}%`,
          }}
          animate={{
            x: ['-100%', '100%'],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5
          }}
        />
      ))}
    </div>
  );
};

export default ParticleLines;