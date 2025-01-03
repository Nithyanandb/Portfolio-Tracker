import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { number: "99.9%", label: "Accuracy Rate" },
  { number: "0.001s", label: "Processing Time" },
  { number: "$50B+", label: "Assets Analyzed" },
  { number: "24/7", label: "Neural Network" }
];

const ExperienceSection: React.FC = () => (
  <section className="py-32 px-4 relative overflow-hidden">
    <div 
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}
    />
    
    <div className="max-w-9xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mb-24"
      >
        <h2 className="text-7xl font-bold mb-8 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Quantum-Scale Performance
          </span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" />
            
            <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 p-12 rounded-2xl group-hover:border-white/20 transition-all duration-500">
              <h3 className="text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-4">{stat.number}</h3>
              <p className="text-gray-300 font-light text-xl">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default ExperienceSection;