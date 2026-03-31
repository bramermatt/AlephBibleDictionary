import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#101828',
        muted: '#667085',
        line: '#eaecf0',
        panel: '#ffffff'
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgba(16, 24, 40, 0.06), 0 4px 16px -8px rgba(16, 24, 40, 0.2)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['ui-serif', 'Georgia', 'serif']
      },
      maxWidth: {
        prose: '70ch'
      }
    }
  },
  plugins: []
};

export default config;
