import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Security from './components/Security/Security';
import DynamicBackground from './components/background/DynamicBackground';
import TransactionPage from './components/pages/TransactionPage';
import PortfolioDashboard from './components/portfolio/PortfolioDashboard';
import AllStocks from './components/pages/AllStocks';
import SellStocks from './components/pages/SellStocks';
import BuyStocks from './components/BuyStocks/BuyStocks';
import StockForm from './components/portfolio/StockForm';
import AuthWindow from './components/Auth/AuthWindow';
import { AuthProvider } from './context/AuthContext';
import OAuthCallback from './context/OAuthCallback';
import { ErrorBoundary, RouteErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import NotFound from './components/ErrorBoundary/NotFound';
import { Toaster } from 'react-hot-toast';

const routes = [
  {
    path: '/auth/callback',
    element: <OAuthCallback />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/',
    element: <div>Home Page</div>
  },
  {
    path: '*',
    element: <NotFound />
  }
];
// ScrollToTop component with section detection
const ScrollToTop = ({ onSectionChange }: { onSectionChange: (section: number) => void }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Determine which section is currently in view
      if (scrollPosition < windowHeight * 0.5) {
        onSectionChange(0); // Hero section
      } else if (scrollPosition < windowHeight * 1.5) {
        onSectionChange(1); // Features section
      } else {
        onSectionChange(2); // Security section
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onSectionChange]);

  return null;
};

function App() {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.cssText = `
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    `;
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
      document.body.style.cssText = '';
    };
  }, []);

  // Update your Router setup
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <AppLayout>
          <div className="relative z-10">
            <div className="relative z-10 mt-20">
              <Hero />
            </div>
            <div className="relative z-10 mt-20">
              <Features />
            </div>
            <div className="relative z-10 mt-20">
              <Security />
            </div>
          </div>
        </AppLayout>,
      },
      { path: "/authWindow", element: <AuthWindow /> },
      { path: "/:type/:symbol", element: <TransactionPage /> },
      { path: "/portfolio", element: <PortfolioDashboard /> },
      { path: "/portfolio/add", element: <StockForm /> },
      { path: "/portfolio/edit/:id", element: <StockForm /> },
      { path: "/stock/all", element: <AllStocks /> },
      { path: "/stock/buy", element: <BuyStocks /> },
      { path: "/stock/sell", element: <SellStocks /> },
    ],
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }
    }
  );

  return (
    <>
      <Toaster />
      <ErrorBoundary>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
}

export  default App;