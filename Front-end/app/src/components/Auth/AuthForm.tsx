import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSuccess?: () => void;
  onModeChange: (mode: 'login' | 'register') => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode, onSuccess, onModeChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login, register, isAuthenticating, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        await login({ email, password });
        onSuccess?.();
      } else {
        await register({ email, password, name });
        toast.success('Registration successful! Please login to continue.');
        onModeChange('login');
        setEmail('');
        setPassword('');
        setName('');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Authentication failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'register' && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white/60 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white"
            required
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-1.5">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white/60 mb-1.5">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white"
          required
        />
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isAuthenticating}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-lg"
      >
        {isAuthenticating ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
      </button>
    </form>
  );
};

export default AuthForm;
