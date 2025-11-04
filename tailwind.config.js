/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F14',
        surface: '#0F1720',
        accent: '#7C5CFF',
        secondary: '#00E5C4',
        text: '#E6EEF3',
        muted: '#95A1B3'
      },
      fontFamily: {
        heading: ['Poppins', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
        code: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular']
      },
      boxShadow: {
        glow: '0 0 20px rgba(124,92,255,0.35)',
        glowSecondary: '0 0 18px rgba(0,229,196,0.35)'
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(.22,.95,.36,1)'
      }
    }
  },
  plugins: []
};


