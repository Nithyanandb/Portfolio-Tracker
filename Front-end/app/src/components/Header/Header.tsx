import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { navItems } from '@/constants/navigation';
import Logo from './Logo';

const Header = () => {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3" fixed="top">
      <Container>
        <Navbar.Brand href="#home">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {navItems.map((item) => (
              <Nav.Link 
                key={item.href} 
                href={item.href}
                className="text-secondary px-3"
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;