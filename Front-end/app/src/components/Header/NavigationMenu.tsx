import React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface NavigationMenuProps {
  className?: string;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ className }) => {
  return (
    <NavigationMenuPrimitive.Root className={className}>
      <NavigationMenuPrimitive.List className="flex items-center gap-6">
        <NavItem href="/" label="Markets">
          <div className="grid grid-cols-1 p-6 w-[540px] backdrop-blur-xl">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-3">
                  Stock Market
                </h3>
                <div className="space-y-2">
                  <NavLink href="/stock/all" icon="📈">
                    <span className="font-medium">All Stocks</span>
                    <span className="text-sm text-white/60">Browse all available stocks</span>
                  </NavLink>
                  <NavLink href="/stock/buy" icon="💰">
                    <span className="font-medium">Buy Stocks</span>
                    <span className="text-sm text-white/60">Place buy orders</span>
                  </NavLink>
                  <NavLink href="/stock/sell" icon="📊">
                    <span className="font-medium">Sell Stocks</span>
                    <span className="text-sm text-white/60">Manage your holdings</span>
                  </NavLink>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-3">
                  Market Indices
                </h3>
                <div className="space-y-2">
                  <NavLink href="/indices/nifty" icon="🎯">NIFTY 50</NavLink>
                  <NavLink href="/indices/sensex" icon="📊">SENSEX</NavLink>
                  <NavLink href="/indices/banknifty" icon="🏦">BANK NIFTY</NavLink>
                </div>
              </div>
            </div>
            <div className="border-l border-white/10 pl-6 space-y-4">
              <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">
                Featured
              </h3>
              <div className="space-y-4">
              <FeaturedCard
                  href="/market-analysis"
                  title="Market Analysis"
                  description="Get real-time insights and market trends"
                  imageSrc="https://i.pinimg.com/736x/d3/f4/1b/d3f41be339f89c1fb7bdad9d33a6fc81.jpg"
                />
                <FeaturedCard
                  href="/top-gainers"
                  title="Top Gainers"
                  description="Discover today's best performing stocks"
                  imageSrc="https://www.wjtv.com/wp-content/uploads/sites/72/2024/10/66fef94f803b60.79505850.jpeg?w=2560&h=1440&crop=1"
                />
              </div>
            </div>
          </div>
        </NavItem>

        <NavItem href="/trading" label="Trading">
          <div className="grid grid-cols-2 gap-4 p-2 w-[480px]">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Basic Trading</h3>
              <NavLink href="/trading/spot">Spot Trading</NavLink>
              <NavLink href="/trading/margin">Margin Trading</NavLink>
              <NavLink href="/trading/futures">Futures</NavLink>
              <NavLink href="/trading/options">Options</NavLink>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Advanced</h3>
              <NavLink href="/trading/algo">Algo Trading</NavLink>
              <NavLink href="/trading/derivatives">Derivatives</NavLink>
              <NavLink href="/trading/analysis">Technical Analysis</NavLink>
              <NavLink href="/trading/scanner">Market Scanner</NavLink>
            </div>
          </div>
        </NavItem>

        <NavItem href="/learn" label="Learn">
          <div className="grid grid-cols-1 gap-2 p-4 w-[280px]">
            <div className="space-y-2">
              <NavLink href="/learn/basics" className="learning-path">
                <span className="text-sm font-medium">Trading Basics</span>
                <span className="text-xs text-gray-400">Start your trading journey</span>
              </NavLink>
              <NavLink href="/learn/technical" className="learning-path">
                <span className="text-sm font-medium">Technical Analysis</span>
                <span className="text-xs text-gray-400">Chart patterns & indicators</span>
              </NavLink>
              <NavLink href="/learn/fundamental" className="learning-path">
                <span className="text-sm font-medium">Fundamental Analysis</span>
                <span className="text-xs text-gray-400">Evaluate company metrics</span>
              </NavLink>
              <NavLink href="/learn/strategies" className="learning-path">
                <span className="text-sm font-medium">Trading Strategies</span>
                <span className="text-xs text-gray-400">Advanced trading techniques</span>
              </NavLink>
            </div>
          </div>
        </NavItem>

        <SimpleNavLink href="/about">About</SimpleNavLink>
      </NavigationMenuPrimitive.List>

      <NavigationMenuPrimitive.Viewport className="absolute left-0 right-0 top-full" />
    </NavigationMenuPrimitive.Root>
  );
};

const NavItem: React.FC<{
  href: string;
  label: string;
  children: React.ReactNode;
}> = ({ href, label, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <NavigationMenuPrimitive.Item 
      onMouseEnter={() => setIsOpen(true)} 
      onMouseLeave={() => setIsOpen(false)}
    >
      <NavigationMenuPrimitive.Trigger 
        className="group flex items-center gap-1.5 text-white/80 hover:text-white transition-colors outline-none"
      >
        <span className="text-sm font-medium tracking-wide">{label}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-100",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </NavigationMenuPrimitive.Trigger>
      <AnimatePresence>
        {isOpen && (
          <NavigationMenuPrimitive.Content 
            className="absolute bg-black/50 backdrop-blur-xl left-0 right-0 top-full z-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.2,
                  ease: [0.4, 0.0, 0.2, 1]
                }
              }}
              exit={{ 
                opacity: 0, 
                y: -10,
                transition: {
                  duration: 0.15,
                  ease: [0.4, 0.0, 0.2, 1]
                }
              }}
              className="bg-black/80 backdrop-blur-xl border-t border-white/10"
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
  icon?: string;
  className?: string;
}> = ({ href, children, icon, className }) => (
  <motion.a
    href={href}
    className={cn(
      "group flex flex-col gap-0.5 p-3 rounded-lg hover:bg-white/5 transition-all duration-200",
      className
    )}
    whileHover={{ x: 4 }}
  >
    <div className="flex items-center gap-3">
      {icon && <span className="text-lg">{icon}</span>}
      <div className="flex flex-col">{children}</div>
    </div>
  </motion.a>
);

const SimpleNavLink: React.FC<{
  href: string;
  children: React.ReactNode;
}> = ({ href, children }) => (
  <NavigationMenuPrimitive.Item>
    <NavigationMenuPrimitive.Link
      href={href}
      className="text-gray-300 hover:text-white transition-colors"
    >
      {children}
    </NavigationMenuPrimitive.Link>
  </NavigationMenuPrimitive.Item>
);

const FeaturedCard: React.FC<{
  href: string;
  title: string;
  description: string;
  imageSrc: string;
}> = ({ href, title, description, imageSrc }) => (
  <motion.a
    href={href}
    className="block group rounded-lg overflow-hidden bg-white/5"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <div className="aspect-video relative overflow-hidden">
      <img
        src={imageSrc}
        alt={title}
        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-4">
      <h4 className="text-sm font-medium text-white mb-1">{title}</h4>
      <p className="text-sm text-white/60">{description}</p>
    </div>
  </motion.a>
);

export default NavigationMenu;