import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './components/Auth/AuthContext';
import { MarketProvider } from './context/MarketContext';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Toaster } from 'react-hot-toast';

// Page Components
import AppLayout from './components/Layout/AppLayout';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Security from './components/Security/Security';
import TransactionPage from './components/pages/TransactionPage';
import PortfolioDashboard from './components/portfolio/PortfolioDashboard';
import AllStocks from './components/pages/AllStocks';
import SellStocks from './components/pages/SellStocks';
import BuyStocks from './components/BuyStocks/BuyStocks';
import StockForm from './components/portfolio/StockForm';
import OAuthCallback from './components/Auth/OAuthCallback';
import NotFound from './components/ErrorBoundary/NotFound';

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Create router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout d={undefined} children={undefined}>
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
  { path: "/auth/callback", element: <OAuthCallback /> },
  { path: "/:type/:symbol", element: <TransactionPage /> },
  { path: "/portfolio", element: <PortfolioDashboard /> },
  { path: "/portfolio/add", element: <StockForm /> },
  { path: "/portfolio/edit/:id", element: <StockForm /> },
  { path: "/stock/all", element: <AllStocks /> },
  { path: "/stock/buy", element: <BuyStocks /> },
  { path: "/stock/sell", element: <SellStocks /> },
  { path: "*", element: <NotFound /> }
]);

// Main App component with providers
function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MarketProvider>
            <>
              <Toaster />
              <RouterProvider router={router} />
            </>
          </MarketProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;