import React from 'react';
import { motion } from 'framer-motion';
import HeroContent from './HeroContent';
import Features from './Features';
import MarketVisuals from './MarketVisuals';
import MarketDashboard from './MarketDashboard';
import DynamicBackground from './DynamicBackground';

const Hero = () => {
  return (
    <div className="min-h-screen dark">
      <DynamicBackground />
      <div className="relative">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 pr-96">
            <HeroContent />
            <MarketVisuals />
          </div>
        </div>
      </div>
      <Features />
      <MarketDashboard />
    </div>
  );
};

export default Hero;