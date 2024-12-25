export interface BackgroundSection {
  type: 'video' | 'image';
  content: {
    src: string;
    fallback?: string;
  };
  effects: {
    gradient?: {
      colors: string[];
      opacity: number;
    };
    overlay?: {
      type: 'rays' | 'noise' | 'grid';
      opacity: number;
    };
  };
}

export interface MarketTrendEffect {
  type: 'bullish' | 'bearish' | 'neutral';
  intensity: number;
}