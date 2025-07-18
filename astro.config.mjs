// @ts-check
import { defineConfig } from 'astro/config';

import { APP_SLUG, SITE_URL } from './src/settings'; // Note: Import aliases don't work here.

import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from "@tailwindcss/vite";
import icon from 'astro-icon';


// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),

  trailingSlash: 'never',
  integrations: [
    icon(),
    mdx(),
    partytown(),
    sitemap(),
  ],
  vite: {
    plugins: [ tailwindcss() ],
  },

  site: SITE_URL,
  server: { // Used by `astro dev` & `astro preview`
    host: `${APP_SLUG}.test`,
  },
});
