import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface RiskWarningProps {
  message: string;
}

const RiskWarning: React.FC<RiskWarningProps> = ({ message }) => {
  return (
    <div className="bg-yellow-500/20 border border-yellow-500/20 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 text-yellow-500">
        <AlertTriangle size={20} />
        <span className="font-medium">Risk Warning</span>
      </div>
      <p className="text-white/60 mt-2">{message}</p>
    </div>
  );
};

export default RiskWarning;