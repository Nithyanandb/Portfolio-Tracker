import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Container fluid className="px-0">
          {children}
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;