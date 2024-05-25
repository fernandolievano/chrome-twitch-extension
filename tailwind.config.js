/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#6441a5',
        'secondary-color': '#b9a3e3',
        'dark-color': '#262626',
        'light-color': '#f1f1f1',
      },
    },
  },
  plugins: [],
}