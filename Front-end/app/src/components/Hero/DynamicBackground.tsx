import React from 'react';
import { motion } from 'framer-motion';

const DynamicBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 gradient-background">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
              'radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0"
        />
      </div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a')] opacity-5 bg-cover bg-center mix-blend-overlay" />
    </div>
  );
};

export default DynamicBackground;