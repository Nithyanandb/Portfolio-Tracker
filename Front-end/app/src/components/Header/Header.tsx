import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LogOut, ChevronDown, User, Settings, Bell } from 'lucide-react';
import { Logo } from './Logo';
import StockTicker from './StockTicker';
import { NavigationMenu } from './NavigationMenu';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';
import AuthModal from '../Auth/AuthModal';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="relative transition-all duration-300 bg-black/50 backdrop-blur-xl border-b border-white/10">
        {/* SpaceX-style grid background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo />

            {/* Navigation Menu */}
            <NavigationMenu className="hidden md:flex" />

            {/* User Actions */}
            <div className="flex items-center gap-4">
              <AnimatePresence mode="wait">
                {user ? (
                  <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-white/5 hover:bg-white/10 transition-colors rounded-full relative"
                    >
                      <Bell className="w-5 h-5 text-white" />
                      <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full" />
                    </motion.button>

                    {/* User Profile Dropdown */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="relative"
                    >
                      <motion.button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2 rounded-lg",
                          "bg-white/5 hover:bg-white/10 transition-all duration-200",
                          "border border-white/10 group"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="text-sm text-white font-medium">{user.name}</span>
                          <span className="text-xs text-white/60">{user.email}</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-white/60 group-hover:text-white/80 transition-colors" />
                      </motion.button>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ type: "spring", duration: 0.2 }}
                            className="absolute right-0 mt-2 w-64 py-2 rounded-lg bg-black/90 backdrop-blur-xl border border-white/10"
                          >
                            {/* Profile Section */}
                            <div className="px-4 py-3 border-b border-white/10">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                  <User className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-white font-medium">{user.name}</span>
                                  <span className="text-sm text-white/60">{user.email}</span>
                                </div>
                              </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-1">
                              <motion.button
                                className="w-full flex items-center gap-3 px-4 py-2 text-white/60 hover:text-white hover:bg-white/5 transition-all"
                                whileHover={{ x: 5 }}
                              >
                                <Settings className="w-4 h-4" />
                                <span>Settings</span>
                              </motion.button>

                              <motion.button
                                onClick={logout}
                                className="w-full flex items-center gap-3 px-4 py-2 text-white/60 hover:text-white hover:bg-white/5 transition-all"
                                whileHover={{ x: 5 }}
                              >
                                <LogOut className="w-4 h-4" />
                                <span>Sign Out</span>
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-6 py-2 bg-white text-black tracking-[0.2em] text-sm font-light hover:bg-white/90 transition-colors rounded-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    SIGN IN
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Stock Ticker Section */}
        <div className="border-t border-white/10 bg-black/40">
          <div className="container mx-auto">
            <StockTicker />
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
};

export default Header;