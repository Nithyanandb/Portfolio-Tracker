import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

interface AppLayoutProps {d
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <main className="relative">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;