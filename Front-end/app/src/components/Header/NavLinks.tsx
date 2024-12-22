import React from 'react';

const navItems = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Market Insights', href: '#market-insights' },
  { label: 'Buy/Sell Stocks', href: '#buy-sell' },
  { label: 'Funds Transfer', href: '#funds-transfer' },
  { label: 'Account Settings', href: '#account-settings' },
  { label: 'Zerodha', href: 'https://www.zerodha.com', external: true },  // Link to Zerodha
  { label: 'CRED', href: 'https://www.cred.club', external: true },  // Link to CRED
];

const NavLinks = ({ className = '' }) => (
  <nav className={className}>
    <ul className="flex space-x-8">
      {navItems.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            className="text-gray-300 hover:text-white transition-colors duration-200 text-sm uppercase tracking-wider"
            target={item.external ? '_blank' : '_self'}  // Open external links in a new tab
            rel={item.external ? 'noopener noreferrer' : ''}  // Security for external links
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default NavLinks;
