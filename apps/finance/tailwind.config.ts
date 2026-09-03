import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdfbf7',
          100: '#f8f2e6',
          200: '#eedec3',
          300: '#dfc397',
          400: '#cea367',
          500: '#c59b52',
          600: '#b08140',
          700: '#926435',
          800: '#774f30',
          900: '#62402b',
        },
        surface: {
          primary: '#090807',
          secondary: '#110F0D',
          tertiary: '#191714',
          card: '#151311',
          cardHover: '#1D1A17',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
