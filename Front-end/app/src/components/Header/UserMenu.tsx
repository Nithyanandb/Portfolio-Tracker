import React, { useState } from 'react';
import { User, Bell, Settings } from 'lucide-react';
import { Popover, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth'; // Assuming this is the correct path
import SocialAuth from '../Auth/SocialAuth';

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}

const UserMenu = () => {
  const { login, register, loginWithGoogle, loginWithGithub, isLoading, isAuthenticating } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      // Handle login error (e.g., show a notification)
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      await register(email, password);
    } catch (error) {
      // Handle register error (e.g., show a notification)
      console.error(error);
    }
  };

  return (
    <Popover className="hidden lg:block relative">
      {({ open }) => (
        <>
          <Popover.Button className="flex items-center text-gray-300 hover:text-white transition-colors">
            <User className="h-5 w-5 bg-black" />
          </Popover.Button>
          <Transition
            show={open}
            enter="transition duration-200 ease-out"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition duration-150 ease-in"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 mt-3 w-screen max-w-xs px-0 rounded-2">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative bg-white/60 backdrop-blur-xl p-4">
                  <div className="space-y-3 text-gray-900">
                    {/* Login Form */}
                    <div className="space-y-2">
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <button
                      onClick={handleLogin}
                      className="w-full text-left px-4 py-2 text-blue hover:bg-black/20 rounded-lg transition-colors"
                      disabled={isLoading || isAuthenticating}
                    >
                      {isLoading || isAuthenticating ? 'Logging in...' : 'Sign In'}
                    </button>
                    <button
                      onClick={handleRegister}
                      className="w-full text-left px-4 py-2 text-blue hover:bg-black/20 rounded-lg transition-colors"
                      disabled={isLoading || isAuthenticating}
                    >
                      {isLoading || isAuthenticating ? 'Registering...' : 'Create Account'}
                    </button>
                    {/* Social Auth */}
                    
                    <SocialAuth />
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default UserMenu;
