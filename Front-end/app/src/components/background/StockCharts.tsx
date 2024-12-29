import React from 'react';
import { motion } from 'framer-motion';

const generateRandomPath = () => {
  let path = 'M0 50 ';
  const segments = 20;
  for (let i = 1; i <= segments; i++) {
    path += `L${(i * 100) / segments} ${50 + Math.random() * 30 - 15} `;
  }
  return path;
};

export const StockCharts = () => {
  return (
    <div className="absolute inset-0 opacity-20">
      {[...Array(3)].map((_, i) => (
        <motion.svg
          key={`chart-${i}`}
          className="absolute"
          width="100%"
          height="100"
          style={{
            top: `${20 + i * 25}%`,
            left: 0,
            overflow: 'visible'
          }}
        >
          <motion.path
            d={generateRandomPath()}
            fill="none"
            stroke={i % 2 === 0 ? '#3b82f6' : '#ec4899'}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: [0, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1
            }}
          />
        </motion.svg>
      ))}
    </div>
  );
};

export default StockCharts;