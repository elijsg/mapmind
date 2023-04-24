module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
  extend: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      'darkblue': '#1a202c',
      'darkgrey': '#2d3748',
    }),
    backgroundImage: theme => ({
      'blue-darkgrey-gradient': 'linear-gradient(to right, #1a202c, #2d3748)',
    }),
  },
},

  variants: {},
  plugins: [],
}
