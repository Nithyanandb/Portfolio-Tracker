import React from 'react';
import { motion } from 'framer-motion';

interface MarketEffectsProps {
  type: 'bullish' | 'bearish' | 'neutral';
  intensity: number;
  isReducedMotion: boolean;
}

const MarketEffects: React.FC<MarketEffectsProps> = ({
  type,
  intensity,
  isReducedMotion
}) => {
  const getEffectStyles = () => {
    switch (type) {
      case 'bullish':
        return {
          className: 'market-effect-bullish',
          pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 35l15-15 15 15' stroke='rgba(16, 185, 129, 0.1)' fill='none'/%3E%3C/svg%3E")`
        };
      case 'bearish':
        return {
          className: 'market-effect-bearish',
          pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 25l15 15 15-15' stroke='rgba(239, 68, 68, 0.1)' fill='none'/%3E%3C/svg%3E")`
        };
      default:
        return {
          className: 'market-effect-neutral',
          pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 30h20' stroke='rgba(255, 255, 255, 0.1)' fill='none'/%3E%3C/svg%3E")`
        };
    }
  };

  const { className, pattern } = getEffectStyles();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: intensity }}
      transition={{ duration: isReducedMotion ? 0 : 1 }}
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundImage: pattern,
        backgroundSize: '60px 60px',
        mixBlendMode: 'overlay'
      }}
    />
  );
};

export default MarketEffects;