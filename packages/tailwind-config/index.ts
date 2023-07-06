import { Config} from "tailwindcss";

export default {
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: "#f7f7f8",
          100: "#efedf1",
          200: "#dad7e0",
          300: "#bbb4c5",
          400: "#948ca4",
          500: "#776d8a",
          600: "#615871",
          700: "#50485c",
          800: "#453e4e",
          900: "#3c3743",
          950: "#2b2730",
        },
        primary: {
          50: "#f6f5fd",
          100: "#efecfb",
          200: "#e1dcf8",
          300: "#cbc0f2",
          400: "#b09ce9",
          500: "#9575de",
          600: "#8356d1",
          700: "#7344bd",
          800: "#60389f",
          900: "#503082",
          950: "#321d58",
        },
        secondary: {
          50: "#fcf3f7",
          100: "#fbe8f1",
          200: "#f8d2e5",
          300: "#f4adce",
          400: "#e966a0",
          500: "#e2528d",
          600: "#d0326b",
          700: "#b42253",
          800: "#951f46",
          900: "#7c1f3d",
          950: "#4b0c20",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
