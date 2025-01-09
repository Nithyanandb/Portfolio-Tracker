import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './components/Auth/AuthContext';
import { MarketProvider } from './context/MarketContext';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { ProtectedRoute } from './components/routes/ProtectedRoute';
import AppLayout from './components/Layout/AppLayout';
import CookieConsent from './CookieConsent';
import {LoadingSpinner} from '../src/components/ui/LoadingSpinner'; // Add a loading spinner component
import { LearnPage, TradingStrategiesPage, TechnicalAnalysisPage, FundamentalAnalysisPage } from './components/Header/Navigation/Learn';
import { PortfolioDashboard } from './components/portfolio/PortfolioDashboard';

// Lazy-loaded page components
const Hero = React.lazy(() => import('./components/Hero/Hero'));
const Features = React.lazy(() => import('./components/Features/Features'));
const Security = React.lazy(() => import('./components/Security/Security'));
const OAuthCallback = React.lazy(() => import('./components/Auth/OAuthCallback'));
const NotFound = React.lazy(() => import('./components/ErrorBoundary/NotFound'));
const FuturesTrading = React.lazy(() => import('./components/Header/Navigation/FuturesTrading'));
const MarginTrading = React.lazy(() => import('./components/Header/Navigation/MarginTrading'));
const SpotTrading = React.lazy(() => import('./components/Header/Navigation/SpotTrading'));
const OptionsTrading = React.lazy(() => import('./components/Header/Navigation/trading/OptionsTrading'));
const BuyStocks = React.lazy(() => import('./components/pages/BuyStocks/BuyStocks'));
const StockMarket = React.lazy(() => import('./components/Stock/StocksPage/StockMarket'));
const About = React.lazy(() => import('./components/Header/About/About'));
const SellStocks = React.lazy(() => import('./components/pages/SellStocks/SellStocks'));

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

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout d={undefined} children={''}>
        <Suspense fallback={<LoadingSpinner />}>
          <div className="relative min-h-screen">
            <div className="relative z-10 overflow-auto custom-scrollbar">
              <div className="space-y-32 pb-32">
                <section className="min-h-screen flex-center transition-all duration-1000">
                  <Hero />
                </section>
                <section className="min-h-screen flex-center transition-all duration-1000">
                  <Features />
                </section>
                <section className="min-h-screen h-[50%] flex-center transition-all duration-1000">
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
        </Suspense>
      </AppLayout>
    ),
  },
  {
    path: '/portfolio',
    element: (
      <ProtectedRoute>
        <AppLayout d={undefined} children={''}>
          <Suspense fallback={<LoadingSpinner />}>
            <div className="relative">
              <div className="relative z-10">
                <PortfolioDashboard />
              </div>
            </div>
          </Suspense>
        </AppLayout>
      </ProtectedRoute>
    ),
  },
  { path: '/auth/callback', element: <OAuthCallback /> },
  {
    path: '/stock/all',
    element: (
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingSpinner />}>
          <StockMarket />
        </Suspense>
      </QueryClientProvider>
    ),
  },
  { path: '/stock/buy', element: <BuyStocks /> },
  { path: '/learn/basics', element: <LearnPage /> },
  { path: '/stock/sell', element: <SellStocks /> },
  { path: '/learn/strategies', element: <TradingStrategiesPage /> },
  { path: '/learn/technical', element: <TechnicalAnalysisPage /> },
  { path: '/learn/fundamental', element: <FundamentalAnalysisPage /> },
  { path: '/trading/futures', element: <FuturesTrading /> },
  { path: '/trading/margin', element: <MarginTrading /> },
  { path: '/about', element: <About /> },
  { path: '/trading/spot', element: <SpotTrading /> },
  { path: '/trading/options', element: <OptionsTrading /> },
  { path: '*', element: <NotFound /> },
]);

// Main App component
function App() {
  return (
    <div className="global-background min-h-screen">
      <ErrorBoundary>
        <CookieConsent />
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
    </div>
  );
}

export default App;