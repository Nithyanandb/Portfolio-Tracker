import React from 'react';
import { motion } from 'framer-motion';
import MarketWatch from './MarketWatch';
import TrendingStocks from './TrendingStocks';
import WorldIndices from './WorldIndices';
import WatchlistManager from './WatchlistManager';
import HeroContent from './HeroContent';
import MarketMetrics from './MarketMetrics';
import MarketDashboard from './MarketDashboard';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
      </div>

      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10"
      >
        {/* Top Section with Hero Content and Aside */}
        <div className="container mx-auto px-4 lg:px-8 pt-32">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column - Hero Content */}
            <div className="lg:col-span-8">
              <HeroContent />



              {/* Market Watch Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-12"
              >
                <MarketWatch />
              </motion.div>

              {/* Market Metrics Below Hero */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="mt-12"
              >
                <MarketMetrics />
              </motion.div>

              {/* World Indices Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-8"
              >
                <WorldIndices
                  indices={[]}
                  isLoading={false}
                />
              </motion.div>
            </div>

            {/* Right Column - Aside Content */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* Market Dashboard */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {/* <MarketDashboard /> */}
                </motion.div>

                {/* Trending Stocks */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <TrendingStocks />
                </motion.div>

                {/* Watchlist Manager */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <WatchlistManager
                    watchlist={[]}
                    onRemove={async () => { }}
                    onUpdate={async () => { }}
                    onAdd={async () => { }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  );
};

export default Hero;
