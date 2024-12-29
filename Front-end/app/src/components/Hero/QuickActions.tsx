import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    { label: 'VIEW MARKETS', href: '/markets' },
    { label: 'TRADE NOW', href: '/trade' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 bg-white/5 backdrop-blur-xl border border-white/10 p-6"
    >
      <h3 className="text-white tracking-[0.2em] font-light text-sm">QUICK ACTIONS</h3>
      <div className="space-y-3">
        {actions.map((action) => (
          <motion.a
            key={action.label}
            href={action.href}
            whileHover={{ x: 4 }}
            className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-all duration-300 group"
          >
            <span className="text-sm text-white tracking-[0.2em] font-light">
              {action.label}
            </span>
            <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};
export default QuickActions;