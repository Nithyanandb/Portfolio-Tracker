  import React, { useState } from 'react';
  import { X } from 'lucide-react';
  import { AuthForm } from './AuthForm';
  import { SocialAuth } from './SocialAuth';
  import { AnimatePresence, motion } from 'framer-motion';
  import LoadingOverlay from './LoadingOverlay';

  interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

  export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [isAuthenticating, setIsAuthenticating] = useState(false); // Define authentication state

    if (!isOpen) return null;

    const handleClose = () => {
      onClose();
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-1 w-full"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-lg p-8 max-w-md w-full z-10"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
              >
                <X onClick={handleClose} className="h-6 w-6" />
              </button>

              {/* Title */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-center">
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                </h2>
              </div>

              {/* Authentication Form */}
              <AuthForm mode={mode} onSuccess={handleClose} />

              {/* Divider and Social Auth */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <SocialAuth />
                </div>
              </div>

              {/* Mode Toggle */}
              <div className="mt-6 text-center text-sm">
                <span className="text-gray-600">
                  {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                </span>
                <button
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {isAuthenticating && <LoadingOverlay />} {/* Show the loading overlay while authenticating */}
      </AnimatePresence>
    );
  };

  export default AuthModal;
