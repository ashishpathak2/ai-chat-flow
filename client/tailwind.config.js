/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        void: '#080b10',
        panel: '#0d1117',
        surface: '#161b22',
        border: '#21262d',
        accent: '#00ff88',
        'accent-dim': '#00cc6a',
        'accent-glow': 'rgba(0, 255, 136, 0.15)',
        muted: '#8b949e',
        text: '#e6edf3',
        error: '#ff4d4f',
        warning: '#ffa940',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 255, 136, 0.3)',
        'glow-sm': '0 0 10px rgba(0, 255, 136, 0.2)',
        'panel': '0 4px 24px rgba(0,0,0,0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'fadeIn': 'fadeIn 0.4s ease forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          from: { opacity: 0, transform: 'translateY(8px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
