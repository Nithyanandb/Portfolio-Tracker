import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-white/40 backdrop-blur-md border-t border-white/[0.1] px-8 py-4">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-bold text-black text-center md:text-left">
            This website uses cookies to improve your experience. By continuing to browse, you agree to our use of cookies.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-[13px] text-blue-900 hover:text-white transition-colors">
              Learn More
            </a>
            <button
              onClick={handleAccept}
              className="text-[13px] font-medium bg-white text-black px-6 py-1 rounded hover:bg-white/90 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;