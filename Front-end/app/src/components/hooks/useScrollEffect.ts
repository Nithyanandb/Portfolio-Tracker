import { useEffect, useState } from 'react';

export const useScrollEffect = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculateParallax = (speed = 0.5) => {
    return scrollY * speed;
  };

  return { scrollY, calculateParallax };
};