// Animation system
export const animations = {
    durations: {
      fastest: '100ms',
      fast: '200ms',
      normal: '300ms',
      slow: '400ms',
      slowest: '500ms'
    },
  
    easings: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
    },
  
    transitions: {
      all: 'all',
      colors: 'background-color, border-color, color, fill, stroke',
      opacity: 'opacity',
      shadow: 'box-shadow',
      transform: 'transform'
    }
  } as const;