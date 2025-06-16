module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#93c5fd',
          DEFAULT: '#3b82f6',
          dark: '#1e40af',
        },
      },
    },
  },
  plugins: [],
};
