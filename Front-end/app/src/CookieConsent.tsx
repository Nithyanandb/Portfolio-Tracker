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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white/90 backdrop-blur-md border border-white/[0.1] rounded-lg shadow-lg p-8 max-w-[500px] w-full mx-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-bold text-black text-center">
            This website uses cookies to improve your experience. By continuing to browse, you agree to our use of cookies.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-[13px] text-blue-900 hover:text-blue-700 transition-colors">
              Learn More
            </a>
            <button
              onClick={handleAccept}
              className="text-[13px] font-medium bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
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