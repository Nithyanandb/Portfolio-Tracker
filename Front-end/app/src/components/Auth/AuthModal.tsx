import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, X as CloseIcon } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../../utils/cn';
import AuthForm from './AuthForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { loginWithGoogle, loginWithGithub } = useAuth();

  const handleOAuthLogin = (provider: string) => {
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Premium Backdrop with Blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative z-10 w-full max-w-md"
          >
            <div className="relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-8">
              {/* Premium Gradient Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none"
              />

              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full text-white/40 hover:text-white/80 hover:bg-white/5 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <CloseIcon className="w-5 h-5" />
              </motion.button>

              <div className="space-y-6">
                {/* Header Section */}
                <div className="space-y-2 text-center">
                  <motion.h2 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-3xl font-medium text-white tracking-tight"
                  >
                    {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                  </motion.h2>
                  <motion.p 
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-white/60"
                  >
                    {authMode === 'login' 
                      ? 'Sign in to continue to your account' 
                      : 'Sign up to get started with CapX.in'}
                  </motion.p>
                </div>

                {/* Social Auth Buttons */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOAuthLogin('google')}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
                      bg-gradient-to-r from-white/5 via-white/[0.07] to-white/5 
                      hover:from-white/10 hover:via-white/[0.12] hover:to-white/10 
                      border border-white/10 transition-all duration-300"
                  >
                    <FcGoogle className="w-5 h-5" />
                    <span className="text-white font-medium">Continue with Google</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOAuthLogin('github')}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
                      bg-gradient-to-r from-white/5 via-white/[0.07] to-white/5 
                      hover:from-white/10 hover:via-white/[0.12] hover:to-white/10 
                      border border-white/10 transition-all duration-300"
                  >
                    <FaGithub className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">Continue with GitHub</span>
                  </motion.button>
                </motion.div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-white/40 bg-black/40">or continue with</span>
                  </div>
                </div>

                {/* Traditional Auth Form */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <AuthForm 
                    mode={authMode}
                    onSuccess={onClose}
                    onModeChange={setAuthMode}
                  />
                </motion.div>

                {/* Mode Switch */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <button
                    onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {authMode === 'login' 
                      ? "Don't have an account? Sign up" 
                      : 'Already have an account? Sign in'}
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;