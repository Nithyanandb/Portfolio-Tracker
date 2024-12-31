import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  volume?: string;
  marketCap?: string;
  dayRange?: {
    low: number;
    high: number;
  };
}

export const MarketVisuals = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([
    { 
      symbol: 'NIFTY 50', 
      price: 22431.50, 
      change: 1.2,
      volume: '234.5M',
      marketCap: '₹120.5T',
      dayRange: {
        low: 22380.25,
        high: 22495.75
      }
    },
    { 
      symbol: 'SENSEX', 
      price: 73967.75, 
      change: 0.8,
      volume: '156.8M',
      marketCap: '₹145.2T',
      dayRange: {
        low: 73825.50,
        high: 74125.25
      }
    },
    { 
      symbol: 'BANK NIFTY', 
      price: 47521.25, 
      change: -0.3,
      volume: '89.2M',
      marketCap: '₹45.8T',
      dayRange: {
        low: 47450.75,
        high: 47625.50
      }
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(item => ({
        ...item,
        price: item.price + (Math.random() - 0.5) * 10,
        change: parseFloat((item.change + (Math.random() - 0.5) * 0.1).toFixed(2)),
        dayRange: {
          low: Math.min(item.price - Math.random() * 50, item.dayRange?.low || 0),
          high: Math.max(item.price + Math.random() * 50, item.dayRange?.high || 0)
        }
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
          className="relative overflow-hidden bg-black/40 backdrop-blur-sm rounded-lg border border-gray-800 p-6"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />

          <div className="relative">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-white">{item.symbol}</h3>
              <motion.span
                animate={{ scale: item.change !== 0 ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "px-2 py-1 rounded text-sm font-medium flex items-center gap-1",
                  item.change > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                )}
              >
                {item.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {item.change > 0 ? '+' : ''}{item.change}%
              </motion.span>
            </div>
            
            {/* Price */}
            <motion.div 
              className="text-2xl font-bold text-white mb-4"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 0.3 }}
            >
              ₹{item.price.toFixed(2)}
            </motion.div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="text-gray-400">Volume</div>
                <div className="text-white flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  {item.volume}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-gray-400">Market Cap</div>
                <div className="text-white">{item.marketCap}</div>
              </div>
            </div>

            {/* Day Range */}
            {item.dayRange && (
              <div className="mt-4">
                <div className="text-xs text-gray-400 mb-1">Day Range</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">₹{item.dayRange.low.toFixed(2)}</span>
                  <div className="flex-1 h-1 bg-gray-700 rounded-full">
                    <motion.div
                      className="h-full bg-blue-500 rounded-full"
                      style={{
                        width: `${((item.price - item.dayRange.low) / (item.dayRange.high - item.dayRange.low)) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">₹{item.dayRange.high.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MarketVisuals; 