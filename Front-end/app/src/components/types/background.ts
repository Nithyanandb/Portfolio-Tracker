export interface BackgroundSection {
  type: 'image' | 'video'; // Ensures only these types are allowed
  content: {
    src: string;
    fallback?: string;
  };
  effects: {
    gradient: {
      colors: string[];
      opacity: number;
    };
    overlay: {
      type: string;
      opacity: number;
    };
    particles?: boolean;
  };
}
