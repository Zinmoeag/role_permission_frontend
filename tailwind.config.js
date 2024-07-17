/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        skin : {
          main: 'rgb(var(--main) / <alpha-value>)',
          third: 'rgb(var(--third) / <alpha-value>)',
          secondary: 'rgb(var(--secondary) / <alpha-value>)',
          fourth: 'rgb(var(--fourth) / <alpha-value>)',
          firth: 'rgb(var(--firth) / <alpha-value>)',
          sixth: 'rgb(var(--sixth) / <alpha-value>)',
          cover: 'rgb(var(--cover) / <alpha-value>)',
          true: 'rgb(var(--true) / <alpha-value>)',
          transparent: 'var(--transparent)',
        }
      }
    },
  },
  plugins: [],
}

