/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "q-blue": {
          DEFAULT: "#002656",
          80: "#3B5C80",
          60: "#758EA9",
          40: "#B0C2D1",
          20: "#E6ECF1",
        },
        "q-red": {
          DEFAULT: "#C41230",
          80: "#D64356",
          60: "#E57785",
          40: "#F1ADB8",
          20: "#FBE6E9",
        },
        "q-black": {
          DEFAULT: "#000000",
          80: "#3C3C3C",
          60: "#787878",
          40: "#B4B4B4",
          20: "#F5F5F5",
        },
      },
    },
  },
  plugins: [],
};
