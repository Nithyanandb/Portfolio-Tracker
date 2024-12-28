import { Menu, Transition } from '@headlessui/react';
import { User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const UserProfileMenu = () => {
  const { user, logout } = useAuth();

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-2 text-white/80 hover:text-white">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          {user?.avatarUrl ? (
            <img 
              src={user.avatarUrl} 
              alt={user.name} 
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <User className="w-5 h-5" />
          )}
        </div>
      </Menu.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-in"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-[#1d1d1f] border border-white/10 rounded-lg shadow-lg">
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-white/5' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm text-white`}
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Settings
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={`${
                    active ? 'bg-white/5' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm text-white`}
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}; 