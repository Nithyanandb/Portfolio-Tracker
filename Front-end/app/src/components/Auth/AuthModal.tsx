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

  // Add message listener for OAuth popup
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'AUTH_SUCCESS') {
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onClose]);

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
    if (provider === 'google') {
      loginWithGoogle();
    } else if (provider === 'github') {
      loginWithGithub();
    }
    // Don't close the modal immediately, wait for auth result
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl">
            <div className="absolute inset-0 opacity-10" 
                 style={{
                   backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                   backgroundSize: '30px 30px'
                 }}
            />
          </div>

          {(isAuthenticating || success) ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 text-center space-y-8"
            >
              <div className="relative mx-auto w-24 h-24">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-t-2 border-blue-500"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-3 rounded-full border-t-2 border-purple-500"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute inset-6 rounded-full bg-blue-500/20"
                />
              </div>
              <div>
                <h3 className="text-2xl font-light tracking-wide text-white">
                  Verifying Credentials
                </h3>
                <p className="mt-2 text-sm text-white/60 tracking-wider">
                  Establishing secure connection...
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className={cn(
                "relative z-0 w-full max-w-md rounded-2xl",
                "bg-white/10 backdrop-blur-xl  p-8",
                (isAuthenticating || success) && "opacity-0 pointer-events-none"
              )}
            >
              <div className="relative">
                <button
                  onClick={onClose}
                  className="absolute -right-2 -top-2 text-white/50 hover:text-white transition-colors"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>

                <motion.h2 
                  initial={{ y: -5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-3xl font-medium text-white mb-2 tracking-tight"
                >
                  {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                </motion.h2>
                
                <motion.p 
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-white/60 mb-8"
                >
                  {authMode === 'login' 
                    ? 'Sign in to continue to your account' 
                    : 'Create an account to get started'}
                </motion.p>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                {success && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-sm flex items-center gap-2"
                  >
                    <CheckIcon className="w-4 h-4" />
                    {authMode === 'login' ? 'Successfully logged in!' : 'Account created successfully!'}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={cn(
                        "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50",
                        "transition-all duration-200 ease-in-out"
                      )}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={cn(
                        "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50",
                        "transition-all duration-200 ease-in-out"
                      )}
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={cn(
                      "w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-lg font-medium",
                      "hover:from-blue-600 hover:to-blue-700 transition-all duration-200",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "shadow-lg shadow-blue-500/25"
                    )}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.div 
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Processing...
                      </span>
                    ) : (
                      authMode === 'login' ? 'Sign In' : 'Create Account'
                    )}
                  </motion.button>
                </form>

                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-[#1d1d1f] text-white/60">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
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
                      <FcGoogle className="h-5 w-5 mr-2" />
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
                      <FaGithub className="h-5 w-5 mr-2" />
                      <span className="text-white font-medium group-hover:translate-x-0.5 transition-transform">
                        GitHub
                      </span>
                    </motion.button>
                  </div>
                </div>

                <motion.button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="w-full text-center text-sm text-white/60 hover:text-white mt-6 transition-colors"
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
