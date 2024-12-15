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
        'text-dim': '#666',
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
            },
            'img, svg': {
              fill: 'currentColor',
              /* stroke: 'currentColor', */
            }

          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
