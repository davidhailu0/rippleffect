import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        'custom-shadow': '0px 0px 4px 1px #D7B398, 0 0 3px 1px #D7B398, 0 0 10px 5px #D7B398',
      },
      screens:{
        'xs':'375'
      }
    },
  },
  plugins: [],
};
export default config;
