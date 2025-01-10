import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../Header/Logo';

const Footer = () => (
  <footer className="relative bg-black pt-16 pb-12 md:pt-24 md:pb-16">
    {/* Grok-style glow effect */}
    <div className="absolute inset-0">
      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-black rounded-full blur-[80px] md:blur-[120px]" />
      <div className="absolute top-0 right-1/3 w-[300px] h-[300px] md:w-[500px] md:h-[500px]  rounded-full blur-[80px] md:blur-[120px]" />
    </div>

    <div className="relative max-w-7xl mx-auto px-4 md:px-6">
      {/* Main Footer Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16"
      >
        {/* Logo and Description */}
        <div className="space-y-4 md:space-y-6">
          <Logo />
          <p className="text-sm md:text-base text-white/40 leading-relaxed">
            Elevate your trading experience with AI-powered intelligence
          </p>
        </div>

        {/* Platform Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-4 md:space-y-6"
        >
          <h4 className="text-xs md:text-sm uppercase tracking-wider text-white/40">
            Platform
          </h4>
          <ul className="space-y-2 md:space-y-4">
            {["Trading system", "Investment tools", "Market research", "Portfolio analytics", "AI insights"].map((link) => (
              <li key={link}>
                <a 
                  href="#" 
                  className="text-sm md:text-base text-white/60 hover:text-white transition-colors duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Company Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-4 md:space-y-6"
        >
          <h4 className="text-xs md:text-sm uppercase tracking-wider text-white/40">
            Company
          </h4>
          <ul className="space-y-2 md:space-y-4">
            {["About us", "Careers", "Newsroom", "Contact", "Support"].map((link) => (
              <li key={link}>
                <a 
                  href="#" 
                  className="text-sm md:text-base text-white/60 hover:text-white transition-colors duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Legal Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="space-y-4 md:space-y-6"
        >
          <h4 className="text-xs md:text-sm uppercase tracking-wider text-white/40">
            Legal
          </h4>
          <ul className="space-y-2 md:space-y-4">
            {["Privacy", "Terms", "Security", "Compliance", "Accessibility"].map((link) => (
              <li key={link}>
                <a 
                  href="#" 
                  className="text-sm md:text-base text-white/60 hover:text-white transition-colors duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Bottom Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="pt-8 border-t border-white/5"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          {/* Copyright */}
          <p className="text-xs md:text-sm text-white/40">
            © 2024 CapX. All rights reserved.
          </p>
          
          {/* Legal Links */}
          <div className="flex items-center gap-4 md:gap-8">
            {["Privacy", "Terms", "Cookies", "Sitemap"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs md:text-sm text-white/40 hover:text-white transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Country Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm text-white/40 uppercase tracking-wider">IN</span>
          </div>
        </div>
      </motion.div>
    </div>
  </footer>
);

export default Footer;