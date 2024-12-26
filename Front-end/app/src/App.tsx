import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Security from './components/Security/Security';
import DynamicBackground from './components/background/DynamicBackground';
import TransactionPage from './components/pages/TransactionPage';
import PortfolioDashboard from './components/portfolio/PortfolioDashboard';
import StockForm from './components/portfolio/StockForm';
import { QueryClient } from '@tanstack/react-query';
import AllStocks from './components/pages/AllStocks';
import BuyStocks from './components/pages/BuyStocks';
import Commodities from './components/pages/Commodities';
import SellStocks from './components/pages/SellStocks';

const backgroundSections = [
  {
    type: 'image',
    content: {
      src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    },
    effects: {
      gradient: {
        colors: ['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)'],
        opacity: 0.8,
      },
      overlay: {
        type: 'grid',
        opacity: 0.1,
      },
      particles: true,
    },
  },
];

// Component for managing scroll on route changes
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      {/* Scroll to top on route change */}
      <ScrollToTop />

      <DynamicBackground sections={backgroundSections} currentSection={0} />

      <Routes>
        <Route
          path="/"
          element={
            <AppLayout>
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
            </AppLayout>
          }
        />

        <Route path="/:type/:symbol" element={<TransactionPage />} />

        <Route path="/portfolio" element={<PortfolioDashboard />} />
        <Route path="/portfolio/add" element={<StockForm />} />
        <Route path="/portfolio/edit/:id" element={<StockForm />} />
        <Route path="/stock/all" element={<AllStocks />} />
        <Route path="/stock/buy" element={<BuyStocks />} />
        <Route path="/stock/forex" element={<SellStocks />} />
        <Route path="/markets/commodities" element={<Commodities />} />
      </Routes>
    </Router>
  );
}

export default App;
