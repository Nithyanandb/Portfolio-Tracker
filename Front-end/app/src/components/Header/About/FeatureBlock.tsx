import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureBlockProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  image: string;
  alt: string;
  isReversed?: boolean;
}

export const FeatureBlock: React.FC<FeatureBlockProps> = ({
  title,
  description,
  icon: Icon,
  gradient,
  image,
  alt,
  isReversed = false
}) => {
  const contentOrder = isReversed ? 'md:order-2' : '';
  const imageOrder = isReversed ? 'md:order-1' : '';

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 py-24">
      {/* Content Section */}
      <motion.div 
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className={`w-full md:w-1/2 px-8 ${contentOrder}`}
      >
        <div className={`w-16 h-16 mb-8 bg-black rounded-2xl flex items-center justify-center`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-5xl font-semibold mb-6 tracking-tight">{title}</h3>
        <p className="text-xl text-gray-400 leading-relaxed">{description}</p>
      </motion.div>

      {/* Image Section */}
      <motion.div 
        initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className={`w-full md:w-1/2 ${imageOrder}`}
      >
        <div className="relative h-[600px] overflow-hidden rounded-2xl">
          <img 
            src={image} 
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/20" />
        </div>
      </motion.div>
    </div>
  );
};