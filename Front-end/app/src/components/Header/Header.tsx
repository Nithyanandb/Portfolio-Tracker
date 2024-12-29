import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, ChevronDown, User, Settings, Loader2 } from 'lucide-react';
import { Logo } from './Logo';
import { NavigationMenu } from './NavigationMenu';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../../utils/cn';
import AuthModal from '../Auth/AuthModal';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated, isAuthenticating } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="relative bg-black/5 backdrop-blur-lg">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center justify-between h-[56px]">
            <Logo />
            <NavigationMenu />
            
            <div className="flex items-center gap-6">
              {isAuthenticated ? (
                <div className="relative">
                  <motion.button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-4 py-1 rounded-md text-sm font-medium text-white/90 hover:text-white transition-colors"
                  >
                    <span className="text-sm">{user?.name}</span>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </motion.button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black/5"
                      >
                        {user?.roles?.includes('ADMIN') && (
                          <div className="px-4 py-2 mb-2">
                            <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                              Admin
                            </span>
                          </div>
                        )}
                        <button className="w-full px-4 py-2 text-sm text-white/80 hover:bg-white/5 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Profile
                        </button>
                        <button className="w-full px-4 py-2 text-sm text-white/80 hover:bg-white/5 flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>
                        <div className="border-t border-white/10 my-2" />
                        <button 
                          onClick={logout}
                          className="w-full px-4 py-2 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-1 text-sm font-medium text-black bg-white/90 rounded hover:bg-white transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

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
    </header>
  );
};

export default Header;