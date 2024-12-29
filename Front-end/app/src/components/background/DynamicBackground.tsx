import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DynamicBackground: React.FC = () => {
  const { scrollYProgress } = useScroll({
    smooth: true,
    damping: 20,
    mass: 1.2
  });
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.1], { damping: 25 });

  return (
    <motion.div 
      className="fixed inset-0 w-full h-full overflow-hidden bg-[#000000]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Market data lines */}
      <motion.div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`market-line-${i}`}
            className="absolute h-[1px] w-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.2) 50%, transparent 100%)',
              top: `${10 + i * 100}%`,
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
            className="absolute w-[2px] h-[2px] rounded-full"
            style={{
              background: i % 2 === 0 ? 'rgba(59,130,246,0.5)' : 'rgba(236,72,153,0.5)',
              boxShadow: i % 2 === 0 ? '0 0 15px rgba(59,130,246,0.3)' : '0 0 15px rgba(236,72,153,0.3)'
            }}
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
            }}
            animate={{
              x: [
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
                Math.random() * 100 + '%'
              ],
              y: [
                Math.random() * 100 + '%',
                Math.random() * 100 + '%',
                Math.random() * 100 + '%'
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

      {/* Glowing orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[1000px] h-[1000px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)',
            filter: 'blur(100px)'
          }}
          animate={{
            x: ['-25%', '25%', '-25%'],
            y: ['-25%', '25%', '-25%']
          }}
          transition={{
            duration: 300,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

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
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/30 to-black opacity-60" />
      </div>

      {/* Stock market data visualization */}
      <motion.div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`chart-${i}`}
            className="absolute h-[100px] w-[200px]"
            style={{
              top: `${30 + i * 30}%`,
              left: `${20 + i * 30}%`,
              opacity: 0.1,
              background: 'linear-gradient(180deg, rgba(59,130,246,0.2) 0%, transparent 100%)'
            }}
            animate={{
              height: ['100px', '150px', '100px'],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default DynamicBackground;