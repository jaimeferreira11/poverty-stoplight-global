module.exports = {
  theme: {
    fontFamily: {
      work: ['Work Sans', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      lightGray: '#c8c8c9',
      light: '#676b70',
      dark: '#343a40',
      gray: {
        100: '#f5f5f5',
        200: '#edf2f7',
        300: '#e2e8f0',
        400: '#cbd5e0',
        500: '#a0aec0',
        600: '#718096',
        700: '#4a5568',
        800: '#2d3748',
        900: '#1a202c',
      },
      error: '#D54B47',
      green: { 400: '#6CB864', 500: '#4ca948', 700: '#309E43', 800: '#419f43', default: '#6CB864' },
    },
    extend: {
      fontSize: {
        '7xl': '5rem',
      },
      height: { '22': '90px', '150': '600px' },
    },
    variants: {
      textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    },
  },
}
