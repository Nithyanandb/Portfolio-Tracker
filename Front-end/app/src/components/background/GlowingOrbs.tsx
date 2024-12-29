import React from 'react';
import { motion } from 'framer-motion';

export const GlowingOrbs = () => {
  return (
    <div className="absolute inset-0">
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: i === 0
              ? 'radial-gradient(circle, rgba(59,130,246,0.03) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(236,72,153,0.03) 0%, transparent 70%)',
            filter: 'blur(80px)',
            top: i === 0 ? '-20%' : '40%',
            left: i === 0 ? '20%' : '60%'
          }}
          animate={{
            x: ['-10%', '10%', '-10%'],
            y: ['-10%', '10%', '-10%']
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};


export default GlowingOrbs;