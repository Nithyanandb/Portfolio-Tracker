import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const OAuthCallback = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const error = params.get('error');

      if (token) {
        try {
          // Get user data from URL parameters
          const userData = {
            email: params.get('email') || '',
            name: params.get('name') || '',
            provider: params.get('provider') || '',
            roles: params.get('roles')?.split(',') || [],
            emailVerified: params.get('emailVerified') === 'true'
          };

          // Store auth data in localStorage
          const authData = {
            token,
            user: userData,
            expiresAt: new Date().getTime() + (3600 * 1000) // 1 hour
          };
          
          localStorage.setItem('auth', JSON.stringify(authData));

          // Update context
          setToken(token);
          setUser(userData);

          // Handle window closing/redirect
          if (window.opener) {
            window.opener.postMessage({
              type: 'AUTH_SUCCESS',
              data: authData
            }, window.location.origin);
            window.close();
          } else {
            navigate('/dashboard');
          }
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
          handleError(errorMessage);
        }
      } else if (error) {
        handleError(params.get('message') || 'Authentication failed');
      }
    };

    const handleError = (errorMessage: string) => {
      if (window.opener) {
        window.opener.postMessage({
          type: 'AUTH_ERROR',
          error: errorMessage
        }, window.location.origin);
        window.close();
      } else {
        navigate(`/login?error=${encodeURIComponent(errorMessage)}`);
      }
    };

    handleCallback();
  }, [navigate, setUser, setToken]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white">Processing authentication...</h3>
        <p className="text-gray-400 mt-2">Please wait while we complete the process...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;