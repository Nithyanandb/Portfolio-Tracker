export type BackgroundType = 'image' | 'video';

export interface BackgroundContent {
  src: string;
}

export interface GradientEffect {
  colors: string[];
  opacity: number;
}

export interface GridOverlayEffect {
  type: 'grid';
  opacity: number;
}

export interface BackgroundEffects {
  gradient?: GradientEffect;
  overlay?: GridOverlayEffect;
  particles?: boolean;
}

export interface BackgroundSection {
  type: BackgroundType;
  content: BackgroundContent;
  effects: BackgroundEffects;
}
export interface MarketTrendEffect {
  type: 'bullish' | 'bearish' | 'neutral';
  intensity: number;
}