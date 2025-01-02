import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  active?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, icon: Icon, children, active }) => {
  return (
    <a
      href={href}
      className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
        active
          ? 'text-blue-600 bg-blue-50'
          : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {children}
    </a>
  );
};