import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={null} onLogout={function (): void {
        throw new Error('Function not implemented.');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } } onLogin={function (user: unknown): void {
        throw new Error('Function not implemented.');
      } } />
      <main className="relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;