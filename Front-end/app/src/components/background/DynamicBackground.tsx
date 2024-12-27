import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DynamicBackground: React.FC = () => {
  return (
    <motion.div 
      className="fixed inset-0 w-full h-full overflow-hidden bg-[#000000]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Grok-style animated gradients */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 animate-gradient" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black" />
      </div>

      {/* Animated particles/stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-blue-400/50 rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              scale: 0
            }}
            animate={{
              scale: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Grok-style motion lines */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-[1px] w-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.2) 50%, transparent 100%)',
              top: `${10 + i * 10}%`
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Glowing orbs like x.ai */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{
            x: ['-25%', '25%', '-25%'],
            y: ['-25%', '25%', '-25%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(147,51,234,0.1) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{
            x: ['25%', '-25%', '25%'],
            y: ['25%', '-25%', '25%']
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(59,130,246,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
    </motion.div>
  );
};

export default DynamicBackground;