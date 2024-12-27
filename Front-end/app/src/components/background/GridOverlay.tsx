import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  opacity: number;
  animate: boolean;
}

const GridOverlay: React.FC<Props> = ({ opacity, animate }) => (
  <motion.div
    className="fixed inset-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: animate ? opacity : 0 }}
  >
    {/* Base Grid */}
    <div 
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(79, 144, 234, 0.07) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(79, 144, 234, 0.07) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    />

    {/* Horizontal Moving Lines */}
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
          initial={{ x: '-100%', top: `${15 + i * 10}%` }}
          animate={{ x: '100%' }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'linear'
          }}
        />
      ))}
    </div>

    {/* Vertical Moving Lines */}
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-blue-400/10 to-transparent"
          initial={{ y: '-100%', left: `${20 + i * 15}%` }}
          animate={{ y: '100%' }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: i * 1.2,
            ease: 'linear'
          }}
        />
      ))}
    </div>

    {/* Glowing Dots at Intersections */}
    <div className="absolute inset-0">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute w-1 h-1 rounded-full bg-blue-400/30 blur-[2px]"
          initial={{ 
            x: Math.random() * 100 + '%',
            y: '-10%',
            scale: 0
          }}
          animate={{ 
            y: '110%',
            scale: [0, 1, 1, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 2,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  </motion.div>
);

export default GridOverlay;