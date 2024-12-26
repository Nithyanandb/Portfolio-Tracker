import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Security from './components/Security/Security';
import DynamicBackground from './components/background/DynamicBackground';
import TransactionPage from '../src/components/Stock/TransactionPage';
import PortfolioDashboard from './components/portfolio/PortfolioDashboard';
import StockForm from './components/portfolio/StockForm';

const backgroundSections = [
  {
    type: 'image',
    content: {
      src: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?auto=format&fit=crop&w=1920',
    },
    effects: {
      gradient: {
        colors: ['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)'],
        opacity: 0.8
      },
      overlay: {
        type: 'grid',
        opacity: 0.1
      },
      particles: true
    }
  }
];

function App() {
  return (
    <Router>
           <DynamicBackground sections={backgroundSections} currentSection={0} />
       
      <Routes>
        <Route path="/" element={
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
        } />

        <Route path="/:type/:symbol" element={<TransactionPage />} />
       
        <Route path="/portfolio" element={<PortfolioDashboard />} />
        <Route path="/portfolio/add" element={<StockForm />} />
        <Route path="/portfolio/edit/:id" element={<StockForm />} />
      </Routes>

    </Router>
  );
}



export default App;
