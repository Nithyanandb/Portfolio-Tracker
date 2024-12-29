import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
            email: params.get('email') || '',
            name: params.get('name') || '',
            provider: params.get('provider') || '',
            roles: params.get('roles')?.split(',') || []
          }
        };

        if (!userData.user.email || !userData.user.name) {
          throw new Error('Missing required user data');
        }

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
        window.opener?.postMessage(
          { type: 'AUTH_ERROR', error: 'Authentication failed' },
          window.location.origin
        );
        window.close();
      }
    }
  }, [navigate, handleOAuthCallback]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Same loading animation as AuthModal */}
      </div>
    </div>
  );
};

export default AuthWindow;