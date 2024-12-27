import React from 'react';
import { BackgroundSection } from '../types/background';
import { useScrollEffect } from '../hooks/useScrollEffect';

interface Props {
  section: BackgroundSection;
}

const BackgroundMedia: React.FC<Props> = ({ section }) => {
  const { calculateParallax } = useScrollEffect();
  const parallaxOffset = calculateParallax(0.15);

  const commonStyle = {
    transform: `translate3d(0, ${parallaxOffset}px, 0)`,
    transition: 'transform 0.1s ease-out',
  };

  if (section.type === 'image') {
    return (
      <img
        src={section.content.src}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={commonStyle}
      />
    );
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      style={commonStyle}
    >
      <source src={section.content.src} type="video/mp4" />
    </video>
  );
};

export default BackgroundMedia;