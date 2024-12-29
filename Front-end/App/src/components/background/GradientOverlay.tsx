import React from 'react';
import { useScrollEffect } from '../hooks/useScrollEffect';

interface Props {
  colors: string[];
  opacity: number;
}

const GradientOverlay: React.FC<Props> = ({ colors, opacity }) => {
  const { scrollY } = useScrollEffect();
  const dynamicOpacity = Math.min(opacity + (scrollY * 0.209), 1);

  return (
    <div
      className="absolute inset-0 transition-opacity duration-200"
      style={{
        background: `linear-gradient(${colors.join(', ')})`,
        opacity: dynamicOpacity,
      }}
    />
  );
};

export default GradientOverlay;