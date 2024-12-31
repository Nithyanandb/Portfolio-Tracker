import React from 'react';

interface ChartGradientProps {
  id: string;
  color: string;
}

export const ChartGradient: React.FC<ChartGradientProps> = ({ id, color }) => (
  <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
    <stop offset="95%" stopColor={color} stopOpacity={0}/>
  </linearGradient>
);