import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Menu, X } from 'lucide-react';
import { Popover, Transition } from '@headlessui/react';
import MobileNav from './MobileMenu';
import NavMenu from './NavLinks';
import DynamicBackground from '../Hero/DynamicBackground';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
          <DynamicBackground currentSection={0}/>
      <header style={{padding:'25px 30px 0px 30px'}}
        className={`fixed z-40 w-100 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <motion.a
              href="/"
              className="relative z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/capx-logo.svg" alt="CapX.live" className="h-6 pr-5" />
            </motion.a>

            {/* Desktop Navigation */}
            <NavMenu className="hidden lg:flex" />

            {/* Right Actions */}
            <div className="flex items-center space-x-6">
              <Popover className="hidden lg:block relative">
                {({ open }) => (
                  <>
                    <Popover.Button className="flex items-center text-gray-300 hover:text-white transition-colors">
                      <Search className="h-5 w-5" />
                    </Popover.Button>
                    <Transition
                      show={open}
                      enter="transition duration-200 ease-out"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition duration-150 ease-in"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-xs transform px-2">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative bg-white/10 backdrop-blur-xl p-4">
                            <input
                              type="text"
                              placeholder="Search markets..."
                              className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <Popover className="hidden lg:block relative">
                {({ open }) => (
                  <>
                    <Popover.Button className="flex items-center text-gray-300 hover:text-white transition-colors">
                      <User className="h-5 w-5" />
                    </Popover.Button>
                    <Transition
                      show={open}
                      enter="transition duration-200 ease-out"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition duration-150 ease-in"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-xs transform px-2">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative bg-white/10 backdrop-blur-xl p-4">
                            <div className="space-y-3">
                              <button className="w-full text-left px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                                Sign In
                              </button>
                              <button className="w-full text-left px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                                Create Account
                              </button>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden text-gray-300 hover:text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileNav onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;