/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      backgroundColor: {
        default: '#ffffff',
        darken: '#f7f8f9',
      },
      colors: {
        default: 'rgb(29,29,29)',
        lighten: '#6c7281',
        primary: '#1e86ff',
      },
      borderColor: {
        default: '#e4e4e7',
      },
    },
  },
  plugins: [],
}
