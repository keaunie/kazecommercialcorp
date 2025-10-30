/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f6f7ff",
          100: "#eef0ff",
          200: "#dce1ff",
          300: "#b7c0ff",
          400: "#8895ff",
          500: "#5b6cff",
          600: "#3d4af5",
          700: "#303acc",
          800: "#272fa3",
          900: "#1f267f",
        },
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.06)",
      },
      fontFamily: {
        azonix: ["Azonix", "sans-serif"],
      },
    },
  },

  plugins: [],
};
