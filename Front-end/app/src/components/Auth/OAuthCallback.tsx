import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const OAuthCallback = () => {
  const navigate = useNavigate();
  const { handleOAuthCallback } = useAuth();

  useEffect(() => {
    const processAuth = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const auth_success = params.get('auth_success') === 'true';

        if (auth_success && token) {
          // Create user data from URL parameters
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
        } else {
          throw new Error(params.get('message') || 'Authentication failed');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
        if (window.opener) {
          window.opener.postMessage({
            type: 'AUTH_ERROR',
            error: errorMessage
          }, window.location.origin);
          window.close();
        } else {
          navigate(`/login?error=${encodeURIComponent(errorMessage)}`);
        }
      }
    };

    processAuth();
  }, [navigate, handleOAuthCallback]);

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