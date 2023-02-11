/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        jumping: {
          "0%, 50%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-150%)" },
        },
      },
      animation: {
        jumping: "jumping 2s ease-in 0.1s infinite",
        jumping1: "jumping 2s ease-in 0.2s infinite",
        jumping2: "jumping 2s ease-in 0.3s infinite",
      },
    },
  },
  plugins: [],
};
