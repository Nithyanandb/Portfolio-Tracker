import React from 'react';
import { motion } from 'framer-motion';
import { BackgroundSection } from '../../types/background';

interface Props {
  section: BackgroundSection;
}

const BackgroundMedia: React.FC<Props> = ({ section }) => {
  if (!section) return null;

  return (
    <div className="absolute inset-0">
      {section.type === 'video' ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
          src={section.content.src}
          poster={section.content.fallback}
        />
      ) : (
        <motion.img
          src={section.content.src}
          alt="background"
          className="object-cover w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
      )}
    </div>
  );
};

export default BackgroundMedia;