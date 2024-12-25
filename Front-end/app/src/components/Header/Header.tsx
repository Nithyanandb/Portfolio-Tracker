import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NavigationMenu } from './NavLinks';
import { SearchPopover } from '../Header/SearchPopover';

import { Logo } from './Logo';
import UserMenu from './UserMenu';

interface HeaderProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  onLogout: () => void;
  onLogin: (user: any) => void;
}

const Header: React.FC<HeaderProps> = ({  }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 mt-0
        transition-all duration-300 ease-in-out xs:py-10
        ${isScrolled ? 'bg-black/80 backdrop-blur-xl py-4' : 'bg-transparent py-6'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xs:p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo/>
            <NavigationMenu className="hidden mt-10 lg:flex lg:text-align-center flex" />
          </div>

          <div className="flex items-center gap-6 mt-10 ">
            <SearchPopover />
            <UserMenu username={''} onLogout={function (): void {
              throw new Error('Function not implemented.');
            } } onProfile={function (): void {
              throw new Error('Function not implemented.');
            } } />
            
            {/* <UserProfile user={null} onLogout={function (): void {
              throw new Error('Function not implemented.');
            } } /> */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden text-gray-100 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6 " />
              )}
            </motion.button>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;