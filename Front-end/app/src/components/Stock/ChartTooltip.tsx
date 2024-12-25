import React from 'react';

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

export const ChartTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-white font-medium">
        ${payload[0].value.toFixed(2)}
      </p>
    </div>
  );
};