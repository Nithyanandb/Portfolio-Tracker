import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const AuthWindow = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');

    if (token && userId) {
      // Store the authentication data
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      
      // Close the window and redirect to portfolio
      window.opener?.postMessage({ type: 'AUTH_SUCCESS' }, '*');
      window.close();
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 shadow-xl text-center">
        <Loader2 className="w-12 h-12 animate-spin text-white mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-white mb-2">Authenticating...</h2>
        <p className="text-white/80">Please wait while we complete your sign-in</p>
      </div>
    </div>
  );
};

export default AuthWindow;