import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, ChevronDown, User, Settings, Loader2 } from 'lucide-react';
import { Logo } from './Logo';
import { NavigationMenu } from './NavigationMenu';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../../utils/cn';
import AuthModal from '../Auth/AuthModal';
import StockTicker from './StockTicker';
import { SearchPopover } from './SearchPopover';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated, isAuthenticating } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="relative bg-black/50 backdrop-blur-xl border-b border-white/10 z-30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Logo />
              <div className="flex items-center ml-36">
                <NavigationMenu />
              </div>
              
              <div className="flex items-center gap-6 relative z-30">
                <SearchPopover />

                {isAuthenticated ? (
                  <div className="relative">
                    <motion.button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-white/5 via-white/[0.07] to-white/5 rounded-lg hover:from-white/10 hover:via-white/[0.12] hover:to-white/10 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col items-start">
                        <span className="text-sm text-white/90 font-medium">
                          {user?.name}
                        </span>
                        <span className="text-xs text-white/60">
                          {user?.email}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4 text-white/60" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                          className="absolute right-0 mt-2 w-64 origin-top-right"
                        >
                          <div className="py-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl">
                            {user?.roles?.includes('ADMIN') && (
                              <div className="px-4 py-2 mb-1">
                                <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                                  Admin
                                </span>
                              </div>
                            )}
                            <motion.button 
                              className="w-full px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 flex items-center gap-2"
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.2 }}
                            >
                              <User className="w-4 h-4" />
                              Profile
                            </motion.button>
                            <motion.button 
                              className="w-full px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 flex items-center gap-2"
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Settings className="w-4 h-4" />
                              Settings
                            </motion.button>
                            <div className="border-t border-white/10 my-1" />
                            <motion.button 
                              onClick={logout}
                              className="w-full px-4 py-2 text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/5 flex items-center gap-2"
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.2 }}
                            >
                              <LogOut className="w-4 h-4" />
                              Sign Out
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="relative group overflow-hidden px-6 py-2 rounded-lg bg-gradient-to-r from-white/90 via-white to-white/90"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                        transform: 'skewX(-16deg) translateX(-100%)',
                      }}
                      animate={{
                        x: ['0%', '200%'],
                      }}
                      transition={{
                        duration: 1.5,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    />

                    <div className="relative flex items-center gap-2">
                      <span className="text-sm font-medium tracking-[0.2em] text-black/90">
                        SIGN IN
                      </span>
                    </div>
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ 
            opacity: scrollY > 50 ? 0 : 1,
            y: scrollY > 50 ? -100 : 0,
            scale: scrollY > 50 ? 0.95 : 1,
          }}
          transition={{
            opacity: { duration: 0.3, ease: 'easeInOut' },
            y: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 0.3, ease: 'easeOut' }
          }}
          className="relative z-20 flex justify-center"
        >
          <div className="w-[1000px]">
            <StockTicker />
          </div>
        </motion.div>
      </header>

      {/* Authentication Loading Overlay */}
      <AnimatePresence>
        {isAuthenticating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <div className="bg-black/90 p-8 rounded-xl border border-white/10 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-white mx-auto mb-4" />
              <h2 className="text-xl text-white font-light tracking-wider">
                Authenticating...
              </h2>
              <p className="text-white/60 mt-2">
                Connecting to your credentials
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default Header;