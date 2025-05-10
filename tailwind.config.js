/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
      },
    },
    colors: {
      blue: {
        50: "#DFDFF0",
        75: "#dfdff2",
        100: "#F0F2FA",
        200: "#010101",
        300: "#4FB7DD",
        100: "#FFFFFF",
        
      },
      violet: {
        300: "#5724ff",
        100: "#000000",
      },
      yellow: {
        100: "#8e983f",
        300: "#edff66",
      },

      white: {
        100: "#FFFFFF",
        200: "#808080"
       },
    
    },
  },
  plugins: [],
};
