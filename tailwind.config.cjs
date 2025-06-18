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
        yellow: '#FFD761',
        paleSky: '#E5F0FB',
        indigo: '#1D3557',
        creamWhite: '#FFFDF8',
        mutedBlueGray: '#B7C9D4',
        pastelYellow: '#FFF9E6',
      },
      fontFamily: {
        nunito: ['\'Nunito\'', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
