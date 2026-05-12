/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        kape: {
          white:   '#FAF7F2',
          beige:   '#F5E9DA',
          medio:   '#6F4E37',
          oscuro:  '#4B2E2B',
          azul:    '#1D4ED8',
          verde:   '#15803D',
          rojo:    '#DC2626',
          naranja: '#EA580C',
        },
      },
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        inter:   ['Inter', 'sans-serif'],
        lora:    ['Lora', 'serif'],
      },
      keyframes: {
        steam: {
          '0%':   { opacity: '0',   transform: 'translateY(0px) scaleX(1)' },
          '25%':  { opacity: '0.8' },
          '100%': { opacity: '0',   transform: 'translateY(-70px) scaleX(2)' },
        },
        floatBean: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':      { transform: 'translateY(-22px) rotate(18deg)' },
        },
        ripple: {
          '0%':   { transform: 'scale(0)', opacity: '0.5' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(36px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%':   { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        pulseRing: {
          '0%':   { transform: 'scale(1)', opacity: '0.4' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        pourIn: {
          '0%':   { height: '0%',   opacity: '0' },
          '30%':  { opacity: '1' },
          '100%': { height: '100%', opacity: '1' },
        },
      },
      animation: {
        'steam-1':   'steam 2.8s ease-out infinite',
        'steam-2':   'steam 2.8s ease-out infinite 0.9s',
        'steam-3':   'steam 2.8s ease-out infinite 1.8s',
        'float-1':   'floatBean 5s ease-in-out infinite',
        'float-2':   'floatBean 5s ease-in-out infinite 1.7s',
        'float-3':   'floatBean 5s ease-in-out infinite 3.4s',
        'float-4':   'floatBean 7s ease-in-out infinite 0.8s',
        'float-5':   'floatBean 6s ease-in-out infinite 2.5s',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        'pour-in':   'pourIn 1s cubic-bezier(0.22,1,0.36,1) forwards',
      },
      boxShadow: {
        'kape-sm':  '0 4px 20px rgba(111,78,55,0.08)',
        'kape-md':  '0 8px 40px rgba(111,78,55,0.14)',
        'kape-lg':  '0 20px 60px rgba(111,78,55,0.18)',
        'kape-glow': '0 0 40px rgba(111,78,55,0.25)',
      },
    },
  },
  plugins: [],
};
