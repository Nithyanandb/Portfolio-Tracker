import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SecureConnection: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = [
    'Initializing secure connection...',
    'Verifying device integrity...',
    'Confirming secure location...',
    'Setting up encryption...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(current => (current + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.p
      key={step}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="text-white/60 text-sm mt-2"
    >
      {steps[step]}
    </motion.p>
  );
};

export default SecureConnection;