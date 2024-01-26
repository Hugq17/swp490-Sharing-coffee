/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: () => ({
        lightPrimary: "#F4F7FE",
      })
    },
  },
  plugins: [],
}

