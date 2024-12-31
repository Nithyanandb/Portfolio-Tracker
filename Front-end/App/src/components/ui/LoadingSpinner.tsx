import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-40">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
  </div>
);