import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Security = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section className="bg-black text-white py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            security first. and second.
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            what's yours remains only yours. CRED ensures your data stays protected with bank-grade security.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SecurityFeature
              title="256-bit encryption"
              description="Your data is protected by the highest grade of encryption."
            />
            <SecurityFeature
              title="fraud detection"
              description="Advanced algorithms to detect and prevent fraudulent activities."
            />
            <SecurityFeature
              title="secure payments"
              description="Multiple security layers ensure your transactions are safe."
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SecurityFeature = ({ title, description }) => (
  <div className="bg-gray-900 p-8 rounded-2xl">
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default Security;