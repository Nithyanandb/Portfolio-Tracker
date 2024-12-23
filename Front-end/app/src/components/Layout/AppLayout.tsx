import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;