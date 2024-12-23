import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, AlertTriangle } from 'lucide-react';

const Security = () => {
  const features = [
    {
      icon: Shield,
      title: "Advanced Protection",
      description: "Multi-layer security system protecting your assets and transactions"
    },
    {
      icon: Lock,
      title: "Secure Trading",
      description: "End-to-end encryption for all trading activities and personal data"
    },
    {
      icon: AlertTriangle,
      title: "Risk Management",
      description: "Advanced risk assessment and fraud detection systems"
    }
  ];

  return (
    <section className=" bg-gradient-to-b  from-black to-gray-1000 z-40 inline row  backdrop-blur-xl" style={{padding:'24px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-8">
            Security First Trading
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Trade with confidence knowing your assets are protected by industry-leading security measures.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/5 rounded-2xl p-8 backdrop-blur-xl">
                <feature.icon className="w-12 h-12 text-blue-500 mb-6 mx-auto" />
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Security;
