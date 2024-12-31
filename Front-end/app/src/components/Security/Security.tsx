import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, AlertTriangle } from 'lucide-react';

const Security = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Your funds are protected by the same security standards used by leading financial institutions."
    },
    {
      icon: Lock,
      title: "2-Factor Authentication",
      description: "Additional layer of security for all transactions and account access."
    },
    {
      icon: AlertTriangle,
      title: "24/7 Fraud Monitoring",
      description: "Continuous monitoring systems to detect and prevent unauthorized activities."
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-40" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 max-w-xl"
          >
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent mb-6">
              Security First Trading Platform
            </h2>
            <p className="text-xl text-gray-400 mb-12 font-light leading-relaxed">
              Trade with confidence knowing your assets are protected by 
              industry-leading security measures and advanced encryption.
            </p>

            <div className="space-y-8">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className={`p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                      backdrop-blur-xl border border-white/10`}>
                      <feature.icon className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-12 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl 
                text-white font-medium tracking-wide hover:from-blue-600 hover:to-purple-600 
                transition-all duration-300"
            >
              Learn More About Security
            </motion.button>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Security First Trading"
                className="object-cover w-full h-full"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 mix-blend-overlay" />
              
              {/* Glass card overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-xl 
                  rounded-xl "
              >
                <div className="flex items-center  gap-4">
                  <Shield className="w-8 h-8 text-blue-400" />
                  <div >
                    <h4 className="text-white font-medium mb-1">ISO 27001 Certified</h4>
                    <p className="text-sm text-gray-300">
                      Highest international security standards
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Security;
