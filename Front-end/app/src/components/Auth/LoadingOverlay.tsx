import React from 'react';


const LoadingOverlay: React.FC = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-lg font-semibold">Authenticating...</p>
      <p className="text-gray-500">Please wait while we redirect you</p>
    </div>
  </div>
);

export default LoadingOverlay;