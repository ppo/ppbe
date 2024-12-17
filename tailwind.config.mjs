import defaultTheme from 'tailwindcss/defaultTheme';

import { FONTS } from './src/settings.mjs';


/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#fafafa',
        text: '#333',
        dim: '#777',
        primary: '#1e88e5',
        secondary: '#7cb342',
      },
      fontFamily: {
        display: [FONTS.display.name],
        sans: [FONTS.body.name, ...defaultTheme.fontFamily.sans],
        // serif: ['???', ...defaultTheme.fontFamily.serif],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'h1, h2, h3, h4, h5, h6': {
              fontFamily: theme('fontFamily.display'),
              fontWeight: 700,
              // letterSpacing: '-0.01em', */
              // marginBlock: '1.2em 0.6em',
            },
            /* 1.200 - Minor Third: 3.584, 2.986, 2.489 2.074, 1.728, 1.440, 1.200 */
            // h1: { fontSize: '2.074em' },
            // h2: { fontSize: '1.728em' },
            // h3: { fontSize: '1.440em' },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
