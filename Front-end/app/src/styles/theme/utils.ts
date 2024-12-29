import { theme } from './index';
import type { Theme } from './index';

// Type-safe theme getter
export function getThemeValue<
  T extends keyof Theme,
  K extends keyof Theme[T]
>(token: T, key: K): Theme[T][K] {
  return theme[token][key];
}

// Color manipulation utilities
export const adjustOpacity = (color: string, opacity: number): string => {
  const rgb = hexToRgb(color);
  return rgb ? \`rgba(\${rgb.r}, \${rgb.g}, \${rgb.b}, \${opacity})\` : color;
};

// Convert hex to RGB
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
};

// Media query helper
export const mediaQuery = (breakpoint: keyof Theme['breakpoints']): string => {
  return \`@media (min-width: \${theme.breakpoints[breakpoint]})\`;
};

export const getRGBA = (color: string, opacity: number) => {
  const rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  return rgb ? `rgba(${rgb[1]}, ${rgb[2]}, ${rgb[3]}, ${opacity})` : color;
};