import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

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
            roles: params.get('roles')?.split(',') || [],
            avatar: params.get('avatar') || ''
          }
        };

        if (!userData.user.email || !userData.user.name) {
          throw new Error('Missing required user data');
        }

        // Store auth data
        localStorage.setItem('auth', JSON.stringify(userData));

        // Handle popup window scenario
        if (window.opener) {
          window.opener.postMessage({
            type: 'AUTH_SUCCESS',
            data: userData
          }, window.location.origin);
          setTimeout(() => window.close(), 500); // Increased timeout for smooth transition
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="mx-auto"
        >
          <Loader className="w-8 h-8 text-blue-500" />
        </motion.div>
        <h2 className="text-xl font-medium text-white">Completing Authentication</h2>
        <p className="text-sm text-white/60">Please wait while we secure your session...</p>
      </motion.div>
    </div>
  );
};

export default AuthWindow;