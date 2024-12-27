import React from 'react';

interface Props {
  opacity: number;
}

const GridOverlay: React.FC<Props> = ({ opacity }) => (
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      opacity,
    }}
  />
);

export default GridOverlay;