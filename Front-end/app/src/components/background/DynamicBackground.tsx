import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import VideoBackground from './VideoBackground';
import ImageBackground from './ImageBackground';
import GradientOverlay from './GradientOverlay';
import MarketEffects from '../background/MarketEffects';
import { useThrottledCallback } from '../hooks/useThrottledCallback';
import type { BackgroundSection } from '../types/background';

interface DynamicBackgroundProps {
  sections: BackgroundSection[];
  currentSection: number;
  marketTrend?: 'up' | 'down' | 'neutral';
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({
  sections,
  currentSection,
  marketTrend = 'neutral'
}) => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleScroll = useThrottledCallback(() => {
    // Market data-driven parallax effects could be added here
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="fixed inset-0 -z-1">
      <AnimatePresence mode="wait">
        {sections.map((section, index) => (
          <div
            key={index}
            className="absolute inset-0"
            style={{ pointerEvents: 'none' }}
          >
            {section.type === 'video' ? (
              <VideoBackground
                src={section.content.src}
                fallback={section.content.fallback || ''}
                isActive={currentSection === index}
                marketTrend={marketTrend}
              />
            ) : (
              <ImageBackground
                src={section.content.src}
                isActive={currentSection === index}
                marketTrend={marketTrend}
              />
            )}

            <GradientOverlay
              colors={getMarketTrendColors(marketTrend)}
              opacity={currentSection === index ? 0.7 : 0}
            />

            <MarketEffects
              type={getMarketEffectType(marketTrend)}
              intensity={currentSection === index ? 1 : 0}
              isReducedMotion={isReducedMotion}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const getMarketTrendColors = (trend: 'up' | 'down' | 'neutral') => {
  switch (trend) {
    case 'up':
      return ['rgba(16, 185, 129, 0.1)', 'rgba(59, 130, 246, 0.05)'];
    case 'down':
      return ['rgba(239, 68, 68, 0.1)', 'rgba(139, 92, 246, 0.05)'];
    default:
      return ['rgba(255, 255, 255, 0.05)', 'rgba(0, 0, 0, 0.1)'];
  }
};

const getMarketEffectType = (trend: 'up' | 'down' | 'neutral') => {
  switch (trend) {
    case 'up':
      return 'bullish';
    case 'down':
      return 'bearish';
    default:
      return 'neutral';
  }
};

export default DynamicBackground;