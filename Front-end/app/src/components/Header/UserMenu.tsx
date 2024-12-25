import React from 'react';
import { User, Bell, Settings } from 'lucide-react';
import { Popover, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';

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

export const UserMenu: React.FC<UserMenuProps> = ({ user, onLogin, onRegister, onLogout }) => {
  if (user) {
    return (
      <Popover className="relative">
        {({ open }) => (
          <>
            <div className="flex items-center space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Bell size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Settings size={20} />
              </motion.button>
              
              <Popover.Button className="flex items-center space-x-3">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <User size={20} className="text-gray-400" />
                  </div>
                )}
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </Popover.Button>
            </div>

            <Transition
              show={open}
              enter="transition duration-200 ease-out"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition duration-150 ease-in"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-xs transform px-2">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative bg-white/10 backdrop-blur-xl p-4">
                    <div className="space-y-3">
                      <button className="w-full text-left px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-colors">
                        Profile Settings
                      </button>
                      <button className="w-full text-left px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-colors">
                        Trading History
                      </button>
                      <button 
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 text-red-400 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  }

  return (
    <Popover className="hidden lg:block relative">
      {({ open }) => (
        <>
          <Popover.Button className="flex items-center text-gray-300 hover:text-white transition-colors">
            <User className="h-5 w-5" />
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
            <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-xs transform px-2">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative bg-white/10 backdrop-blur-xl p-4">
                  <div className="space-y-3">
                    <button
                      onClick={onLogin}
                      className="w-full text-left px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={onRegister}
                      className="w-full text-left px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      Create Account
                    </button>
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