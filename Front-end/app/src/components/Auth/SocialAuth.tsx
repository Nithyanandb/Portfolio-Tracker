import React from 'react';
import { Github } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';


const SocialAuth: React.FC = () => {
  const { loginWithGoogle, loginWithGithub } = useAuth();

  return (
    <div className="mt-10">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-blue-900 rounded">Or continue with</span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          Google
        </button>
        <button
          onClick={loginWithGithub}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          <Github className="inline-block w-4 h-4 mr-2" />
          GitHub
        </button>
      </div>
    </div>
  );
}
  export default SocialAuth;