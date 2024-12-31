import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-t-2 border-blue-500 rounded-full animate-spin" />
        <p className="text-white/80">Loading...</p>
      </div>
    </div>
  );
}; 