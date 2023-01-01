/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        background: '#0F0F0F',
        form:'#BCBCBC',
        gradientPink: '#FE23A8',
        gradientBlue:'#022DFE'
      },
      fontFamily: {
        monument: 'monument',
        tele: 'teletactile',
        circular: 'circular'
      }
    },
  },
  plugins: [],

}
