import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { StockItem } from './StockItem';
import { GradientEdge } from './GradientEdge';
import { stocks } from './stockData';
import type { StockTickerProps } from './stock';

export const StockTicker: React.FC<StockTickerProps> = ({ stocks }) => {
  const controls = useAnimation();
  
  useEffect(() => {
    const animate = async () => {
      await controls.start({
        x: [0, -400],
        transition: {
          duration: 100,
          ease: "linear",
          repeat: Infinity,
        }
      });
    };
    animate();
  }, [controls]);

  return (
    <div className="relative justify-center items-center ml-300 bg-black/40 backdrop-blur-xl overflow-hidden">
      <GradientEdge direction="left" />
      <GradientEdge direction="right" />

      <div className="flex space-x-12">
        <motion.div
          animate={controls}
          className="flex space-x-12 items-center px-1"
        >
          {[...stocks, ...stocks].map((stock, index) => (
            <StockItem key={`${stock.symbol}-${index}`} stock={stock} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StockTicker;