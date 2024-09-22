/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      fontFamily: {
        airbnb: ['Airbnb', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require('@tailwindcss/forms'), // Optional additional plugin for form styling
    require('@tailwindcss/typography'), // Optional additional plugin for typography
  ],
};
