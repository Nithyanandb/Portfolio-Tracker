import React from 'react';
import { motion } from 'framer-motion';
import { Feature } from '../types/types';

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="glass-card p-6 hover:bg-white/10 transition-colors duration-300"
    >
      <div className="flex items-center mb-4">
        <feature.icon className="h-6 w-6 text-blue-500" />
        <h3 className="ml-3 text-lg font-medium text-white">{feature.title}</h3>
      </div>
      <p className="text-gray-400">{feature.description}</p>
    </motion.div>
  );
};

export default FeatureCard;