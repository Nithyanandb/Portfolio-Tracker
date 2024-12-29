// Header.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, ChevronDown, User, Settings, Loader2 } from 'lucide-react';
import { Logo } from './Logo';
import { NavigationMenu } from './NavigationMenu';
import { useAuth } from '../hooks/useAuth';
import AuthModal from '../Auth/AuthModal';
import StockTicker from './StockTicker';
import { SearchPopover } from './SearchPopover';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated, isAuthenticating } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="relative bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <NavigationMenu />
            
            <div className="flex items-center gap-4">
              <SearchPopover/>
              {isAuthenticated ? (
                <div className="relative">
                  <motion.button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-white/5"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-sm text-white font-medium">
                        {user?.name}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-white/60" />
                  </motion.button>

                  <AnimatePresence>
                    
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 py-2 bg-black/95 backdrop-blur-xl rounded-lg shadow-xl border border-white/10"
                      >
                        {user?.roles?.includes('ADMIN') && (
                          <div className="px-4 py-2 mb-2">
                            <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                              Admin
                            </span>
                          </div>
                        )}
                        <motion.button
                         
                          className="w-full px-4 py-2 text-sm text-white/80 hover:bg-white/5 flex items-center gap-2"
                          whileHover={{ x: 4 }}
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </motion.button>
                        <motion.button 
                          className="w-full px-4 py-2 text-sm text-white/80 hover:bg-white/5 flex items-center gap-2"
                          whileHover={{ x: 4 }}
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </motion.button>
                        <div className="border-t border-white/10 my-2" />
                        <motion.button 
                          onClick={logout}
                          className="w-full px-4 py-2 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2"
                          whileHover={{ x: 4 }}
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-6 py-2 bg-white text-black tracking-[0.2em] text-sm font-light hover:bg-white/90"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  SIGN IN
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Loading Overlay */}
      <AnimatePresence>
        {isAuthenticating && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
            >
              <div className="bg-black/95 p-8 rounded-xl border border-white/10 text-center">
                <Loader2 className="w-12 h-12 animate-spin text-white mx-auto mb-4" />
                <h2 className="text-xl text-white font-light tracking-wider">
                  Authenticating...
                </h2>
                <p className="text-white/60 mt-2">
                  Connecting to your credentials
                </p>
              </div>
            </motion.div>
            <StockTicker />
          </>
        )}
      </AnimatePresence>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
};

export default Header;