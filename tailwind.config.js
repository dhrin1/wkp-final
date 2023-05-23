module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito'],
      },
      colors:{
        gray: {
          normal: '#EFEFEF',
          primary: '#FAFAFA',
          secondary: '#D1D5DB',
          tertiary: '#575D68'
        },
        blue: {
          primary: '#0095F6',
        },
        black: {
          primary: '#313131',
          secondary: '#202020',
          tertiary: '#181818'
        },
        red: {
          primary: '#FF0000',
          secondary: '#ED4844',
          tertiary: '#DB2828'
        },
        orange: {
          primary: '#EA580C',
          secondary: '#C2410C',
          tertiary: '#9A3412'
        }
      }
    },
  },
  plugins: [],
}
