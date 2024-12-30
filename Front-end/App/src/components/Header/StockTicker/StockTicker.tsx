import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { StockItem } from './StockItem';
import type { StockTickerProps } from './stock';

export const StockTicker: React.FC<StockTickerProps> = ({ stocks }) => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const { scrollY } = useScroll();
  
  // Enhanced transform effects with smoother transitions
  const tickerOpacity = useTransform(scrollY, [0, 80], [1, 0], {
    clamp: true
  });
  const tickerScale = useTransform(scrollY, [0, 100], [1, 0.98], {
    clamp: true
  });

  useEffect(() => {
    if (containerRef.current) {
      const updateWidth = () => {
        setContainerWidth(containerRef.current?.offsetWidth || 0);
      };
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, []);

  useEffect(() => {
    if (!containerWidth) return;

    const sequence = async () => {
      await controls.start({
        x: -containerWidth,
        transition: {
          duration: 40,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0
        }
      });
    };

    sequence();
  }, [controls, containerWidth]);

  const displayStocks = React.useMemo(() => {
    return [...stocks, ...stocks, ...stocks];
  }, [stocks]);

  return (
    <div 
      ref={containerRef}
      className="relative h-4 w-50 flex items-center justify-center bg-black/90 backdrop-blur-3xl overflow-hidden"
    >
      {/* Premium gradient edges with enhanced blur */}
      <div className="absolute inset-y-0 left-0 w-40 z-10 bg-gradient-to-r from-black via-black/95 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-40 z-10 bg-gradient-to-l from-black via-black/95 to-transparent" />

      {/* Grok-inspired background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5" />

      {/* Main ticker content */}
      <motion.div 
        className="absolute inset-0 flex items-center"
        style={{
          opacity: tickerOpacity,
          scale: tickerScale
        }}
      >
        <motion.div
          animate={controls}
          className="flex items-center space-x-8 absolute whitespace-nowrap"
          style={{ x: containerWidth }}
        >
          {displayStocks.map((stock, index) => (
            <motion.div
              key={`${stock.symbol}-${index}`}
              className="stock-item"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.03,
                ease: "easeOut"
              }}
            >
              <StockItem stock={stock} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Premium glass effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50" />
      </div>
    </div>
  );
};

export default StockTicker;