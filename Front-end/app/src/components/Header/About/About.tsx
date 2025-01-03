import React from 'react';
import Header from '../Header';
import ExperienceSection from './ExperienceSection';
import HeroSection from './HeroSection';
import InnovationSection from './InnovationSection';
import { motion } from 'framer-motion';
import { features } from './data';
import { FeatureBlock } from './FeatureBlock';

const About: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen font-sans overflow-hidden">
      <Header />
      <HeroSection />
  <section className="py-16 relative overflow-hidden bg-black">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
    
    <div className="max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16 px-4"
      >
        <h2 className="text-7xl font-bold mb-8 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            The Future of Finance
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Experience the next generation of financial technology, powered by 
          advanced AI and quantum computing.
        </p>
      </motion.div>

      {/* Feature Blocks */}
      <div className="space-y-16">
        {features.map((feature, index) => (
          <FeatureBlock 
            key={index}
            {...feature}
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  </section>

      <ExperienceSection />
    </div>
  );
};

export default About;