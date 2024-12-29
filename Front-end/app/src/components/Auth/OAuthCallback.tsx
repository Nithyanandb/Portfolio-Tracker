import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

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
          const userData = {
            token,
            user: {
              email: params.get('email') || '',
              name: params.get('name') || '',
              provider: params.get('provider') || '',
              roles: params.get('roles')?.split(',') || [],
              avatar: params.get('avatar') || ''
            }
          };

          if (!userData.user.email || !userData.user.name) {
            throw new Error('Missing required user data');
          }

          // Handle popup window scenario
          if (window.opener) {
            window.opener.postMessage({
              type: 'AUTH_SUCCESS',
              data: userData
            }, window.location.origin);
            setTimeout(() => window.close(), 500);
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
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader className="w-8 h-8 text-blue-500" />
        </motion.div>
        <h3 className="text-xl font-medium text-white">Finalizing Authentication</h3>
        <p className="text-white/60">Almost there! Setting up your secure session...</p>
      </motion.div>
    </div>
  );
};

export default OAuthCallback;