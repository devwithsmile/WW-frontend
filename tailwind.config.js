/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wwbg: '#212121',
        wwtext: '#F5F7F8',
        wwsecondarytext:'#94a3b8',
        wwred : '#c13838',
        wwTitleRed:'#b91c1c',
        wwnavbar:'#1f1c1c ',
        wwpopdiv:'#333333',
      },
      screens: {
        '2xl': '1536px', // To handle ultrawide displays
      },
    },
  },
  plugins: [],
}