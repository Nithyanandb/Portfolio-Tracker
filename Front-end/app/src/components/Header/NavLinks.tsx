import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const menuItems = [
  {
    name: 'Markets',
    href: '#markets',
    submenu: [
      { name: 'Stocks', description: 'Trade global stocks and ETFs', href: '#stocks' },
      { name: 'Crypto', description: 'Digital asset trading 24/7', href: '#crypto' },
      { name: 'Forex', description: 'Currency pair trading', href: '#forex' },
    ],
  },
  {
    name: 'Trading',
    href: '#trading',
    submenu: [
      { name: 'Platform', description: 'Advanced trading tools', href: '#platform' },
      { name: 'Analysis', description: 'Technical and fundamental analysis', href: '#analysis' },
      { name: 'API', description: 'Programmatic trading access', href: '#api' },
    ],
  },
  {
    name: 'Portfolio',
    href: '#portfolio',
    submenu: [
      { name: 'Dashboard', description: 'Track your investments', href: '#dashboard' },
      { name: 'Reports', description: 'Performance analytics', href: '#reports' },
      { name: 'Tax Center', description: 'Tax documents and reporting', href: '#tax' },
    ],
  },
  {
    name: 'Learn',
    href: '#learn',
    submenu: [
      { name: 'Academy', description: 'Trading education and courses', href: '#academy' },
      { name: 'Research', description: 'Market insights and analysis', href: '#research' },
      { name: 'Community', description: 'Join the discussion', href: '#community' },
    ],
  },
];

interface NavMenuProps {
  className?: string;
}

const NavLinks: React.FC<NavMenuProps> = ({ className = '' }) => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  return (
    <nav className={`${className} items-center space-x-8`}>
      {menuItems.map((item) => (
        <div
          key={item.name}
          className="relative"
          onMouseEnter={() => setHoveredMenu(item.name)}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          <button
            className="flex items-center text-sm text-gray-300 hover:text-white transition-colors"
          >
            {item.name}
            <ChevronDown
              className={`ml-1 h-4 w-4 transition-transform ${
                hoveredMenu === item.name ? 'rotate-180' : ''
              }`}
            />
          </button>

          {hoveredMenu === item.name && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2"
            >
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative bg-white/10 backdrop-blur-xl">
                  <div className="p-4 space-y-2">
                    {item.submenu.map((subItem, index) => (
                      <motion.a
                        key={subItem.name}
                        href={subItem.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.05, // Adds a cascading effect
                          duration: 0.2,
                          ease: 'easeInOut',
                        }}
                        className="block rounded-lg p-3 hover:bg-white/5 transition-colors"
                      >
                        <p className="text-sm font-medium text-white">
                          {subItem.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          {subItem.description}
                        </p>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default NavLinks;
