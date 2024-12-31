export interface BackgroundSection {
  id: string;
  type: 'video' | 'image';
  content: {
    src: string;
    fallback?: string;
  };
  effects?: {
    gradient?: {
      colors: string[];
      opacity: number;
    };
    overlay?: {
      type: string;
      opacity: number;
    };
    particles?: {
      enabled: boolean;
      config: any;
    };
  };
} 