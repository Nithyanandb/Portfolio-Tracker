import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Shield, BarChart2, Globe, Clock } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'Free equity investments',
    description: 'Zero account charges. Zero equity delivery charges.'
  },
  {
    icon: Users,
    title: 'Largest active community',
    description: 'Join millions of Indians who trust us with their investments.'
  },
  {
    icon: Shield,
    title: 'Completely secure',
    description: 'Protected by cutting-edge security systems and insurance.'
  },
  {
    icon: BarChart2,
    title: 'Advanced analytics',
    description: 'Real-time market data and professional-grade charts.'
  },
  {
    icon: Globe,
    title: 'Global markets',
    description: 'Access to international markets and diverse asset classes.'
  },
  {
    icon: Clock,
    title: '24/7 trading',
    description: 'Trade whenever you want with our always-on platform.'
  }
];

const Features = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center">
                <feature.icon className="h-6 w-6 text-blue-600" />
                <h3 className="ml-3 text-lg font-medium text-gray-900">{feature.title}</h3>
              </div>
              <p className="mt-4 text-gray-500">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;