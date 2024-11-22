// @ts-check
import { defineConfig } from 'astro/config';

import { APP_SLUG, SITE_URL } from './src/settings.mjs'; // Note: Import aliases don't work here.


// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  server: { // Used by `astro dev` & `astro preview`
    host: `${APP_SLUG}.test`,
  },
});
