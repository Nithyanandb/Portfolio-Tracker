// DynamicBackground.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { heroSections } from './HeroData';

interface BackgroundProps {
  currentSection: number;
}

const DynamicBackground: React.FC<BackgroundProps> = ({ currentSection }) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {heroSections.map((section: { background: { video: string | undefined; fallback: string | undefined; overlay: any; }; }, index: React.Key | null | undefined) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentSection === index ? 1 : 0,
            transition: { duration: 1 },
          }}
          className="absolute inset-0"
        >
          {section.background.video ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              src={section.background.video}
              poster={section.background.fallback}
            />
          ) : (
            <img
              src={section.background.fallback}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
          <div className={`absolute inset-0 ${section.background.overlay}`} />
        </motion.div>
      ))}
    </div>
  );
};

export default DynamicBackground;
