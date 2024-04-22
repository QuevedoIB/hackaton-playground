import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        answerBad: {
          500: "#F75064",
        },
        answerGood: {
          500: "#82D350",
        },
        grey: {
          500: "#6A6A6A",
        },
        blue: {
          500: "#051B71",
        },
        green: {
          300: "#D3E0BE",
          800: "#5c7537",
          900: "#34441c",
        },
        gameSwipe: {
          left: "#fcbab6",
          neutral: "#fafafa",
          right: "#D4E0B2",
        },
      },
      boxShadow: {
        card: "0 0px 15px -2px rgb(0 0 0 / 0.2), 0 0 3px -2px rgb(0 0 0 / 0.1)",
      },
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
        acuminBold: ["Acumin-Bold", ...defaultTheme.fontFamily.sans],
        acuminMedium: ["Acumin-Medium", ...defaultTheme.fontFamily.sans],
        acuminLight: ["Acumin-Light", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
