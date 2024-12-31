import * as React from 'react';
import { cn } from '../../utils/cn';

interface NavigationProps {
  className?: string;
}

export const NavigationMenu: React.FC<NavigationProps> = ({ className, children }) => {
  return (
    <nav className={cn('flex items-center space-x-4', className)}>
      {children}
    </nav>
  );
};

export const NavigationMenuItem: React.FC<NavigationProps> = ({ className, children }) => {
  return (
    <div className={cn('relative group', className)}>
      {children}
    </div>
  );
};

export const NavigationMenuTrigger: React.FC<NavigationProps> = ({ className, children }) => {
  return (
    <button className={cn('px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors', className)}>
      {children}
    </button>
  );
};

export const NavigationMenuContent: React.FC<NavigationProps> = ({ className, children }) => {
  return (
    <div className={cn('absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-md rounded-lg border border-gray-800 shadow-xl', className)}>
      {children}
    </div>
  );
}; 