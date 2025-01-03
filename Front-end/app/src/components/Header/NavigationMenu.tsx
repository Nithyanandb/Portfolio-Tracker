import React, { useState } from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  BarChart2,
  DollarSign,
  PieChart,
  Briefcase,
  TrendingUp,
  Landmark,
  Binary,
  LineChart,
  BookOpen,
  GraduationCap,
  Target,
  Building2,
  Laptop,
  Brain,
  Lightbulb
} from 'lucide-react';
import { cn } from '../../utils/cn';
import AuthModal from '../Auth/AuthModal';
import { useAuth } from '../hooks/useAuth';

interface NavigationMenuProps {
  className?: string;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ className }) => {
  const { isAuthenticated } = useAuth();
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  const handleMouseEnter = (menuId: string) => {
    setHoveredMenu(menuId);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(hoveredMenu);
  };

  const handleNavigation = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setPendingNavigation(href);
      setIsAuthModalOpen(true);
      return;
    }
    window.location.href = href;
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    if (pendingNavigation) {
      window.location.href = pendingNavigation;
      setPendingNavigation(null);
    }
  };

  return (
    <>
      <NavigationMenuPrimitive.Root className={className}>
        <NavigationMenuPrimitive.List className="flex items-center gap-6">
          <NavItem 
            href="/" 
            label="Markets" 
            isHovered={hoveredMenu === 'markets'}
            onMouseEnter={() => handleMouseEnter('markets')}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container mx-auto grid grid-cols-2 gap-8 p-12">
              {/* Left Side - Markets Content */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0 }}
                  className="relative aspect-[16/9] overflow-hidden"
                >
                  <img
                    src="https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F72274a20-82a5-4e50-9834-f46dabaa10a6.jpg?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1"
                    alt="Markets Overview"
                    className="w-full h-full border-bottom-10 border-bottom-white/10 rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-light text-white tracking-wide">
                      Market Analysis and Insights
                    </h3>
                  </div>
                </motion.div>
              </div>

              {/* Right Side - Menu Items */}
              <div className="space-y-6 grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">
                    Stock Market
                  </h3>
                  <div className="grid gap-2">
                    <NavLink href="/stock/all" icon={<BarChart2 size={20} />}>
                      <span className="font-medium">All Stocks</span>
                      <span className="text-sm text-white/60">Browse all available stocks</span>
                    </NavLink>
                    <NavLink href="/stock/buy" icon={<DollarSign size={20} />}>
                      <span className="font-medium">Buy Stocks</span>
                      <span className="text-sm text-white/60">Place buy orders</span>
                    </NavLink>
                    <NavLink href="/stock/sell" icon={<PieChart size={20} />}>
                      <span className="font-medium">Sell Stocks</span>
                      <span className="text-sm text-white/60">Manage your holdings</span>
                    </NavLink>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider -mt-[20px] mb-4">
                    Market Indices
                  </h3>
                  <div className="grid gap-2">
                    <NavLink href="/indices/nifty" icon={<Target size={20} />}>
                      <span className="font-medium">NIFTY 50</span>
                      <span className="text-sm text-white/60">Track primary index</span>
                    </NavLink>
                    <NavLink href="/indices/sensex" icon={<LineChart size={20} />}>
                      <span className="font-medium">SENSEX</span>
                      <span className="text-sm text-white/60">BSE benchmark index</span>
                    </NavLink>
                    <NavLink href="/indices/banknifty" icon={<Landmark size={20} />}>
                      <span className="font-medium">BANK NIFTY</span>
                      <span className="text-sm text-white/60">Banking sector performance</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </NavItem>

          <NavItem 
            href="/trading" 
            label="Trading" 
            isHovered={hoveredMenu === 'trading'}
              onMouseEnter={() => handleMouseEnter('trading')}
              onMouseLeave={handleMouseLeave}
            >
            <div className="container mx-auto grid grid-cols-2 gap-8 p-12">
              {/* Left Side - Trading Image */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0 }}
                  className="relative aspect-[16/9] overflow-hidden rounded-lg"
                >
                  <img
                    src="https://zerodha.com/static/images/console-app.png"
                    alt="Trading Platform"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-light text-white tracking-wide">
                      Advanced trading tools and analysis
                    </h3>
                  </div>
                </motion.div>
              </div>

              {/* Right Side - Trading Options */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">
                    Basic Trading
                  </h3>
                  <div className="space-y-2">
                    <NavLink href="/trading/spot" icon={<TrendingUp size={20} />}>
                      <span className="font-medium">Spot Trading</span>
                      <span className="text-sm text-white/60">Direct market access</span>
                    </NavLink>
                    <NavLink href="/trading/margin" icon={<Briefcase size={20} />}>
                      <span className="font-medium">Margin Trading</span>
                      <span className="text-sm text-white/60">Leverage your positions</span>
                    </NavLink>
                    <NavLink href="/trading/futures" icon={<LineChart size={20} />}>
                      <span className="font-medium">Futures</span>
                      <span className="text-sm text-white/60">Trade market futures</span>
                    </NavLink>
                    <NavLink href="/trading/options" icon={<Binary size={20} />}>
                      <span className="font-medium">Options</span>
                      <span className="text-sm text-white/60">Options trading platform</span>
                    </NavLink>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">
                    Advanced
                  </h3>
                  <div className="space-y-2">
                    <NavLink href="/trading/algo" icon={<Laptop size={20} />}>
                      <span className="font-medium">Algo Trading</span>
                      <span className="text-sm text-white/60">Automated systems</span>
                    </NavLink>
                    <NavLink href="/trading/derivatives" icon={<Building2 size={20} />}>
                      <span className="font-medium">Derivatives</span>
                      <span className="text-sm text-white/60">Complex instruments</span>
                    </NavLink>
                    <NavLink href="/trading/analysis" icon={<Brain size={20} />}>
                      <span className="font-medium">Technical Analysis</span>
                      <span className="text-sm text-white/60">Chart analysis tools</span>
                    </NavLink>
                    <NavLink href="/trading/scanner" icon={<Target size={20} />}>
                      <span className="font-medium">Market Scanner</span>
                      <span className="text-sm text-white/60">Find opportunities</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </NavItem>

          <NavItem 
            href="/learn" 
            label="Learn" 
            isHovered={hoveredMenu === 'learn'}
            onMouseEnter={() => handleMouseEnter('learn')}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container mx-auto grid grid-cols-2 gap-8 p-12">
              {/* Left Side - Learn Image */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0 }}
                  className="relative aspect-[16/9] overflow-hidden rounded-lg"
                >
                  <img
                    src="https://profitmart.in/wp-content/uploads/2023/06/basic-stock-market.jpg"
                    alt="Learning Resources"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-light text-white tracking-wide">
                      Educational resources and guides
                    </h3>
                  </div>
                </motion.div>
              </div>

              {/* Right Side - Learning Paths */}
              <div className="space-y-4">
                <NavLink href="/learn/basics" icon={<BookOpen size={20} />} className="learning-path">
                  <span className="font-medium">Trading Basics</span>
                  <span className="text-sm text-white/60">Start your trading journey</span>
                </NavLink>
                <NavLink href="/learn/technical" icon={<LineChart size={20} />} className="learning-path">
                  <span className="font-medium">Technical Analysis</span>
                  <span className="text-sm text-white/60">Chart patterns & indicators</span>
                </NavLink>
                <NavLink href="/learn/fundamental" icon={<Brain size={20} />} className="learning-path">
                  <span className="font-medium">Fundamental Analysis</span>
                  <span className="text-sm text-white/60">Evaluate company metrics</span>
                </NavLink>
                <NavLink href="/learn/strategies" icon={<Lightbulb size={20} />} className="learning-path">
                  <span className="font-medium">Trading Strategies</span>
                  <span className="text-sm text-white/60">Advanced trading techniques</span>
                </NavLink>
              </div>
            </div>
          </NavItem>

          <SimpleNavLink href="/about">About</SimpleNavLink>
        </NavigationMenuPrimitive.List>

        <NavigationMenuPrimitive.Viewport className="absolute left-0 right-0 top-full" />
      </NavigationMenuPrimitive.Root>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setPendingNavigation(null);
        }}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

