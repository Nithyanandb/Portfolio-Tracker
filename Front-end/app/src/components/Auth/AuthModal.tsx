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
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Enhanced Background */}
          <div className="absolute inset-0">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-95" />
            
            {/* Tesla-style Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-5" 
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}
            />
            
            {/* Radial Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-30" />
          </div>

          {/* Loading/Success State */}
          {(isAuthenticating || success) ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 text-center space-y-8"
            >
              {/* Enhanced Loading Animation */}
              <div className="relative mx-auto w-32 h-32">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-t-2 border-r-2 border-blue-500/30"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
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
              
              {/* Enhanced Loading Text */}
              <div className="space-y-2">
                <h3 className="text-2xl font-light tracking-wider text-white">
                  {success ? 'Authentication Successful' : 'Verifying Credentials'}
                </h3>
                <p className="text-sm text-white/60 tracking-wide font-light">
                  {success ? 'Redirecting you securely...' : 'Establishing secure connection...'}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className={cn(
                "relative z-0 w-full max-w-md rounded-2xl overflow-hidden",
                "bg-gradient-to-b from-white/10 to-white/5",
                "backdrop-blur-xl border border-white/10",
                "p-8 shadow-2xl"
              )}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute right-4 top-4 text-white/50 hover:text-white transition-colors"
              >
                <CloseIcon className="w-6 h-6" />
              </motion.button>

              {/* Form Content */}
              <div className="space-y-6">
                {/* Enhanced Title Animation */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="space-y-2"
                >
                  <h2 className="text-3xl font-medium text-white tracking-tight">
                    {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  <p className="text-white/60">
                    {authMode === 'login' 
                      ? 'Sign in to continue to your account' 
                      : 'Create an account to get started'}
                  </p>
                </motion.div>

                {/* Error/Success Messages */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/20"
                  >
                    <p className="text-sm text-red-400">{error}</p>
                  </motion.div>
                )}

                {/* Enhanced Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {authMode === 'register' && (
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg",
                          "bg-white/5 border border-white/10",
                          "text-white placeholder-white/40",
                          "focus:outline-none focus:border-blue-500/50",
                          "transition-colors duration-200"
                        )}
                      />
                    </div>
                  )}
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg",
                        "bg-white/5 border border-white/10",
                        "text-white placeholder-white/40",
                        "focus:outline-none focus:border-blue-500/50",
                        "transition-colors duration-200"
                      )}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg",
                        "bg-white/5 border border-white/10",
                        "text-white placeholder-white/40",
                        "focus:outline-none focus:border-blue-500/50",
                        "transition-colors duration-200"
                      )}
                    />
                  </div>

                  {/* Enhanced Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={cn(
                      "w-full relative group",
                      "bg-gradient-to-r from-blue-600 to-blue-700",
                      "hover:from-blue-500 hover:to-blue-600",
                      "text-white py-3 rounded-lg font-medium",
                      "transition-all duration-200 ease-in-out",
                      "shadow-lg shadow-blue-500/25",
                      "overflow-hidden"
                    )}
                  >
                    {/* Button Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    
                    {/* Button Content */}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <motion.div 
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Processing...
                        </>
                      ) : (
                        authMode === 'login' ? 'Sign In' : 'Create Account'
                      )}
                    </span>
                  </motion.button>
                </form>

                {/* Enhanced OAuth Section */}
                <div className="mt-8 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOAuthLogin('google')}
                      disabled={isAuthenticating}
                      className={cn(
                        "flex items-center justify-center gap-3 px-4 py-3",
                        "bg-white/5 hover:bg-white/10 transition-all duration-200",
                        "rounded-lg border border-white/10 group",
                        isAuthenticating && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <FcGoogle className="h-5 w-5" />
                      <span className="text-white font-medium group-hover:translate-x-0.5 transition-transform">
                        Google
                      </span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOAuthLogin('github')}
                      disabled={isAuthenticating}
                      className={cn(
                        "flex items-center justify-center gap-3 px-4 py-3",
                        "bg-white/5 hover:bg-white/10 transition-all duration-200",
                        "rounded-lg border border-white/10 group",
                        isAuthenticating && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <FaGithub className="h-5 w-5" />
                      <span className="text-white font-medium group-hover:translate-x-0.5 transition-transform">
                        GitHub
                      </span>
                    </motion.button>
                  </div>
                </div>

                {/* Enhanced Mode Toggle */}
                <motion.button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="w-full text-center text-sm text-white/60 hover:text-white mt-6 transition-all duration-200"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {authMode === 'login' 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"}
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
