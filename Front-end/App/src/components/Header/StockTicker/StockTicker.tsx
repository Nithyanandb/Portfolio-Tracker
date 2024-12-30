import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { StockItem } from './StockItem';
import { GradientEdge } from './GradientEdge';
import type { StockTickerProps } from './stock';

export const StockTicker: React.FC<StockTickerProps> = ({ stocks }) => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(600);
  const { scrollY } = useScroll();
  
  // Instant hide on scroll
  const tickerOpacity = useTransform(scrollY, [0, 20], [1, 0]);
  const tickerY = useTransform(scrollY, [0, 20], [0, -5]);
  
  // Enhanced wave animation
  const waveY = useTransform(
    scrollY,
    [0, 20],
    [Math.sin(Date.now() / 1000) * 3, 0]
  );

  useEffect(() => {
    const animate = async () => {
      await controls.start({
        x: [-containerWidth/2, -containerWidth],
        transition: {
          duration: 25,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    };

    animate();

    // Reset animation on component unmount
    return () => {
      controls.stop();
    };
  }, [controls, containerWidth]);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef]);
  const displayStocks = [...stocks, ...stocks, ...stocks];

  return (
    <div className="relative h-6">
      <div className="absolute inset-0 " />
      
      <motion.div 
        className="relative mx-auto w-[600px] h-full overflow-hidden"
        style={{
          opacity: tickerOpacity,
          y: tickerY,
          transform: `translateY(${waveY.get()}px)`
        }}
      >
        <GradientEdge direction="left" />
        <GradientEdge direction="right" />
        
        <div ref={containerRef} className="relative h-full">
          <motion.div
            animate={controls}
            className="flex items-center space-x-4 absolute whitespace-nowrap"
            initial={{ x: -containerWidth/2 }}
          >
            {displayStocks.map((stock, index) => (
              <StockItem key={`${stock.symbol}-${index}`} stock={stock} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default StockTicker;