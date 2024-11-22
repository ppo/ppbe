// @ts-check
import { defineConfig } from 'astro/config';

import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

import { APP_SLUG, SITE_URL } from './src/settings.mjs'; // Note: Import aliases don't work here.


// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),

  integrations: [
    partytown(),
    sitemap(),
    tailwind(),
  ],

  site: SITE_URL,
  server: { // Used by `astro dev` & `astro preview`
    host: `${APP_SLUG}.test`,
  },
});
