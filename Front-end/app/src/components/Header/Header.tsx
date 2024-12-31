// Header.tsx
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { LogOut, ChevronDown, User, Settings, Loader2 } from 'lucide-react';
import { Logo } from './Logo';
import { NavigationMenu } from './NavigationMenu';
import { useAuth } from '../hooks/useAuth';
import AuthModal from '../Auth/AuthModal';
import StockTicker from './StockTicker/StockTicker';
import { SearchPopover } from './SearchPopover';
import { stocks } from './StockTicker/stockData';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated, isAuthenticating } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Transform values for smooth animations
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.98]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8]);
  const tickerY = useTransform(scrollY, [0, 100], [0, -100]);
  const tickerOpacity = useTransform(scrollY, [0, 60], [1, 0]);
  const tickerScale = useTransform(scrollY, [0, 100], [1, 0.95]);

  // Wave animation for the ticker
  const waveEffect = useTransform(scrollY, [0, 100], [0, 20]);

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
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Logo />
            
            <div className="flex items-center gap-8">
              <div className="absolute inset-0 flex items-center justify-center">
              <NavigationMenu />
              </div>
              <div className="flex items-center gap-6">
                <SearchPopover/>
                {isAuthenticated ? (
                  <div className="relative">
                    <motion.button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col items-start">
                        <span className="text-sm text-white/90 font-light tracking-wide">
                          {user?.name}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-white/40" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-48 py-2 bg-black/90 backdrop-blur-xl rounded-lg border border-white/10"
                        >
                          {user?.roles?.includes('ADMIN') && (
                            <div className="px-4 py-2 mb-2">
                              <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                                Admin
                              </span>
                            </div>
                          )}
                          <MenuButton icon={User} text="Profile" />
                          <MenuButton icon={Settings} text="Settings" />
                          <div className=" my-2" />
                          <MenuButton 
                            icon={LogOut} 
                            text="Logout" 
                            onClick={logout}
                            className="text-red-400 hover:text-red-300"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-6 py-2 z-20 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-light tracking-wider rounded-lg hover:opacity-90 transition-all duration-300"
                  >
                    Sign In
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stock Ticker with enhanced styling */}
        <motion.div 
          className="absolute left-0 right-0 overflow-hidden"
          style={{ 
            y: tickerY,
            opacity: tickerOpacity,
            scale: tickerScale
          }}
        >
          <motion.div 
            className="container mx-auto"
            style={{
              transform: waveEffect.get() ? `translate3d(0, ${Math.sin(Date.now() / 1000) * waveEffect.get()}px, 0)` : 'none'
            }}
          >
            <StockTicker stocks={stocks} />
          </motion.div>
        </motion.div>
      </div>

      {/* Authentication Loading Overlay */}
      <AnimatePresence>
        {isAuthenticating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 backdrop-blur-xl"
          >
            <div className="bg-black/95 p-8 rounded-xl text-center">
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
    </motion.header>
  );
};

// Helper component for menu buttons
const MenuButton: React.FC<{
  icon: any;
  text: string;
  onClick?: () => void;
  className?: string;
}> = ({ icon: Icon, text, onClick, className = "text-white/80 hover:text-white" }) => (
  <motion.button
    whileHover={{ x: 4 }}
    onClick={onClick}
    className={`w-full px-4 py-2 text-sm hover:bg-white/5 flex items-center gap-2 ${className}`}
  >
    <Icon className="w-4 h-4" />
    {text}
  </motion.button>
);

export default Header;