import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, X as CloseIcon, Loader2 } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../../utils/cn';
import SecureConnection from './SecureConnection';

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

  // Loading states for different security checks
  const [loadingStates, setLoadingStates] = useState({
    securityCheck: false,
    deviceVerification: false,
    locationVerification: false,
    encryptionSetup: false
  });

  useEffect(() => {
    if (isOpen) {
      // Simulate security checks
      const runSecurityChecks = async () => {
        setLoadingStates(prev => ({ ...prev, securityCheck: true }));
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setLoadingStates(prev => ({ 
          ...prev, 
          securityCheck: false,
          deviceVerification: true 
        }));
        await new Promise(resolve => setTimeout(resolve, 600));
        
        setLoadingStates(prev => ({ 
          ...prev, 
          deviceVerification: false,
          locationVerification: true 
        }));
        await new Promise(resolve => setTimeout(resolve, 700));
        
        setLoadingStates(prev => ({ 
          ...prev, 
          locationVerification: false,
          encryptionSetup: true 
        }));
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setLoadingStates(prev => ({ ...prev, encryptionSetup: false }));
      };

      runSecurityChecks();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden"
          >
            {/* Security Check Overlay */}
            <AnimatePresence>
              {Object.values(loadingStates).some(state => state) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm "
                >
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 mb-4 text-blue-400 animate-spin mx-auto" />
                    <p className="text-white/80 text-2sm">
                      {loadingStates.securityCheck && "Initializing secure connection..."}
                      {loadingStates.deviceVerification && "Verifying device integrity..."}
                      {loadingStates.locationVerification && "Confirming secure location..."}
                      {loadingStates.encryptionSetup && "Setting up encryption..."}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Content */}
            <motion.div
              className="relative bg-black/90 backdrop-blur-xl rounded-3xl p-8 mt-20"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors"
              >
                <CloseIcon className="w-5 h-5" />
              </button>

              <div className="space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-medium text-white">
                    {authMode === 'login' ? 'Welcome back' : 'Create account'}
                  </h2>
                  <p className="text-white/40 text-sm">
                    {authMode === 'login' 
                      ? 'Access your trading dashboard securely'
                        : 'Start your AI-powered trading journey'}
                  </p>
                </div>

                {/* Form */}
                <form className="space-y-4">
                  {authMode === 'register' && (
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                      />
                    </div>
                  )}
                  
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    />
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm"
                    >
                      {error}
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full py-3 px-4 bg-white rounded-xl",
                      "text-black font-medium tracking-wide",
                      "hover:bg-white/90 transition-all duration-200",
                      isLoading && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      authMode === 'login' ? 'Sign in ' : 'Create CapX Account'
                    )}
                  </motion.button>
                </form>

                {/* OAuth */}
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-black text-white/40">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "flex items-center justify-center gap-3 px-4 py-3",
                        "bg-white/5 hover:bg-white/10 transition-all duration-200",
                        "rounded-xl border border-white/10 group",
                        isAuthenticating && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <FcGoogle className="w-5 h-5" />
                      <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                        Google
                      </span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "flex items-center justify-center gap-3 px-4 py-3",
                        "bg-white/5 hover:bg-white/10 transition-all duration-200",
                        "rounded-xl border border-white/10 group",
                        isAuthenticating && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <FaGithub className="w-5 h-5" />
                      <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                        GitHub
                      </span>
                    </motion.button>
                  </div>
                </div>

                {/* Switch Auth Mode */}
                <motion.button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="w-full text-center text-sm text-white/40 hover:text-white transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {authMode === 'login' 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
