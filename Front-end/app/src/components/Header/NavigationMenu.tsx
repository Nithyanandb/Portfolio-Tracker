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
          <div className="grid grid-cols-1 gap-2 p-4 w-[240px] max-h-[400px] overflow-y-auto custom-scrollbar">
            <div className="pb-2 mb-2 border-b border-gray-700">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">Stocks</h3>
              <NavLink href="/stock/all">All Stocks</NavLink>
              <NavLink href="/stock/buy">Buy Stocks</NavLink>
              <NavLink href="/stock/sell">Sell Stocks</NavLink>
              <NavLink href="/stock/history">Transaction History</NavLink>
            </div>
            <div className="pb-2 mb-2 border-b border-gray-700">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">Indices</h3>
              <NavLink href="/indices/nifty">NIFTY 50</NavLink>
              <NavLink href="/indices/sensex">SENSEX</NavLink>
              <NavLink href="/indices/banknifty">BANK NIFTY</NavLink>
            </div>
          </div>
        </NavItem>

        <NavItem href="/trading" label="Trading">
          <div className="grid grid-cols-2 gap-4 p-4 w-[480px]">
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

      <NavigationMenuPrimitive.Viewport className="relative mt-2" />
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
    <NavigationMenuPrimitive.Item onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <NavigationMenuPrimitive.Trigger 
        className="group flex items-center gap-1 text-gray-100 hover:text-white transition-colors outline-none"
      >
        {label}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </NavigationMenuPrimitive.Trigger>
      <AnimatePresence>
        {isOpen && (
          <NavigationMenuPrimitive.Content className="absolute top-full left-0 mt-2">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-900/95 backdrop-blur-xl rounded-lg shadow-lg border border-gray-800"
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
  className?: string;
}> = ({ href, children, className }) => (
  <a
    href={href}
    className={cn(
      "block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-all",
      className === "learning-path" && "flex flex-col gap-0.5",
      className
    )}
  >
    {children}
  </a>
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

export default NavigationMenu;