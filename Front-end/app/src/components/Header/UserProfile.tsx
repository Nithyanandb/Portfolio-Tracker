import React from 'react';
import { Bell, Settings, User as UserIcon } from 'lucide-react';
import { User } from '../Service/Auth';

interface UserProfileProps {
  user: User;
  onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  return (
    <div className="flex items-center space-x-7">
      <NotificationIcons />
      <div className="flex items-center space-x-4">
        <Avatar user={user} />
        <UserInfo user={user} />
        <LogoutButton onLogout={onLogout} />
      </div>
    </div>
  );
};

const NotificationIcons = () => (
  <>
    <button className="text-gray-300 hover:text-white transition-colors">
      <Bell size={20} />
    </button>
    <button className="text-gray-300 hover:text-white transition-colors">
      <Settings size={20} />
    </button>
  </>
);

const Avatar: React.FC<{ user: User }> = ({ user }) => (
  user.avatar ? (
    <img
      src={user.avatar}
      alt={user.name}
      className="w-10 h-10 rounded-full border-2 border-gray-700"
    />
  ) : (
    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
      <UserIcon size={20} className="text-gray-400" />
    </div>
  )
);

const UserInfo: React.FC<{ user: User }> = ({ user }) => (

  <div className="hidden md:block"> <p className="text-sm font-medium text-white">{user.name}</p> <p className="text-xs text-gray-400">{user.email}</p> </div>);
const LogoutButton: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
  <button
    onClick={onLogout}
    className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"

  >

    Logout
  </button>);
export default UserProfile;