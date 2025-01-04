import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MarketWatch from './MarketWatch';
import WatchlistManager from './WatchlistManager';
import HeroContent from './HeroContent';
import MarketMetrics from './MarketMetrics';
import MarketDashboard from './MarketDashboard';
import { WorldIndices } from '../market/WorldIndices';
import MarketGraph from './MarketGraph';
import StockDashboard from '../Stock/StockDashboard';
import { symbols } from '../Stock/StocksPage/symbols'; // Import the symbols array
import EarningsSurprise from './EarningsSurprise'; // Import the new component
import SectorPerformance from './SectorPerformance'; // Import the new component

const Hero: React.FC = () => {
  const [currentSymbol, setCurrentSymbol] = useState(symbols[0].symbol);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(true);

      setTimeout(() => {
        setCurrentSymbol(prevSymbol => {
          const currentIndex = symbols.findIndex(s => s.symbol === prevSymbol);
          const nextIndex = (currentIndex + 1) % symbols.length;
          return symbols[nextIndex].symbol;
        });

        setLoading(false);
      }, 6000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background effects and other existing code... */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10"
      >
        <div className="container px-4 lg:px-8">
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-full">
              <HeroContent />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 mt-8">
            <div className="lg:col-span-8 space-y-4 lg:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="backdrop-blur-2xl bg-black/40 rounded-3xl overflow-hidden transition-all duration-500"
              >
                <MarketWatch />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="backdrop-blur-2xl bg-black/40 rounded-3xl overflow-hidden transition-all duration-500"
              >
                <MarketMetrics />
                <motion.div
                  key={currentSymbol}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
                      <span className="ml-4 text-white">Loading...</span>
                    </div>
                  ) : (
                    <MarketGraph symbol={currentSymbol} />
                  )}
                </motion.div>
              </motion.div>

              {/* Add EarningsSurprise component here */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="backdrop-blur-2xl bg-black/40 rounded-3xl overflow-hidden transition-all duration-500"
              >
                <EarningsSurprise symbol={currentSymbol} limit={50} />
              </motion.div>

              {/* Add SectorPerformance component here */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="backdrop-blur-2xl bg-black/40 rounded-3xl overflow-hidden transition-all duration-500"
              >
                <SectorPerformance />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="backdrop-blur-2xl bg-black/40 rounded-3xl overflow-hidden transition-all duration-500 hidden sm:block"
              >
                <WorldIndices isLoading={false} />
              </motion.div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-4 lg:space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="backdrop-blur-2xl bg-black/40 rounded-3xl overflow-hidden transition-all duration-500"
                >
                  <MarketDashboard />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="backdrop-blur-2xl bg-black/40 rounded-3xl overflow-hidden transition-all duration-500"
                >
                  <WatchlistManager
                    watchlist={[]}
                    onRemove={async () => {}}
                    onUpdate={async () => {}}
                    onAdd={async () => {}}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Premium Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black via-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>
    </div>
  );
};

export default Hero;