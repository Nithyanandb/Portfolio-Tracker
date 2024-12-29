import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface Stock {
  symbol: string;
  price: string;
  change: string;
}

// Reduced stock list for better performance
const stocks: Stock[] = [
  { symbol: 'NIFTY', price: '21,853.80', change: '+0.42%' },
  { symbol: 'SENSEX', price: '72,085.63', change: '+0.48%' },
  { symbol: 'RELIANCE', price: '2,456.75', change: '+1.23%' },
  { symbol: 'TCS', price: '3,789.20', change: '-0.45%' },
  { symbol: 'HDFC', price: '1,678.90', change: '+0.75%' },
  { symbol: 'INFY', price: '1,567.45', change: '+0.89%' },
];

export const StockTicker: React.FC = () => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Single animation loop
  useEffect(() => {
    const animate = async () => {
      while (true) {
        await controls.start({
          x: '-100%',
          transition: {
            duration: 100,
            ease: 'linear',
            repeat: Infinity
          }
        });
        await controls.set({ x: '0%' });
      }
    };
    
    animate();
  }, []);

  // Optimized stock item renderer
  const StockItem = useCallback(({ stock }: { stock: Stock }) => (
    <div className="inline-flex items-center px-4 h-full group">
      <span className="text-xs font-medium text-white/80 group-hover:text-white">
        {stock.symbol}
      </span>
      <span className="text-xs text-white/60 ml-2">
        ₹{stock.price}
      </span>
      <span 
        className={`text-xs ml-2 ${
          stock.change.startsWith('+') 
            ? 'text-green-400/80 group-hover:text-green-400' 
            : 'text-red-400/80 group-hover:text-red-400'
        }`}
      >
        {stock.change}
      </span>
    </div>
  ), []);

  return (
    <div 
      ref={containerRef}
      className="relative h-8 bg-black/50 backdrop-blur-sm border-b border-white/5 rounded-b-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ willChange: 'transform' }}
    >
      <div className="relative overflow-hidden h-full">
        <motion.div
          className="flex whitespace-nowrap h-full items-center"
          animate={controls}
          style={{ x: '0%' }}
          transition={{ duration: 0 }}
        >
          {/* Render stock items twice for seamless loop */}
          {[...stocks, ...stocks].map((stock, index) => (
            <StockItem key={`${stock.symbol}-${index}`} stock={stock} />
          ))}
        </motion.div>
      </div>

      {/* Optimized gradient overlays */}
      <div 
        className="absolute inset-y-0 left-0 w-20 z-10"
        style={{
          background: 'linear-gradient(90deg, rgb(0,0,0), transparent)',
        }}
      />
      <div 
        className="absolute inset-y-0 right-0 w-20 z-10"
        style={{
          background: 'linear-gradient(-90deg, rgb(0,0,0), transparent)',
        }}
      />
    </div>
  );
};

export default StockTicker;