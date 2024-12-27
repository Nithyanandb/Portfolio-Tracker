import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut } from 'lucide-react';
import { SearchPopover } from '../Header/SearchPopover';
import { Logo } from './Logo';
import StockTicker from './StockTicker';
import { useAuth } from '../../hooks/useAuth';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { cn } from '../../utils/cn';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent
} from '../Navigation/Navigation';
import { MenuIcon } from '../Icons/MenuIcon';
import { 
  TrendingUp, 
  ChevronDown, 
  Briefcase, 
  Eye, 
  Newspaper, 
  Github, 
  Mail, 
  X as CloseIcon 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { 
    login, 
    register, 
    loginWithGoogle, 
    loginWithGithub, 
    isLoading, 
    isAuthenticating,
    error 
  } = useAuth();

  const handleTraditionalAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (authMode === 'login') {
        await login(email, password);
      } else {
        await register(email, password);
      }
      onClose();
    } catch (error) {
      // Error handling is now managed by the AuthContext
      console.error('Authentication error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gray-900 rounded-2xl p-6 w-full max-w-md relative"
      >
        {isAuthenticating ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">Authenticating...</h3>
            <p className="text-gray-400 mt-2">Please wait while we verify your credentials</p>
          </div>
        ) : (
          <>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">
              {authMode === 'login' ? 'Welcome Back!' : 'Create Account'}
            </h2>

            <div className="space-y-4">
              <button
                onClick={loginWithGoogle}
                className="w-full py-3 px-4 rounded-lg bg-white text-gray-900 font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                disabled={isLoading}
              >
                <Mail className="w-5 h-5" />
                Continue with Google
              </button>

              <button
                onClick={loginWithGithub}
                className="w-full py-3 px-4 rounded-lg bg-gray-800 text-white font-medium flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
                disabled={isLoading}
              >
                <Github className="w-5 h-5" />
                Continue with GitHub
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                </div>
              </div>

              <form onSubmit={handleTraditionalAuth} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "w-full py-3 px-4 rounded-lg font-medium",
                    "bg-gradient-to-r from-blue-600 to-blue-500",
                    "hover:from-blue-500 hover:to-blue-400",
                    "text-white transition-all",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900",
                    isLoading && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isLoading ? 'Please wait...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
                </button>
              </form>

              <p className="text-center text-gray-400">
                {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {authMode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, logout, isLoading } = useAuth();
  const isScrolled = useScrollPosition();
  const [activeTab, setActiveTab] = useState('markets');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  const navItems = [
    { 
      id: 'markets', 
      label: 'Markets',
      icon: TrendingUp,
      items: [
        { 
          id: 'allstocks', 
          label: 'All Stocks',
          path: '/stock/all',
          description: 'View all available stocks',
          icon: '📊'
        },
        { 
          id: 'buy', 
          label: 'Buy Stocks',
          path: '/stock/buy',
          description: 'Purchase new stocks',
          icon: '💰'
        },
        { 
          id: 'sell', 
          label: 'Sell Stocks',
          path: '/stock/sell',
          description: 'Sell your holdings',
          icon: '💱'
        },
        { 
          id: 'transactions', 
          label: 'Transactions',
          path: '/transaction/all',
          description: 'View your trading history',
          icon: '📝'
        }
      ]
    },
    { 
      id: 'portfolio', 
      label: 'Portfolio',
      icon: Briefcase,
      items: [
        {
          id: 'overview',
          label: 'Portfolio Overview',
          path: '/portfolio',
          description: 'View your investment summary',
          icon: '📈'
        },
        {
          id: 'holdings',
          label: 'Holdings',
          path: '/portfolio/holdings',
          description: 'Manage your stock positions',
          icon: '💼'
        },
        {
          id: 'performance',
          label: 'Performance',
          path: '/portfolio/performance',
          description: 'Track your returns',
          icon: '📊'
        },
        {
          id: 'analysis',
          label: 'Analysis',
          path: '/portfolio/analysis',
          description: 'Deep dive into your portfolio',
          icon: '🔍'
        }
      ]
    },
    { 
      id: 'watchlist', 
      label: 'Watchlist',
      icon: Eye,
      items: [
        {
          id: 'my-lists',
          label: 'My Lists',
          path: '/watchlist',
          description: 'View your saved watchlists',
          icon: '📋'
        },
        {
          id: 'create-list',
          label: 'Create List',
          path: '/watchlist/create',
          description: 'Create a new watchlist',
          icon: '➕'
        },
        {
          id: 'alerts',
          label: 'Price Alerts',
          path: '/watchlist/alerts',
          description: 'Manage your price alerts',
          icon: '🔔'
        }
      ]
    },
    { 
      id: 'news', 
      label: 'News',
      icon: Newspaper,
      items: [
        {
          id: 'market-news',
          label: 'Market News',
          path: '/news/market',
          description: 'Latest market updates',
          icon: '📰'
        },
        {
          id: 'analysis',
          label: 'Analysis',
          path: '/news/analysis',
          description: 'Expert market analysis',
          icon: '📊'
        },
        {
          id: 'research',
          label: 'Research',
          path: '/news/research',
          description: 'In-depth research reports',
          icon: '📑'
        }
      ]
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect and state cleanup is handled in the AuthContext
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <header className="w-full fixed top-0 left-0 right-0 z-20">
        <div className={cn(
          'w-full h-14 bg-black/90 backdrop-blur-sm border-b border-gray-800 shadow-lg'
        )}>
          <div className="container mx-auto px-4 h-full">
            <nav className="flex items-center justify-between h-full relative">
              <div className="w-[200px] flex items-center">
                <Logo />
              </div>

              <div className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="hidden lg:flex items-center space-x-1">
                  {navItems.map((item) => (
                    <div
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.id)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                          "px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2",
                          "hover:bg-gray-800/50",
                          activeTab === item.id
                            ? "text-white bg-gray-800/30"
                            : "text-gray-400 hover:text-gray-200"
                        )}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                        <ChevronDown className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          activeDropdown === item.id && "transform rotate-180"
                        )} />
                      </button>

                      <AnimatePresence>
                        {activeDropdown === item.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 pt-2 w-[300px] z-20"
                          >
                            <div className="bg-black/95 backdrop-blur-xl border border-gray-800/50 rounded-lg shadow-xl overflow-hidden">
                              <div className="p-2">
                                {item.items.map((menuItem) => (
                                  <motion.button
                                    key={menuItem.id}
                                    onClick={() => {
                                      navigate(menuItem.path);
                                      setActiveDropdown(null);
                                    }}
                                    className="w-full text-left p-3 rounded-lg hover:bg-gray-800/50 transition-colors group flex items-start gap-3"
                                    whileHover={{ x: 4 }}
                                  >
                                    <span className="text-xl">{menuItem.icon}</span>
                                    <div>
                                      <div className="font-medium text-gray-200 group-hover:text-white">
                                        {menuItem.label}
                                      </div>
                                      <div className="text-sm text-gray-400 group-hover:text-gray-300">
                                        {menuItem.description}
                                      </div>
                                    </div>
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-[200px] flex items-center justify-end gap-4">
                <SearchPopover 
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                />
                
                {user ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-300">
                      {user.name || user.email}
                    </span>
                    <button
                      onClick={handleLogout}
                      className={cn(
                        "px-4 py-1.5 text-sm font-medium rounded-full",
                        "bg-gray-800 text-gray-300",
                        "hover:bg-gray-700 hover:text-white",
                        "transition-all duration-300",
                        isLoading && "opacity-50 cursor-not-allowed"
                      )}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Logging out...' : 'Logout'}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className={cn(
                      "px-4 py-1.5 text-sm font-medium rounded-full",
                      "bg-gradient-to-r from-blue-600 to-blue-500",
                      "hover:from-blue-500 hover:to-blue-400",
                      "transition-all duration-300",
                      "text-white"
                    )}
                  >
                    Sign In
                  </button>
                )}

                <button className="lg:hidden p-2">
                  <MenuIcon className="w-5 h-5" />
                </button>
              </div>
            </nav>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {!isScrolled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '32px' }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full relative overflow-hidden bg-black/50 backdrop-blur-sm"
            >
              <div className="z-200 inset-0 flex justify-center items-center">
                <motion.div className="max-w-2xl -z-0 w-full h-8 px-4 flex items-center justify-center">
                  <StockTicker />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {showAuthModal && (
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;