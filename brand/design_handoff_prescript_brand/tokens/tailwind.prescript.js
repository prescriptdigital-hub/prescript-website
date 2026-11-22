// Merge into tailwind.config.js → theme.extend
module.exports = {
  colors: {
    pd: {
      cream: '#EFEA8C', brick: '#C24E4E', 'brick-700': '#A33E3E', oxblood: '#3A1714',
      paper: '#F7F4EC', ink: '#141110', muted: '#4A403B', subtle: '#6B605A', line: '#DED8C8',
      surface: '#FFFDF7', 'surface-2': '#E9E4D7', iq: '#8B7CFF', synq: '#2EE6A6',
      error: '#B3123B', warning: '#9A5B00', success: '#1F7A4F', info: '#2F5FC4',
    },
  },
  fontFamily: {
    display: ['"Exo 2"', 'system-ui', 'sans-serif'],
    sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
    mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
  },
  borderRadius: { none: '0' },
  transitionTimingFunction: { 'pd-out': 'cubic-bezier(.2,.8,.2,1)', 'pd-settle': 'cubic-bezier(.3,1.4,.5,1)' },
};
