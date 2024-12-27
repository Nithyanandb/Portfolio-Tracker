import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const OAuthCallback = () => {
  const { handleAuthCallback } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const processAuth = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const error = params.get('error');
        const auth_success = params.get('auth_success') === 'true';

        if (auth_success && token) {
          const authData = {
            token,
            email: params.get('email') || '',
            name: params.get('name') || '',
            provider: params.get('provider') as 'GOOGLE' | 'GITHUB',
            roles: params.get('roles')?.split(',') || []
          };

          // Store auth data
          localStorage.setItem('auth', JSON.stringify({
            token: authData.token,
            user: {
              email: authData.email,
              name: authData.name,
              roles: authData.roles,
              provider: authData.provider
            },
            expiresAt: new Date().getTime() + (3600 * 1000)
          }));

          // Handle popup vs direct navigation
          if (window.opener) {
            window.opener.postMessage({
              type: 'AUTH_SUCCESS',
              data: authData
            }, window.location.origin);
            window.close();
          } else {
            navigate('/');
          }
        } else if (error) {
          const errorMessage = params.get('message') || 'Authentication failed';
          throw new Error(errorMessage);
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
  }, [handleAuthCallback, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white">Processing authentication...</h3>
        <p className="text-gray-400 mt-2">Please wait while we complete your sign-in</p>
      </div>
    </div>
  );
};

export default OAuthCallback; 