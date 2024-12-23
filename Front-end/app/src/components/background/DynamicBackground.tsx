import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import VideoBackground from './VideoBackground';
import ImageBackground from './ImageBackground';
// import ParticleOverlay from './ParticleOverlay';
import GradientOverlay from './GradientOverlay';
import BackgroundEffects from './BackgroundEffects';
import { useThrottledCallback } from '../hooks/useThrottledCallback';
import type { BackgroundSection } from '../types/background';

interface DynamicBackgroundProps {
  sections: BackgroundSection[];
  currentSection: number;
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({
  sections,
  currentSection
}) => {
  // State to handle reduced motion preference
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

  // Throttled scroll callback (you can add more functionality here)
  const handleScroll = useThrottledCallback(() => {
    // Scroll-based animations or actions can go here if needed
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
            {/* Video Background */}
            {section.type === 'video' ? (
              <VideoBackground
                src={section.content.src}
                fallback={section.content.fallback || ''}
                isActive={currentSection === index}
              />
            ) : (
              <ImageBackground
                src={section.content.src}
                isActive={currentSection === index}
              />
            )}

            {/* Gradient Overlay */}
            {section.effects.gradient && (
              <GradientOverlay
                colors={section.effects.gradient.colors}
                opacity={currentSection === index ? section.effects.gradient.opacity : 0}
              />
            )}

            {/* Background Effects (e.g., overlays) */}
            {section.effects.overlay && (
              <BackgroundEffects
                type={section.effects.overlay.type}
                opacity={currentSection === index ? section.effects.overlay.opacity : 0}
              />
            )}

            {/* Particles Overlay (conditional on reduced motion setting) */}
            {/* {section.effects.particles && !isReducedMotion && (
              <ParticleOverlay />
            )} */}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default DynamicBackground;
