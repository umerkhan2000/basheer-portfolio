export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'electric': 'electric 2s ease-in-out infinite',
        'ballpit': 'ballpit 3s ease-in-out infinite',
      },
      keyframes: {
        electric: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        ballpit: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
