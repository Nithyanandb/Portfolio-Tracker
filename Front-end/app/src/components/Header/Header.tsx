import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import MobileMenu from './MobileMenu';

const navItems = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Market Insights', href: '#market-insights' },
  { label: 'Buy/Sell Stocks', href: '#buy-sell' },
  { label: 'Funds Transfer', href: '#funds-transfer' },
  { label: 'Account Settings', href: '#account-settings' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3" fixed="top">
      <Container>
        <Navbar.Brand href="/">CapX</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setMenuOpen(!menuOpen)} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {navItems.map((item) => (
              <Nav.Link key={item.href} href={item.href} className="text-secondary px-3">
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
        <MobileMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />
      </Container>
    </Navbar>
  );
};

export default Header;
