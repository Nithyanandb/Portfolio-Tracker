import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './components/Auth/AuthContext';
import { MarketProvider } from './context/MarketContext';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import DynamicBackground from './components/background/DynamicBackground';

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
import CookieConsent from './CookieConsent';
import { FundamentalAnalysisPage, LearnPage, TechnicalAnalysisPage, TradingStrategiesPage } from './components/Header/Navigation/Learn';
import FuturesTrading from './components/Header/Navigation/FuturesTrading';
import MarginTrading from './components/Header/Navigation/MarginTrading';
import SpotTrading from './components/Header/Navigation/SpotTrading';
import OptionsTrading from './components/Header/Navigation/trading/OptionsTrading';

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Enhanced background configuration
const backgroundSections = [
  {
    type: 'gradient',
    content: {
      colors: ['rgba(0,0,0,0.95)', 'rgba(17,24,39,0.95)'],
    },
    effects: {
      grid: {
        size: 40,
        opacity: 0.03,
        color: 'rgba(255, 143, 113, 0.5)',
      },
      glowSpots: [
        {
          color: 'rgba(239, 45, 26, 0.15)',
          position: { x: '25%', y: '25%' },
          size: '600px',
        },
        {
          color: 'rgba(255, 143, 113, 0.15)',
          position: { x: '75%', y: '75%' },
          size: '600px',
        },
      ],
      noise: {
        opacity: 0.015,
        blendMode: 'overlay',
      },
    },
  },
];

// Create router configuration with enhanced styling
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout d={undefined}>
        <div className="relative min-h-screen">
          <DynamicBackground sections={backgroundSections} currentSection={0} />
          <div className="relative z-10 overflow-auto custom-scrollbar">
            <div className="space-y-32 pb-32">
              <section className="min-h-screen flex-center transition-all duration-1000">
                <Hero />
              </section>
              <section className="min-h-screen flex-center transition-all duration-1000">
                <Features />
              </section>
              <section className="min-h-screen flex-center transition-all duration-1000">
                <Security />
              </section>
            </div>
          </div>
          
          {/* Premium gradient overlays */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] opacity-70" />
          </div>
        </div>
      </AppLayout>
    ),
  },
  {
    path: "/portfolio",
    element: (
      <AppLayout d={undefined}>
        <div className="relative">
          <DynamicBackground sections={backgroundSections} currentSection={0} />
          <div className="relative z-10">
            <PortfolioDashboard />
          </div>
        </div>
      </AppLayout>
    ),
  },
  { path: "/auth/callback", element: <OAuthCallback /> },
  { path: "/:type/:symbol", element: <TransactionPage /> },
  { path: "/portfolio/add", element: <StockForm /> },
  { path: "/portfolio/edit/:id", element: <StockForm /> },
  { path: "/transaction/all", element: <AllStocks /> },
  { path: "/stock/buy", element: <BuyStocks /> },
  { path: "/stock/sell", element: <SellStocks /> },
  { path: "/learn/basics", element: <LearnPage /> },
  { path: "/learn/strategies", element: <TradingStrategiesPage /> },
  { path: "/learn/technical", element: <TechnicalAnalysisPage /> },
  { path: "/learn/fundamental", element: <FundamentalAnalysisPage /> },
  { path: "/trading/futures", element: <FuturesTrading /> },
  { path: "/trading/margin", element: <MarginTrading /> },
  { path: "/trading/spot", element: <SpotTrading /> },
  { path: "/trading/options", element: <OptionsTrading /> },
  { path: "*", element: <NotFound /> }
]);

// Main App component with enhanced providers and styling
function App() {
  return (
    <ErrorBoundary>
      <CookieConsent/>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MarketProvider>
            <div className="relative min-h-screen bg-black text-white antialiased font-sans">
              <RouterProvider router={router} />
            </div>
          </MarketProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;