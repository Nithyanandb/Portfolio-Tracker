import React from 'react';
import { Popover, Transition } from '@headlessui/react';
import { User, LogOut, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import SocialAuth from './SocialAuth';

const AuthPopover: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
            {user ? (
              <>
                <img 
                  src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border border-white/10"
                />
                <span className="font-medium">{user.name}</span>
              </>
            ) : (
              <User className="h-5 w-5" />
            )}
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
            <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-sm transform px-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
              >
                <div className="relative bg-black/90 backdrop-blur-xl p-6">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                          alt={user.name}
                          className="w-12 h-12 rounded-full border border-white/10"
                        />
                        <div>
                          <h3 className="text-lg font-medium text-white">{user.name}</h3>
                          <p className="text-sm text-white/60">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="border-t border-white/10 pt-4">
                        <button
                          onClick={() => logout()}
                          className="w-full flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <SocialAuth />
                  )}
                </div>
              </motion.div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default AuthPopover;