const NavItem: React.FC<{
  href: string;
  label: string;
  children: React.ReactNode;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ href, label, children, isHovered, onMouseEnter, onMouseLeave }) => {
  return (
    <NavigationMenuPrimitive.Item
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <NavigationMenuPrimitive.Trigger 
        className="group flex items-center gap-1.5 text-white/80 hover:text-white transition-colors outline-none"
      >
        <span className="text-sm font-medium tracking-wide">{label}</span>
        <motion.div
          animate={{ rotate: isHovered ? 180 : 0 }}
          transition={{ duration: 0 }}
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.div>
      </NavigationMenuPrimitive.Trigger>

      <AnimatePresence>
        {isHovered && (
          <NavigationMenuPrimitive.Content 
            className="absolute left-0 right-0 top-full z-50 w-screen"
          >
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0 }}
              className="bg-black/95 backdrop-blur-xl border-t border-white/10"
            >
              {children}
            </motion.div>
          </NavigationMenuPrimitive.Content>
        )}
      </AnimatePresence>
    </NavigationMenuPrimitive.Item>
  );
};

const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  icon?: React.ReactElement;
  className?: string;
}> = ({ href, children, icon, className }) => {
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    window.location.href = href;
  };

  return (
    <>
      <motion.a
        href={href}
        className={cn(
          "group flex flex-col gap-0.5 p-4 rounded-lg hover:bg-white/5 transition-all duration-200",
          className
        )}
        whileHover={{ x: 0 }}
        onClick={handleClick}
      >
        <div className="flex items-center gap-3">
          {icon && React.cloneElement(icon, { className: "text-white/60 group-hover:text-white transition-colors" })}
          <div className="flex flex-col">{children}</div>
        </div>
      </motion.a>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false);
          window.location.href = href;
        }}
      />
    </>
  );
};

const SimpleNavLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <NavigationMenuPrimitive.Item>
    <NavigationMenuPrimitive.Link
      href={href}
      className="text-sm text-white/70 hover:text-white transition-colors"
    >
      {children}
    </NavigationMenuPrimitive.Link>
  </NavigationMenuPrimitive.Item>
);

export default NavigationMenu;