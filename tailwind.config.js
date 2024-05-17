/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        rotatefull: {
          '0%, 100%': { transform: 'rotate(0deg,0deg,0deg)' },
          '50%': { transform: 'rotate(0deg,180deg,0deg)' },
        }
      },
      backgroundImage:{
        "img1":"url('https://d1m75rqqgidzqn.cloudfront.net/wp-data/2020/01/17200717/shutterstock_1142463260.jpg')",
      }
    },
  },
  plugins: [],
}

