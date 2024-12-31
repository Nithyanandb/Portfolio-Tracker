import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';
import DynamicBackground from '@/components/background/DynamicBackground';

export const GlobalStyles = createGlobalStyle`
  :root {
    // Generate CSS variables for colors
    ${Object.entries(theme.colors).map(([key, value]) => {
      if (typeof value === 'object') {
        return Object.entries(value).map(([shade, color]) => {
          return `--color-${key}-${shade}: ${color};`;
        }).join('\n');
      }
      return `--color-${key}: ${value};`;
    }).join('\n')}

    // Typography
    --font-sans: ${theme.typography.fonts.sans};
    --font-serif: ${theme.typography.fonts.serif};
    --font-mono: ${theme.typography.fonts.mono};
  }

  html {
    box-sizing: border-box;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: var(--font-sans);
    line-height: ${theme.typography.lineHeights.normal};
    color: ${theme.semantic.text.primary};
    background-color: ${theme.semantic.background.primary};
  }

  // Typography styles
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: ${theme.typography.fontWeights.bold};
    line-height: ${theme.typography.lineHeights.tight};
    color: ${theme.semantic.text.primary};
  }

  h1 { font-size: ${theme.typography.fontSizes['4xl']}; }
  h2 { font-size: ${theme.typography.fontSizes['3xl']}; }
  h3 { font-size: ${theme.typography.fontSizes['2xl']}; }
  h4 { font-size: ${theme.typography.fontSizes.xl}; }
  h5 { font-size: ${theme.typography.fontSizes.lg}; }
  h6 { font-size: ${theme.typography.fontSizes.base}; }

  // Interactive elements
  a {
    color: ${theme.colors.primary[500]};
    text-decoration: none;
    transition: color ${theme.animations.durations.fast} ${theme.animations.easings.easeInOut};

    &:hover {
      color: ${theme.colors.primary[600]};
    }
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  // Focus styles
  :focus-visible {
    outline: 2px solid ${theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;


