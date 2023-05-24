/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
import defaultTheme from "tailwindcss/defaultTheme";

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...defaultTheme,
    fontFamily: {
      sans: ["var(--font-montserrat)", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
});
