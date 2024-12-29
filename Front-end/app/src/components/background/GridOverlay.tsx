import React from 'react';

export const GridOverlay = () => {
  return (
    <div 
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}
    />
  );
};

export default GridOverlay;