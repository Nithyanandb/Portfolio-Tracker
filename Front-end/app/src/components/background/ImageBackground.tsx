import React from 'react';
import { motion } from 'framer-motion';

interface ImageBackgroundProps {
  src: string;
  isActive: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ImageBackground: React.FC<ImageBackgroundProps> = ({ src, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 1.1
      }}
      transition={{ duration: 2, ease: 'easeInOut'}}
      className="absolute inset-0"
    >
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover"
        loading="eager"
      />
    </motion.div>
  );

};

export default ImageBackground;