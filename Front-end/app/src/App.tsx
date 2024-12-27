import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

  return (
    <Router>
      <ScrollToTop onSectionChange={setCurrentSection} />
      
      <DynamicBackground 
        currentSection={currentSection}
      />

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
        <Route path="/stock/sell" element={<SellStocks />} />
      </Routes>
    </Router>
  );
}

export default App;