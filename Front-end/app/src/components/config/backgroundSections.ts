import { BackgroundSection } from '../types/background';

export const defaultSection: BackgroundSection[] = {
  type: 'image',
  content: {
    src: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?auto=format&fit=crop&w=1920',
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

];