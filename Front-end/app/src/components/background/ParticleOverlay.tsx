import React from 'react';
import Particles from 'react-tsparticles';
import { Engine } from 'tsparticles-engine';
import { loadSlim } from "tsparticles-slim";

const ParticlesOverlay: React.FC = () => {
  const particlesInit = async (engine: Engine) => {
    try {
      await loadSlim(engine);
    } catch (error) {
      console.error('Failed to initialize particles:', error);
    }
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        particles: {
          number: { value: 50, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          opacity: { value: 0.5, random: true },
          size: { value: 2, random: true },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out"
          },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
          }
        },
        interactivity: {
          events: { 
            onhover: { 
              enable: true, 
              mode: "grab" 
            } 
          },
          modes: { 
            grab: { 
              distance: 140, 
              links: { 
                opacity: 1 
              } 
            } 
          }
        },
        retina_detect: true
      }}
    />
  );
};

export default ParticlesOverlay;