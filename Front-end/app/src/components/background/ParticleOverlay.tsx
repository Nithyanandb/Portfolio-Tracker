import React from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from "tsparticles-slim";
import { Engine } from "tsparticles-engine";

const ParticlesOverlay: React.FC = () => {
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  return (
    <Particles
      init={particlesInit}
      options={{
        fullScreen: {
          enable: false
        },
        particles: {
          number: {
            value: 40,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#4f90ea"
          },
          links: {
            enable: true,
            distance: 150,
            color: "#4f90ea",
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "bounce"
            }
          },
          size: {
            value: 2
          },
          opacity: {
            value: 0.3
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab"
            }
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.5
              }
            }
          }
        }
      }}
      className="absolute inset-0"
    />
  );
};

export default ParticlesOverlay;