import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import AuthForm from '../Auth/AuthForm';
import SocialAuth from '../Auth/SocialAuth';
import LoadingOverlay from '../Auth/LoadingOverlay';
import { useAuth } from '../hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, type = 'login' }) => {
  const [authType, setAuthType] = React.useState(type);
  const { isAuthenticating } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray bg-opacity-50 flex items-center text-black justify-center z-50 p-1 w-full"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center text-black bg-black/50 backdrop-blur-sm"
          >
            {/* Close Button */}
            {/* <button
              onClick={onClose} // Close the modal when clicked
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={30} />
            </button> */}

            {/* Modal Content */}
            <div className="p-8 bg-blue rounded-lg shadow-xl" style={{ width: '400px' }}>
              <h2 className="text-2xl font-bold mb-6 text-center">
                {authType === 'login' ? 'Sign In' : 'Create Account'}
              </h2>

              <AuthForm
                authType={authType}
                onSuccess={onClose} 
              />

              <p className="mt-6 text-center text-sm text-gray-600">
                {authType === 'login' ? (
                  <>
                    Don't have an account?{' '}
                    <button
                      onClick={() => setAuthType('register')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      onClick={() => setAuthType('login')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>

              <SocialAuth />
            </div>
          </motion.div>
        </motion.div>
      )}

      {isAuthenticating && <LoadingOverlay />}
    </AnimatePresence>
  );
};

export default AuthModal;