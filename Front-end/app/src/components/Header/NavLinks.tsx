  import React from 'react';

  const navItems = [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Market Insights', href: '#market-insights' },
    { label: 'Buy/Sell Stocks', href: '#buy-sell' },
    { label: 'Funds Transfer', href: '#funds-transfer' },
    { label: 'Account Settings', href: '#account-settings' },
    { label: 'Zerodha', href: 'https://www.zerodha.com', external: true },
    { label: 'CRED', href: 'https://www.cred.club', external: true },
  ];

  const NavLinks = ({ className = '' }) => (
    <nav className={`${className} bg-gray-800 p-4`}>
      <ul className="flex justify-center items-center space-x-6">
        {navItems.map((item) => (
          <li key={item.href} className="list-none">
            <a
              href={item.href}
              className="text-gray-300 hover:text-white transition-colors duration-200 text-sm uppercase tracking-wide"
              target={item.external ? '_blank' : '_self'}
              rel={item.external ? 'noopener noreferrer' : ''}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  export default NavLinks;
