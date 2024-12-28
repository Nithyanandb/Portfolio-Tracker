import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const AuthWindow = () => {
  const navigate = useNavigate();
  const { handleOAuthCallback } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const auth_success = params.get('auth_success') === 'true';

    if (auth_success && token) {
      try {
        const userData = {
          token,
          user: {
            email: params.get('email'),
            name: params.get('name'),
            provider: params.get('provider'),
            roles: params.get('roles')?.split(',') || []
          }
        };

        // Store auth data
        localStorage.setItem('auth', JSON.stringify(userData));

        if (window.opener) {
          window.opener.postMessage({
            type: 'AUTH_SUCCESS',
            data: userData
          }, window.location.origin);
          setTimeout(() => window.close(), 100);
        } else {
          handleOAuthCallback(userData);
          navigate('/');
        }
      } catch (error) {
        console.error('Auth window error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
        window.opener?.postMessage(
          { type: 'AUTH_ERROR', error: errorMessage },
          window.location.origin
        );
        window.close();
      }
    }
  }, [navigate, handleOAuthCallback]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-white mx-auto mb-4" />
        <h2 className="text-xl text-white font-light tracking-wider">Processing login...</h2>
      </div>
    </div>
  );
};

export default AuthWindow;