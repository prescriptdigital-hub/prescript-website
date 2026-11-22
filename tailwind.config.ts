import type { Config } from 'tailwindcss'

// Brand tokens: brand/design_handoff_prescript_brand/tokens/tailwind.prescript.js
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // The brand is square-edged: every radius is 0 except true circles.
    borderRadius: {
      none: '0',
      sm: '0',
      DEFAULT: '0',
      md: '0',
      lg: '0',
      xl: '0',
      '2xl': '0',
      '3xl': '0',
      app: '22%',
      full: '9999px',
    },
    extend: {
      colors: {
        pd: {
          cream: '#EFEA8C',
          brick: '#C24E4E',
          'brick-700': '#A33E3E',
          oxblood: '#3A1714',
          paper: '#F7F4EC',
          ink: '#141110',
          muted: '#4A403B',
          subtle: '#6B605A',
          line: '#DED8C8',
          surface: '#FFFDF7',
          'surface-2': '#E9E4D7',
          iq: '#8B7CFF',
          synq: '#2EE6A6',
          error: '#B3123B',
          'error-bg': '#F9E3E8',
          warning: '#9A5B00',
          success: '#1F7A4F',
          'success-bg': '#E0F2E8',
          info: '#2F5FC4',
        },
      },
      fontFamily: {
        display: ['var(--font-exo2)', '"Exo 2"', 'system-ui', 'sans-serif'],
        sans: ['var(--font-plex)', '"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jbmono)', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.01em',
        tight: '-0.005em',
      },
      transitionTimingFunction: {
        'pd-out': 'cubic-bezier(.2,.8,.2,1)',
        'pd-settle': 'cubic-bezier(.3,1.4,.5,1)',
      },
    },
  },
  plugins: [],
}

export default config
