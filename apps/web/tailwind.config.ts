/** @type {import('tailwindcss').Config} */
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
module.exports = {
  darkMode: "selector",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      letterSpacing: {
        widestestcum: ".18em",
        widestest: ".28em",
        zaydawide: ".35em",
      },
      screens: {
        smartphone: { max: "640px" }, // Applies to all screens with a width of 640px or less
      },
      colors: {
        offWhite: "#FAF9F6",
        bgDark: "#121212",
        geminiPrimary: "#1981FE",
        geminiPrimarylt: "#6CB2FF",
        geminiSecondary: "#B195FE",
        geminiSecondarylt: "#E1CFFF",
      },
    animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}