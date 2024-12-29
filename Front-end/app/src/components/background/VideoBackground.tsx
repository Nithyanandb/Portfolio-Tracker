import React from 'react';
import { motion } from 'framer-motion';

interface VideoBackgroundProps {
  src: string;
  fallback: string;
  isActive: boolean;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ src, fallback, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 2 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
      className="absolute inset-0"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        src={src}
        poster={fallback}  
      >
        <source src={src} type="video/mp4" />
     
      </video>
    </motion.div>
  );
};

export default VideoBackground;
