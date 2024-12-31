import React from 'react';

interface AuthButtonsProps {
  onLogin: () => void;
  onRegister: () => void;
  onGitHubLogin: () => void;
  onGoogleLogin: () => void;
}

export const AuthButtons: React.FC<AuthButtonsProps> = ({
  onLogin,
  onRegister,
  onGitHubLogin,
  onGoogleLogin,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <AuthButton onClick={onLogin}>Login</AuthButton>
      <AuthButton onClick={onRegister}>Register</AuthButton>
      <AuthButton onClick={onGitHubLogin}>Login with GitHub</AuthButton>
      <AuthButton onClick={onGoogleLogin}>Login with Google</AuthButton>
    </div>
  );
};

const AuthButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => (
  <button 
    onClick={onClick}
    className="text-sm text-gray-300 hover:text-white transition-colors"
  >
    {children}
  </button>
);

export default AuthButtons;