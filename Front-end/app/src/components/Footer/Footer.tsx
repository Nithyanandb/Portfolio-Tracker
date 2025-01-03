import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../Header/Logo';

const Footer = () => (
  <footer className="relative bg-black pt-32 pb-16">
    {/* Grok-style glow effect */}
    <div className="absolute inset-0">
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
    </div>

    <div className="relative max-w-7xl mx-auto px-6">
      {/* Main Footer Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24"
      >
        <div className="space-y-8">
          <Logo />
          <p className="text-base text-white/40 leading-relaxed">
            Elevate your trading experience with AI-powered intelligence
          </p>
        </div>

        {[
          {
            title: "Platform",
            links: ["Trading system", "Investment tools", "Market research", "Portfolio analytics", "AI insights"]
          },
          {
            title: "Company",
            links: ["About us", "Careers", "Newsroom", "Contact", "Support"]
          },
          {
            title: "Legal",
            links: ["Privacy", "Terms", "Security", "Compliance", "Accessibility"]
          }
        ].map((section, index) => (
          <motion.div 
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="space-y-8"
          >
            <h4 className="text-sm uppercase tracking-wider text-white/40">
              {section.title}
            </h4>
            <ul className="space-y-6">
              {section.links.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-base text-white/60 hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="pt-8 border-t border-white/5"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-white/40">
            © 2024 CapX. All rights reserved.
          </p>
          
          {/* Legal Links */}
          <div className="flex items-center gap-8">
            {["Privacy", "Terms", "Cookies", "Sitemap"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-white/40 hover:text-white transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Country Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/40 uppercase tracking-wider">IN</span>
          </div>
        </div>
      </motion.div>
    </div>
  </footer>
);

export default Footer;
