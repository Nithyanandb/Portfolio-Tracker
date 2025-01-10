import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { shadows } from './shadows';
import { borders } from './borders';
import { animations } from './animations';

export const theme = {
  colors,
  spacing,
  typography,
  shadows,
  borders,
  animations,

  // Semantic tokens
  semantic: {
    background: {
      primary: colors.neutral[50],
      secondary: colors.neutral[100],
      tertiary: colors.neutral[200]
    },
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[700],
      tertiary: colors.neutral[600],
      disabled: colors.neutral[400]
    },
    border: {
      default: colors.neutral[200],
      hover: colors.neutral[300],
      focus: colors.primary[500]
    },
    action: {
      primary: colors.primary[500],
      primaryHover: colors.primary[600],
      primaryActive: colors.primary[700],
      secondary: colors.secondary[500],
      secondaryHover: colors.secondary[600],
      secondaryActive: colors.secondary[700]
    }
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // Z-index scale
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  }
} as const;

// Type exports
export type Theme = typeof theme;
export type ThemeColor = keyof typeof colors;
export type ThemeSpace = keyof typeof spacing;
export type ThemeBreakpoint = keyof typeof theme.breakpoints;