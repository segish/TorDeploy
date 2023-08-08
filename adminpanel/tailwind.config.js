/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {},
  },
  screens:{
    "sm":"640px",
    "md": "768px",
    "lg":"1024px"
  },
  plugins: [],
}

