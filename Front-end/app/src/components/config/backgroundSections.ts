import { BackgroundSection } from '../types/background';

export const defaultSection: BackgroundSection = {
  type: 'image',
  content: {
    src: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=100&w=2000',
  },
  effects: {
    gradient: {
      colors: ['rgba(0,0,0,0.7)', 'rgba(0,10,30,0.6)'],
      opacity: 0.85,
    },
    overlay: {
      type: 'grid',
      opacity: 0.1,
    },
    particles: true,
  },
};

export const backgroundSections: BackgroundSection[] = [
  defaultSection,
  {
    type: 'image',
    content: {
      src: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=100&w=2000',
    },
    effects: {
      gradient: {
        colors: ['rgba(0,10,30,0.7)', 'rgba(0,20,50,0.6)'],
        opacity: 0.85,
      },
      overlay: {
        type: 'grid',
        opacity: 0.15,
      },
      particles: true,
    },
  },
  {
    type: 'image',
    content: {
      src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    },
    effects: {
      gradient: {
        colors: ['rgba(0,20,50,0.7)', 'rgba(0,30,70,0.6)'],
        opacity: 0.85,
      },
      overlay: {
        type: 'grid',
        opacity: 0.12,
      },
      particles: true,
    },
  },
];