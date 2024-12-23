import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundEffectsProps {
  type: 'rays' | 'noise' | 'grid';
  opacity: number;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ type, opacity }) => {
  const effects = {
    rays: {
      className: 'absolute inset-0 bg-gradient-radial from-transparent to-black/50',
      style: { background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.1) 0deg 10deg, transparent 10deg 20deg)' }
    },
    noise: {
      className: 'absolute inset-0 opacity-[0.015] mix-blend-overlay',
      style: { filter: 'url(#noise)' }
    },
    grid: {
      className: 'absolute inset-0 bg-grid-pattern opacity-20',
      style: { backgroundSize: '50px 50px' }
    }
  };

  const effect = effects[type];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1 }}
      className={effect.className}
      style={effect.style}
    >
      {type === 'noise' && (
        <svg className="hidden">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>
      )}
    </motion.div>
  );
};

export default BackgroundEffects;
