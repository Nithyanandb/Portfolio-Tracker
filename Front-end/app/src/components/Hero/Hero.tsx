import React from 'react';
import { motion } from 'framer-motion';
import MarketWatch from './MarketWatch';
import WatchlistManager from './WatchlistManager';
import HeroContent from './HeroContent';
import MarketMetrics from './MarketMetrics';
import MarketDashboard from './MarketDashboard';
import { WorldIndices } from '../market/WorldIndices';
import StockDashboard from '../Stock/StockDashboard';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10" />
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px),
            radial-gradient(circle at center, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 96px 96px',
          backgroundPosition: '0 0, 0 0'
        }} />
      </div>

      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10"
      >
        <div className="container mx-auto px-4 lg:px-8 pt-24">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8 space-y-8">
              <HeroContent />

              {/* Market Watch Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="backdrop-blur-xl bg-black/40 rounded-3xl overflow-hidden border border-white/5"
              >
                <MarketWatch />
              </motion.div>

              {/* Market Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="backdrop-blur-xl bg-black/40 rounded-3xl overflow-hidden border border-white/5"
              >
                <MarketMetrics />
              </motion.div>

              {/* World Indices */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="backdrop-blur-xl bg-black/40 rounded-3xl overflow-hidden border border-white/5"
              >
                <WorldIndices isLoading={false} />
              </motion.div>
            </div>

            {/* Right Column - Dashboard */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* Market Dashboard */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="backdrop-blur-xl bg-black/40 rounded-3xl overflow-hidden border border-white/5"
                >
                  <MarketDashboard />
                </motion.div>

                {/* Stock Recommendations */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="backdrop-blur-xl bg-black/40 rounded-3xl overflow-hidden border border-white/5"
                >
                  <StockDashboard />
                </motion.div>

                {/* Watchlist Manager */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="backdrop-blur-xl bg-black/40 rounded-3xl overflow-hidden border border-white/5"
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

      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black via-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>
    </div>
  );
};

export default Hero;
