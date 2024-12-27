import React from 'react';

const Footer = () => (
 
    <div className=" text-white-100 py-60  from-black to-white-500 max-w-6xl mx-auto px-6 ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <img src="/capx-logo.svg" alt="Company Logo" className="h-8 w-auto mb-6" />
          <p className="text-white-100">
            Your trusted partner in the world of finance.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Products</h4>
          <ul className="space-y-2 text-white-800">
            <li>Trading Platform</li>
            <li>Investment Services</li>
            <li>Market Research</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-gray-300">
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect</h4>
          <ul className="space-y-2 text-gray-300">
            <li>Help & Support</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-100">
        <p>&copy; 2024 CapX. All rights reserved.</p>
      </div>
    </div>
 
);

export default Footer;
