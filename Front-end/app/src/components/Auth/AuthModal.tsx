import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginWithGoogle, loginWithGithub, login } = useAuth();

  const handleTraditionalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      onClose();
      toast.success('Successfully logged in!');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      onClose();
    } catch (error) {
      toast.error('Google login failed. Please try again.');
    }
  };

  const handleGithubLogin = async () => {
    try {
      await loginWithGithub();
      onClose();
    } catch (error) {
      toast.error('GitHub login failed. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md p-8 bg-black/90 rounded-lg"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-light text-white mb-6 tracking-wider">Sign In</h2>

            {/* Traditional Login Form */}
            <form onSubmit={handleTraditionalLogin} className="space-y-4 mb-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-white text-black font-light tracking-wider hover:bg-white/90 rounded-lg transition-colors"
              >
                CONTINUE
              </motion.button>
            </form>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <motion.button
                onClick={handleGoogleLogin}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-white/5 text-white font-light tracking-wider hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                CONTINUE WITH GOOGLE
              </motion.button>

              <motion.button
                onClick={handleGithubLogin}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-white/5 text-white font-light tracking-wider hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <img src="/github-icon.svg" alt="GitHub" className="w-5 h-5" />
                CONTINUE WITH GITHUB
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
