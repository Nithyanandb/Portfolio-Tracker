import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { LogOut, ChevronDown, User, Settings, Loader2, Briefcase } from 'lucide-react';
import { Logo } from './Logo';
import { NavigationMenu } from './NavigationMenu';
import { useAuth } from '../hooks/useAuth';
import AuthModal from '../Auth/AuthModal';
import StockTicker from './StockTicker/StockTicker';
import { SearchPopover } from './SearchPopover';
import { stocks } from './StockTicker/stockData';
import { useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated, isAuthenticating } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Transform values for smooth animations
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.98]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 12]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileClick = () => {
    navigate('/portfolio');
    setIsUserMenuOpen(false);
  };

  // Array of paths where we want to show the stock ticker
  const showTickerPaths = ['/'];

  // Check if current path should show ticker
  const shouldShowTicker = showTickerPaths.includes(location.pathname);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        opacity: headerOpacity,
        backdropFilter: `blur(${headerBlur}px)`
      }}
    >
      <div className="relative bg-black/80">
        {/* Premium gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Logo />

            <div className="flex items-center gap-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <NavigationMenu />
              </div>
              <div className="flex items-center gap-6">
                <SearchPopover />
                {isAuthenticated ? (
                  <div 
                    className="relative"
                    ref={dropdownRef}
                  >
                    <motion.button
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-white/80 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    >
                      <span className="text-sm font-medium">{user?.name}</span>
                      <motion.div
                        animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 opacity-60" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                          className="absolute right-0 mt-2 w-[280px] py-2 origin-top-right bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10"
                        >
                          {user?.roles?.includes('ADMIN') && (
                            <div className="px-4 py-2 mb-1">
                              <span className="px-2 py-1 text-[11px] font-medium bg-blue-500/10 text-blue-400 rounded-full">
                                admin access
                              </span>
                            </div>
                          )}

                          <div className="px-3 py-2">
                            <motion.button
                              onClick={handleProfileClick}
                              className="w-full p-2 text-[13px] text-white/80 hover:text-white rounded-xl hover:bg-white/5 flex items-center gap-3 transition-all duration-200"
                              whileHover={{ x: 2 }}
                            >
                              <Briefcase className="w-[18px] h-[18px] opacity-70" />
                              <span className="font-medium">portfolio</span>
                            </motion.button>

                            <motion.button
                              className="w-full p-2 text-[13px] text-white/80 hover:text-white rounded-xl hover:bg-white/5 flex items-center gap-3 transition-all duration-200"
                              whileHover={{ x: 2 }}
                            >
                              <Settings className="w-[18px] h-[18px] opacity-70" />
                              <span className="font-medium">settings</span>
                            </motion.button>
                          </div>

                          <div className="my-2 border-t border-white/[0.08]" />

                          <div className="px-3 py-2">
                            <motion.button
                              onClick={logout}
                              className="w-full p-2 text-[13px] text-red-400 hover:text-red-300 rounded-xl hover:bg-red-500/10 flex items-center gap-3 transition-all duration-200"
                              whileHover={{ x: 2 }}
                            >
                              <LogOut className="w-[18px] h-[18px] opacity-70" />
                              <span className="font-medium">sign out</span>
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-6 py-2 bg-white rounded-full text-black text-sm font-medium tracking-wide hover:bg-white/90 transition-all duration-300"
                  >
                    Sign In
                  </motion.button>
                )}
              </div>
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </motion.header>
  );
};

export default Header;