import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <div className='er' style={{ padding: '0px 40px' }}>
      <Navbar expand="sm">
        <Navbar.Brand href="/" className="navbar-brand">Zerodha</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/portfolio" className="nav-link">
              Portfolio
            </Link>
            <Link to="/stocks" className="nav-link">
              Stocks
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </Nav>
          <Nav className="ml-auto">
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationBar;