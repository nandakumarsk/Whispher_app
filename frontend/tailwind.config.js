import daisyui from 'daisyui';
import daisyUIThemes from "daisyui/src/theming/themes";
 

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [ daisyui],
  daisyui: {
    themes: [
      "light",
      {
        black: {
           ...daisyUIThemes["black"],
           primary: "rgb(75, 0, 130)", /* A deep indigo/purple shade */
           secondary: "rgb(50, 0, 70)", /* A darker purple tone */
           
        },
      },
    ],
  },

}

