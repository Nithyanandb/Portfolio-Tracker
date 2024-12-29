import React from 'react';
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

interface NavigationMenuProps {
  className?: string;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ className }) => {
  return (
    <NavigationMenuPrimitive.Root className={className}>
      <NavigationMenuPrimitive.List className="flex items-center gap-6">
        <NavItem href="/" label="Markets">
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
                  src="holderimage.com/800x600"
                  alt="Markets Overview"
                  className="w-full h-full border-bottom-10 border-bottom-white/10 rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-light text-white tracking-wide">
                    Real-time market analysis and tracking
                  </h3>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Menu Items */}
            <div className="space-y-6">
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
                <h3 className="text-sm font-medium grid-cols-2 grid text-white/60 uppercase tracking-wider mb-4">
                  Market Indices
                </h3>
                <div className="grid gap-2 ">
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

        <NavItem href="/trading" label="Trading">
          <div className="container mx-auto grid grid-cols-2 gap-8 p-12">
            {/* Left Side - Trading Image */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="relative aspect-[16/9] overflow-hidden rounded-lg"
              >
                <img
                  src="/api/placeholder/800/600"
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

        <NavItem href="/learn" label="Learn">
          <div className="container mx-auto grid grid-cols-2 gap-8 p-12">
            {/* Left Side - Learn Image */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="relative aspect-[16/9] overflow-hidden rounded-lg"
              >
                <img
                  src="/api/placeholder/800/600"
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
  );
};

// NavItem component remains the same as in your original code
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
            "h-3.5 w-3.5 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </NavigationMenuPrimitive.Trigger>
      <AnimatePresence>
        {isOpen && (
          <NavigationMenuPrimitive.Content
            className="absolute left-0 right-0 top-full z-50 w-screen"
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

// Updated NavLink component to accept React element as icon
const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  icon?: React.ReactElement;
  className?: string;
}> = ({ href, children, icon, className }) => (
  <motion.a
    href={href}
    className={cn(
      "group flex flex-col gap-0.5 p-4 rounded-lg hover:bg-white/5 transition-all duration-200",
      className
    )}
    whileHover={{ x: 8 }}
  >
    <div className="flex items-center gap-3">
      {icon && React.cloneElement(icon, { className: "text-white/60 group-hover:text-white transition-colors" })}
      <div className="flex flex-col">{children}</div>
    </div>
  </motion.a>
);

// SimpleNavLink component remains the same
const SimpleNavLink: React.FC<{
  href: string;
  children: React.ReactNode;
}> = ({ href, children }) => (
  <NavigationMenuPrimitive.Item>
    <NavigationMenuPrimitive.Link
      href={href}
      className="text-white/80 hover:text-white transition-colors"
    >
      {children}
    </NavigationMenuPrimitive.Link>
  </NavigationMenuPrimitive.Item>
);

export default NavigationMenu;