import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DynamicBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.1]);

  return (
    <motion.div 
      className="fixed inset-0 w-full h-full overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{ opacity: backgroundOpacity }}
    >
      {/* Market data lines */}
      <motion.div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`market-line-${i}`}
            className="absolute h-[1px] w-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.2) 50%, transparent 100%)',
              top: `${10 + i * 12}%`,
              opacity: 0.3
            }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 25 + i * 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>

      {/* Market particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-[2px] h-[2px] rounded-full bg-blue-500"
            style={{
              opacity: i % 2 === 0 ? 0.5 : 0.3,
              boxShadow: i % 2 === 0 ? '0 0 15px rgba(59,130,246,0.3)' : '0 0 15px rgba(78, 69, 73, 0.3)'
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ]
            }}
            transition={{
              duration: Math.random() * 30 + 45,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Glowing orb */}
      <motion.div
        className="absolute w-[1000px] h-[1000px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Market grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/30 to-black opacity-60" />
    </motion.div>
  );
};

export default DynamicBackground;