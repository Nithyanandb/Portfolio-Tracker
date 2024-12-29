import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, X as CloseIcon } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../../utils/cn';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { login, register, loginWithGoogle, loginWithGithub, isAuthenticating, setIsAuthenticating } = useAuth();

  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setEmail('');
      setPassword('');
      setName('');
      setSuccess(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [success, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (authMode === 'login') {
        await login({ email, password });
      } else {
        await register({ email, password, name });
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    // Set loading state
    setIsAuthenticating(true);
    
    // Create window event listener before opening popup
    const handleAuthMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'AUTH_SUCCESS') {
        handleOAuthCallback(event.data.data);
        setSuccess(true);
        window.removeEventListener('message', handleAuthMessage);
      } else if (event.data.type === 'AUTH_ERROR') {
        setError(event.data.error);
        setIsAuthenticating(false);
        window.removeEventListener('message', handleAuthMessage);
      }
    };

    window.addEventListener('message', handleAuthMessage);

    // Open OAuth popup
    if (provider === 'google') {
      loginWithGoogle();
    } else if (provider === 'github') {
      loginWithGithub();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Enhanced Backdrop */}
          <div className="absolute inset-0">
            {/* Premium Dark Glass Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 backdrop-blur-2xl" />
            
            {/* Refined Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.05]" 
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px'
              }}
            />
            
            {/* Premium Glow Effects */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-30 blur-3xl" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
            </div>
          </div>

          {/* Content Container */}
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-lg mx-auto"
          >
            {(isAuthenticating || success) ? (
              <LoadingOrSuccessState 
                isAuthenticating={isAuthenticating} 
                success={success} 
              />
            ) : (
              <AuthForm
                authMode={authMode}
                error={error}
                isLoading={isLoading}
                onClose={onClose}
                handleSubmit={handleSubmit}
                handleOAuthLogin={handleOAuthLogin}
                setAuthMode={setAuthMode}
                // ... other props
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// New component for Loading/Success state
const LoadingOrSuccessState: React.FC<{ isAuthenticating: boolean; success: boolean }> = ({ 
  isAuthenticating, 
  success 
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="text-center space-y-8"
  >
    {/* Enhanced Loading Animation */}
    <div className="relative mx-auto w-32 h-32">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-t-2 border-r-2 border-blue-500/30"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full border-t-2 border-l-2 border-purple-500/30"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-8 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm"
      />
    </div>
    
    {/* Enhanced Status Text */}
    <div className="space-y-2">
      <h3 className="text-2xl font-light tracking-wider text-white">
        {success ? 'Authentication Successful' : 'Verifying Credentials'}
      </h3>
      <p className="text-sm text-white/60 tracking-wide font-light">
        {success ? 'Redirecting you securely...' : 'Establishing secure connection...'}
      </p>
    </div>
  </motion.div>
);

// New component for Auth Form
const AuthForm: React.FC<AuthFormProps> = ({
  authMode,
  error,
  isLoading,
  onClose,
  handleSubmit,
  handleOAuthLogin,
  setAuthMode,
  // ... other props
}) => (
  <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] rounded-2xl backdrop-blur-xl p-8">
    {/* Close Button */}
    <motion.button
      whileHover={{ scale: 1.1, rotate: 90 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClose}
      className="absolute -right-3 -top-3 p-2 bg-white/10 rounded-full backdrop-blur-md 
                 hover:bg-white/20 transition-colors"
    >
      <CloseIcon className="w-5 h-5 text-white/80" />
    </motion.button>

    {/* Form Content */}
    <div className="space-y-6">
      {/* Title Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="space-y-2 text-center"
      >
        <h2 className="text-3xl font-light text-white tracking-tight">
          {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-white/60 font-light">
          {authMode === 'login' 
            ? 'Sign in to continue to your account' 
            : 'Create an account to get started'}
        </p>
      </motion.div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ... form fields with enhanced styling ... */}
      </form>

      {/* OAuth Section */}
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-transparent text-white/60 tracking-wider">
              Or continue with
            </span>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-4">
          {/* ... OAuth buttons with enhanced styling ... */}
        </div>
      </div>

      {/* Mode Toggle */}
      <motion.button
        type="button"
        onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
        className="w-full text-center text-sm text-white/60 hover:text-white 
                   tracking-wider transition-colors"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {authMode === 'login' 
          ? "Don't have an account? Sign up" 
          : "Already have an account? Sign in"}
      </motion.button>
    </div>
  </div>
);

export default AuthModal;
