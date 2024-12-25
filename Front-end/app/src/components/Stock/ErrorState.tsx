import React from 'react';

interface ErrorStateProps {
  message: string;
  onReturn: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onReturn }) => (
  <div className="container mx-auto px-4 py-8">
    <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">{message}</h2>
      <button
        onClick={onReturn}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Return to Dashboard
      </button>
    </div>
  </div>
);


export default ErrorState;