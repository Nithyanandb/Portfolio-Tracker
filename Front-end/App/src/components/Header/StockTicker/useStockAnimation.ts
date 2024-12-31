import { useEffect } from 'react';
import { AnimationControls } from 'framer-motion';

export const useStockAnimation = (controls: AnimationControls) => {
  useEffect(() => {
    const animate = async () => {
      await controls.start({
        x: [0, -400],
        transition: {
          duration: 10,
          ease: "linear",
          repeat: Infinity,
        }
      });
    };
    animate();
  }, [controls]);
};