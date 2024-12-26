import React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { motion } from 'framer-motion';
import { ChevronDown} from 'lucide-react';

interface NavigationMenuProps {
  className?: string;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ className }) => {
  return (
    <NavigationMenuPrimitive.Root className={className}>
      <NavigationMenuPrimitive.List className="flex items-center gap-6">
        <NavItem href="/markets" label="Markets">
          <div className="grid grid-cols-1 gap-4 p-4 w-[200px]">
            <NavLink href="/markets/stocks">Stocks</NavLink>
            <NavLink href="/markets/crypto">Crypto</NavLink>
            <NavLink href="/markets/forex">Forex</NavLink>
            <NavLink href="/markets/commodities">Commodities</NavLink>
          </div>
        </NavItem>

        <NavItem href="/trading" label="Trading">
          <div className="grid grid-cols-2 gap-2 p-4 w-[350px]">
            <NavLink href="/trading/spot">Spot Trading</NavLink>
            <NavLink href="/trading/margin">Margin Trading</NavLink>
            <NavLink href="/trading/futures">Futures</NavLink>
            <NavLink href="/trading/options">Options</NavLink>
          </div>
        </NavItem>

        <NavItem href="/learn" label="Learn">
          <div className="grid grid-cols-1 gap-4 p-4 w-[250px]">
            <NavLink href="/learn/basics">Trading Basics</NavLink>
            <NavLink href="/learn/technical">Technical Analysis</NavLink>
            <NavLink href="/learn/fundamental">Fundamental Analysis</NavLink>
            <NavLink href="/learn/strategies">Trading Strategies</NavLink>
          </div>
        </NavItem>

        <SimpleNavLink href="/about">About</SimpleNavLink>

       
      </NavigationMenuPrimitive.List>
    </NavigationMenuPrimitive.Root>
  );
};

const NavItem: React.FC<{
  href: string;
  label: string;
  children: React.ReactNode;
}> = ({ href, label, children }) => (
  <NavigationMenuPrimitive.Item>
    <NavigationMenuPrimitive.Trigger className="group flex items-center gap-1 text-gray-100 hover:text-white transition-colors">
      {label}
      <ChevronDown
        className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
    <NavigationMenuPrimitive.Content className="absolute top-full mt-2">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="bg-white/10 backdrop-blur-xl rounded-lg shadow-lg"
      >
        {children}
      </motion.div>
    </NavigationMenuPrimitive.Content>
  </NavigationMenuPrimitive.Item>
);

const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
}> = ({ href, children }) => (
  <a
    href={href}
    className="block p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
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