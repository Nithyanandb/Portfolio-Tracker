import React from 'react';
import { BackgroundSection } from '../types/background';
import BackgroundMedia from './BackgroundMedia';
import GradientOverlay from './GradientOverlay';
import GridOverlay from './GridOverlay';
import { defaultSection } from '../config/backgroundSections';

interface Props {
  sections: BackgroundSection[];
  currentSection: number;
}

const DynamicBackground: React.FC<Props> = ({ 
  sections = [defaultSection], 
  currentSection = 0 
}) => {
  const section = sections[currentSection] || defaultSection;

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <BackgroundMedia section={section} />
      
      {section.effects.gradient && (
        <GradientOverlay
          colors={section.effects.gradient.colors}
          opacity={section.effects.gradient.opacity}
        />
      )}
      
      {section.effects.overlay?.type === 'grid' && (
        <GridOverlay opacity={section.effects.overlay.opacity} />
      )}
    </div>
  );
};

export default DynamicBackground;