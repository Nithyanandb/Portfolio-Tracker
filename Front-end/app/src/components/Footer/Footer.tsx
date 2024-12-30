import React from 'react';

const Footer = () => (
  <footer className="relative bg-black pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-6">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <img src="/capx-logo.svg" alt="CapX" className="h-8 w-auto" />
          <p className="text-gray-400 text-sm leading-relaxed font-light">
            Your trusted partner in the world of finance. Experience the future of trading with CapX.
          </p>
        </div>

        {[
          {
            title: "Products",
            links: ["Trading Platform", "Investment Services", "Market Research", "Portfolio Analytics", "AI Insights"]
          },
          {
            title: "Resources",
            links: ["About Us", "Careers", "Blog", "Press", "Contact"]
          },
          {
            title: "Connect",
            links: ["Help & Support", "Privacy Policy", "Terms & Conditions", "Security", "Accessibility"]
          }
        ].map((section, index) => (
          <div key={section.title} className="space-y-6">
            <h4 className="text-sm font-medium text-white tracking-wide">
              {section.title}
            </h4>
            <ul className="space-y-4">
              {section.links.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 font-light"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400 font-light">
            &copy; 2024 CapX. All rights reserved.
          </p>
          
          {/* Legal Links */}
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use", "Legal", "Site Map"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200 font-light"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Country Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 font-light">United States</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
