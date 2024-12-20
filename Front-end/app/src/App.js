import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Portfolio from './components/Portfolio';
import Stock from './components/Stock';
import About from './components/About';
import Home from './components/Home';
import Auth from './components/Auth';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;