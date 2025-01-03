// src/components/portfolio/ActivityCard.tsx
import React from 'react';

interface ActivityCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ icon, title, value }) => {
  return (
    <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '0.5rem', backdropFilter: 'blur(20px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        {icon}
        <h3 style={{ fontSize: '1rem', fontWeight: '500', color: '#fff' }}>{title}</h3>
      </div>
      <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff' }}>{value}</p>
    </div>
  );
};