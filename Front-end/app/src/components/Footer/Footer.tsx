import React from 'react';

const Footer = () => (
  <footer className="bg-black text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <img src="/capx-logo.svg" alt="Company Logo" className="h-8 w-auto mb-6" />CapX
          <p className="text-gray-400">
            Your trusted partner in the world of finance.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Products</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Trading Platform</li>
            <li>Investment Services</li>
            <li>Market Research</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-gray-400">
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Help & Support</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
        <p>&copy; 2024 CapX. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;