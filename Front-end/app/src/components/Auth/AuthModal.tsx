import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, X as CloseIcon } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { 
    login, 
    register, 
    loginWithGoogle, 
    loginWithGithub, 
    isLoading, 
    isAuthenticating,
    error,
    setError 
  } = useAuth();

  // Reset error when changing auth mode
  useEffect(() => {
    setError(null);
  }, [authMode, setError]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setShowSuccess(false);
      setError(null);
    }
  }, [isOpen, setError]);

  const handleSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onClose();
      // Use window.location.href instead of reload for better UX
      window.location.href = '/dashboard';
    }, 2000);
  };

  const handleTraditionalAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      if (authMode === 'login') {
        await login(email, password);
      } else {
        await register(email, password);
      }
      handleSuccess();
    } catch (error: any) {
      // Error is handled by context, but we can add additional handling here
      console.error('Auth error:', error);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    try {
      if (provider === 'google') {
        await loginWithGoogle();
      } else {
        await loginWithGithub();
      }
    } catch (error: any) {
      console.error(`${provider} login error:`, error);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-gray-900 rounded-xl w-full max-w-md p-6 relative"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>

          {/* Success State */}
          {showSuccess && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CheckIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {authMode === 'login' ? 'Welcome Back!' : 'Account Created!'}
              </h3>
              <p className="text-gray-400">Successfully authenticated</p>
            </motion.div>
          )}

          {/* Loading State */}
          {isAuthenticating && !showSuccess && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Authenticating...
              </h3>
              <p className="text-gray-400">Please wait while we verify your credentials</p>
            </div>
          )}

          {/* Form State */}
          {!isAuthenticating && !showSuccess && (
            <>
              <h2 className="text-2xl font-semibold text-white mb-6">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500"
                >
                  {error}
                </motion.div>
              )}

              {/* Auth Form */}
              <form onSubmit={handleTraditionalAuth} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || isAuthenticating}
                  className={cn(
                    "w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-3 font-medium transition-colors",
                    (isLoading || isAuthenticating) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Please wait...
                    </span>
                  ) : (
                    authMode === 'login' ? 'Sign In' : 'Create Account'
                  )}
                </button>
              </form>

              {/* OAuth Buttons */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-800"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleOAuthLogin('google')}
                    disabled={isLoading || isAuthenticating}
                    className="flex items-center justify-center px-4 py-3 border border-gray-800 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <img src="/google.svg" alt="Google" className="w-5 h-5" />
                    <span className="ml-2 text-white">Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOAuthLogin('github')}
                    disabled={isLoading || isAuthenticating}
                    className="flex items-center justify-center px-4 py-3 border border-gray-800 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <img src="/github.svg" alt="GitHub" className="w-5 h-5" />
                    <span className="ml-2 text-white">GitHub</span>
                  </button>
                </div>
              </div>

              {/* Toggle Auth Mode */}
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-blue-500 hover:text-blue-400 text-sm"
                >
                  {authMode === 'login' 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
