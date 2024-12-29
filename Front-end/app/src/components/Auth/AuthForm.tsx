import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuthApi } from './useAuthApi';
import { toast } from 'react-hot-toast';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSuccess?: () => void;
  onModeChange: (mode: 'login' | 'register') => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode, onSuccess, onModeChange }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  
  const { login, register, isLoading, error } = useAuthApi();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        const response = await login({
          email: formData.email,
          password: formData.password
        });
        toast.success('Successfully logged in!');
        onSuccess?.();
      } else {
        const response = await register({
          email: formData.email,
          password: formData.password,
          name: formData.name
        });
        toast.success('Registration successful! Please log in.');
        onModeChange('login');
        setFormData({ email: '', password: '', name: '' });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {mode === 'register' && (
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-sm font-medium text-white/60">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white 
                placeholder-white/30 font-light tracking-wide
                focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 
                transition-all duration-200"
              placeholder="Enter your full name"
              required={mode === 'register'}
            />
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-medium text-white/60">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white 
              placeholder-white/30 font-light tracking-wide
              focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 
              transition-all duration-200"
              placeholder="Enter your email address"
              required
            />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-medium text-white/60">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white 
              placeholder-white/30 font-light tracking-wide
              focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 
              transition-all duration-200"
            placeholder="Enter your password"
            required
          />
        </div>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl text-red-400/90 text-sm"
        >
          {error}
        </motion.div>
      )}

      <motion.button
        type="submit"
        disabled={isLoading}
        className="relative w-full group overflow-hidden px-6 py-3.5 rounded-xl 
          bg-gradient-to-r from-white/90 via-white to-white/90 
          hover:from-white hover:via-white hover:to-white 
          disabled:opacity-70 disabled:cursor-not-allowed
          transition-all duration-300"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 
          group-hover:opacity-100 blur-xl transition-opacity duration-500" />
        
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
            transform: 'skewX(-16deg) translateX(-100%)',
          }}
          animate={{
            x: ['0%', '200%'],
          }}
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 1
          }}
        />

        <span className="relative flex items-center justify-center gap-2 text-sm font-medium tracking-[0.2em] text-black/90">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              PROCESSING...
            </>
          ) : (
            mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'
          )}
        </span>
      </motion.button>
    </form>
  );
};

export default AuthForm;
