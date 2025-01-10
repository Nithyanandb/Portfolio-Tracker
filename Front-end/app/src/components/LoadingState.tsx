import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="text-center space-y-4">
        <div className="relative w-20 h-20">
          {/* Outer ring with gradient and animation */}
          <div className="absolute inset-0 border-4 border-transparent rounded-full animate-spin-slow border-t-blue-500 border-r-blue-500" />
          {/* Inner ring with gradient and animation */}
          <div className="absolute inset-4 border-4 border-transparent rounded-full animate-spin border-t-blue-300 border-r-blue-300" />
          {/* Center dot */}
          <div className="absolute inset-6 bg-blue-500 rounded-full animate-pulse" />
        </div>
        {/* Text with subtle animation */}
        <p className="text-white font-medium text-lg animate-pulse">Loading...</p>
      </div>
    </div>
  );
};