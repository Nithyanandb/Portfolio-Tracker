import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const OAuthCallback = () => {
  const { handleAuthCallback } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const error = params.get('error');

    if (token) {
      // Store the token and user info
      const email = params.get('email');
      const name = params.get('name');
      const provider = params.get('provider');
      const roles = params.get('roles')?.split(',') || [];
      const auth_success = params.get('auth_success') === 'true';

      if (auth_success) {
        localStorage.setItem('auth', JSON.stringify({
          token,
          user: { email, name, roles, provider },
          expiresAt: new Date().getTime() + (3600 * 1000) // 1 hour
        }));
        
        // Close popup and redirect if in popup
        if (window.opener) {
          window.opener.postMessage({ type: 'AUTH_SUCCESS' }, window.origin);
          window.close();
        } else {
          navigate('/dashboard');
        }
      }
    } else if (error) {
      const errorMessage = params.get('message');
      if (window.opener) {
        window.opener.postMessage({ 
          type: 'AUTH_ERROR', 
          error: errorMessage 
        }, window.origin);
        window.close();
      } else {
        navigate('/login?error=' + encodeURIComponent(errorMessage || 'Authentication failed'));
      }
    }
  }, [handleAuthCallback, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white">Processing authentication...</h3>
      </div>
    </div>
  );
};

export default OAuthCallback;