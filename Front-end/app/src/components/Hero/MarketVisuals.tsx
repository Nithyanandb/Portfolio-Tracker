import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  volume?: string;
  marketCap?: string;
}

export const MarketVisuals = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([
    { 
      symbol: 'NIFTY 50', 
      price: 22431.50, 
      change: 1.2,
      volume: '234.5M',
      marketCap: '₹120.5T'
    },
    { 
      symbol: 'SENSEX', 
      price: 73967.75, 
      change: 0.8,
      volume: '156.8M',
      marketCap: '₹145.2T'
    },
    { 
      symbol: 'BANK NIFTY', 
      price: 47521.25, 
      change: -0.3,
      volume: '89.2M',
      marketCap: '₹45.8T'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(item => ({
        ...item,
        price: item.price + (Math.random() - 0.5) * 10,
        change: parseFloat((item.change + (Math.random() - 0.5) * 0.1).toFixed(2))
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {marketData.map((item, index) => (
        <motion.div
          key={item.symbol}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-black/40 backdrop-blur-sm rounded-lg border border-gray-800 p-4"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-white">{item.symbol}</h3>
            <span className={cn(
              "px-2 py-1 rounded text-sm font-medium",
              item.change > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
            )}>
              {item.change > 0 ? '+' : ''}{item.change}%
            </span>
          </div>
          
          <div className="text-2xl font-bold text-white mb-2">
            ₹{item.price.toFixed(2)}
          </div>
          
          <div className="flex justify-between text-sm text-gray-400">
            <span>Vol: {item.volume}</span>
            <span>MCap: {item.marketCap}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MarketVisuals; 