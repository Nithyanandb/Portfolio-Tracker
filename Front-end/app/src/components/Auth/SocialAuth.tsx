import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Github, Mail, Chrome } from 'lucide-react';
import { cn } from '../../utils/cn';

export const SocialAuth: React.FC = () => {
  const { loginWithGoogle, loginWithGithub } = useAuth();

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-black/80 text-white/60">Or continue with</span>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={loginWithGoogle}
          className={cn(
            "w-full flex items-center justify-center gap-2",
            "bg-white/5 text-white py-2 rounded-md",
            "hover:bg-white/10 transition-colors",
            "border border-white/10"
          )}
        >
          <Chrome className="w-4 h-4" />
          Google
        </button>
        <button
          onClick={loginWithGithub}
          className={cn(
            "w-full flex items-center justify-center gap-2",
            "bg-white/5 text-white py-2 rounded-md",
            "hover:bg-white/10 transition-colors",
            "border border-white/10"
          )}
        >
          <Github className="w-4 h-4" />
          GitHub
        </button>
      </div>
    </div>
  );
};

export default SocialAuth;