import React from 'react';
import AppLayout from './components/Layout/AppLayout';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Security from './components/Security/Security';

function App() {
  console.log('Rendering App component');
  
  return (
    <AppLayout>
        <div className="relative">
          <Hero />
        </div>
        <div className="relative z-10 mt-20">
          <Features />
        </div>
      <Security />
    </AppLayout>
  );
}

export default App;