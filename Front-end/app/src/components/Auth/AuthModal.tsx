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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }} />
          </div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md overflow-hidden"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute right-4 top-4 p-2 text-white/60 hover:text-white transition-colors"
            >
              <CloseIcon className="w-5 h-5" />
            </motion.button>

            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              {success ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-8"
                >
                  <div className="rounded-full bg-green-500/10 p-3 mb-4">
                    <CheckIcon className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">Welcome Back</h3>
                  <p className="text-white/60">Successfully authenticated</p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-medium tracking-tight text-white">
                      {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-white/60">
                      {authMode === 'login' 
                        ? 'Enter your credentials to access your account' 
                        : 'Fill in your information to create an account'}
                    </p>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg bg-red-500/10 border border-red-500/20"
                    >
                      <p className="text-sm text-red-400">{error}</p>
                    </motion.div>
                  )}

                  <div className="space-y-4">
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
                  </div>

                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {}}
                      disabled={isAuthenticating}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg",
                        "bg-blue-500 hover:bg-blue-600",
                        "text-white font-medium",
                        "transition-all duration-200",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                    >
                      {isAuthenticating ? 'Processing...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
                    </motion.button>

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

                  <motion.button
                    type="button"
                    onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                    className="w-full text-center text-sm text-white/60 hover:text-white transition-colors"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {authMode === 'login' 
                      ? "Don't have an account? Sign up" 
                      : "Already have an account? Sign in"}
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
