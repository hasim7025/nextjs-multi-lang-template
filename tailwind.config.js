const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // keyframes: {
      //   gradient: {
      //     '0%': { backgroundPosition: '0% 50%' },
      //     '50%': { backgroundPosition: '100% 50%' },
      //     '100%': { backgroundPosition: '0% 50%' },
      //   },
      // },
      // animation: {
      //   gradient: 'gradient 3s ease infinite',
      // },
      fontFamily: {
        sans: ["var(--font-playfair)", ...fontFamily.sans],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundColor: {
        premium: "#a1704c",
        dark: "#000000",
        hellgrau: "#9d9d9b",
        lightdark:"#969696"
      },
      textColor: {
        premium: "#a1704c",
        dark: "#383b42",
        hellgrau: "#9d9d9b",
        lightdark:"#969696"
      },
      backgroundImage: {
        footer: "url('/villa/20.webp')",
        triangle: "url('/background/triangle.webp')",
        services: "url('/villa/1.webp')",
        experiences: "url('/villa/2.webp')"
      },
      maxWidth: {
        container: "90rem",
        "services-container": "120rem",
      },
      maxHeight: {
        header: "6rem",
      },
      height: {
        apart: "45rem",
        footer: "90vh",
        services: "108rem",
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none !important",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
