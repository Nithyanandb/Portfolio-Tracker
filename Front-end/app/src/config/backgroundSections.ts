import { BackgroundSection } from '../types/background';

export const backgroundSections: BackgroundSection[] = [
  {
    id: 'hero',
    type: 'video',
    content: {
      src: '/videos/market-pulse.mp4', // Dynamic market visualization
      fallback: '/images/market-fallback.jpg'
    },
    effects: {
      gradient: {
        colors: [
          'rgba(0, 0, 0, 0.7)',
          'rgba(0, 0, 0, 0.5)',
          'rgba(0, 10, 30, 0.8)'
        ],
        opacity: 0.85
      },
      overlay: {
        type: 'grid',
        opacity: 0.1
      },
      particles: {
        enabled: true,
        config: {
          particles: {
            number: { value: 40 },
            color: { value: "#4f90ea" },
            opacity: { value: 0.3 },
            size: { value: 2 },
            links: {
              enable: true,
              distance: 150,
              color: "#4f90ea",
              opacity: 0.2
            }
          }
        }
      }
    }
  },
  // Add more sections as needed
]; 