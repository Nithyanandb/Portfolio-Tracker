import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

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
          const authData = {
            type: 'AUTH_SUCCESS',
            data: {
              token,
              email: params.get('email'),
              name: params.get('name'),
              provider: params.get('provider'),
              roles: params.get('roles')?.split(',') || []
            }
          };

          if (window.opener) {
            // Send message to parent window
            window.opener.postMessage(authData, window.location.origin);
            // Close popup after a short delay to ensure message is sent
            setTimeout(() => window.close(), 100);
          } else {
            // If no opener, handle the auth directly
            handleOAuthCallback(authData);
            navigate('/');
          }
        } else {
          throw new Error(params.get('message') || 'Authentication failed');
        }
      } catch (error) {
        const errorData = {
          type: 'AUTH_ERROR',
          error: error instanceof Error ? error.message : 'Authentication failed'
        };

        if (window.opener) {
          window.opener.postMessage(errorData, window.location.origin);
          setTimeout(() => window.close(), 100);
        } else {
          navigate('/login');
        }
      }
    };

    processAuth();
  }, [navigate, handleOAuthCallback]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/95">
      <div className="text-center space-y-6">
        <motion.div
          animate={{ 
            rotate: 360,
            transition: { duration: 1, repeat: Infinity, ease: "linear" }
          }}
          className="w-16 h-16 border-t-2 border-blue-500 rounded-full mx-auto"
        />
        <div className="space-y-2">
          <h3 className="text-2xl font-medium text-white">Authenticating...</h3>
          <p className="text-white/60">Please wait while we complete the process</p>
        </div>
      </div>
    </div>
  );
};

export default OAuthCallback; 