import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';

interface BackgroundSection {
  type: 'image' | 'video';
  content: {
    src: string;
  };
  effects: {
    gradient?: {
      colors: string[];
      opacity: number;
    };
    overlay?: {
      type: string;
      opacity: number;
    };
    particles?: boolean;
  };
}

interface Props {
  sections: BackgroundSection[];
  currentSection: number;
}
const DynamicBackground: React.FC<Props> = ({ sections, currentSection }) => {
  const section = sections[currentSection];

  if (!section) {
    console.error("Invalid section or currentSection index:", { sections, currentSection });
    return null; // Render nothing if section is undefined
  }

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      {/* Background Media */}
      {section.type === 'image' ? (
        <img
          src={section.content.src}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={section.content.src} type="video/mp4" />
        </video>
      )}

      {/* Gradient Overlay */}
      {section.effects.gradient && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${section.effects.gradient.colors.join(', ')})`,
            opacity: section.effects.gradient.opacity,
          }}
        />
      )}

      {/* Grid Overlay */}
      {section.effects.overlay?.type === 'grid' && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            opacity: section.effects.overlay.opacity,
          }}
        />
      )}

      {/* Particles */}
      {section.effects.particles && (
        <Particles
          init={particlesInit}
          options={{
            particles: {
              number: {
                value: 100,
                density: {
                  enable: true,
                  value_area: 800,
                },
              },
              color: {
                value: "#ffffff",
              },
              opacity: {
                value: 0.5,
                random: true,
              },
              size: {
                value: 2,
                random: true,
              },
              move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                outModes: {
                  default: "out",
                },
              },
              links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1,
              },
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "grab",
                },
              },
              modes: {
                grab: {
                  distance: 140,
                  links: {
                    opacity: 1,
                  },
                },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </div>
  );
};

export default DynamicBackground;