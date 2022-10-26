/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import {theme} from "./theme/src/index"

const config = {
  prefix: "tw-",
  variants: {
    extend: {
      display: ['group-hover'],
      visibility: ['group-hover'],
      overflow: ['group-hover'],
      textOverflow: ['group-hover'],
      whiteSpace: ['group-hover'],
      width: ['group-hover'],
      backgroundColor: ['even', 'odd', 'first', 'last'],
      backgroundOpacity: ['even', 'odd', 'first', 'last'],
      border: ['even', 'odd', 'first', 'last'],
    },
  },
  plugins: [typography],
  theme
};

export default config