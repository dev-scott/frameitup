import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fdf8f0',
          100: '#faefd9',
          500: '#d98d2e',
          600: '#c47420',
          700: '#a35a1c',
        },
        frame: {
          dark:    '#1C1917',
          charcoal:'#292524',
          warm:    '#78716C',
          cream:   '#FAFAF9',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      border:"hsl(var(--border))"
    },
  },
  plugins: [],
};

export default config;
