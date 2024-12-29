import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ParticleLines } from './ParticleLines';
import { StockCharts } from './StockCharts';
import { GlowingOrbs } from './GlowingOrbs';
import { GridOverlay } from './GridOverlay';

export const DynamicBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

  return (
    <motion.div 
      className="fixed inset-0 w-full h-full bg-[#000000]"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-pink-500/5" />
      
      {/* Components */}
      <ParticleLines />
      <StockCharts />
      <GlowingOrbs />
      <GridOverlay />

      {/* Overlay gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      </div>

      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          filter: 'contrast(320%) brightness(100%)',
        }}
      />
    </motion.div>
  );
};

export default DynamicBackground;