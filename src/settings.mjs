export const APP_SLUG = 'ppbe';
export const SITE_URL = 'https://pascal.polleunus.be';
export const SITE_NAME = 'Pascal Polleunus';

export const MY_NAME = 'Pascal Polleunus';
export const MY_EMAIL = 'pascal@polleunus.be';

export const COPYRIGHT_NAME = MY_NAME;
export const COPYRIGHT_START_YEAR = 1974;


// HEAD ============================================================================================

// Settings for the HTML <head>.
export const HTML_HEAD = {
  title: SITE_NAME,
  titleSeparator: ' :: ',
  description: 'Pascal Polleunus’ personal website.',
  twitterUsername: 'ppolleunus',
};


// ROUTES & URLS ===================================================================================

// Named routes (as name: path).
export const ROUTES = {
  home: '/',
};

// URL of the sitemap.
export const SITEMAP_ROUTE = '/sitemap-index.xml';


// DESIGN ==========================================================================================

/** @type {import('./types/settings').Fonts} */
export const FONTS = {
  display: { name: 'Atkinson Hyperlegible', weights: [400, 700], },  // Available: 4, 7
  body: { name: 'Roboto', weights: [100, 300, 400, 500], },  // Available: 1, 3, 4, 5, 7, 9
  // icons: { name: 'Material Icons', },
};


// SERVICES ========================================================================================

// Google Analytics: Tracking ID.
export const GOOGLE_ANALYTICS_TRACKING_ID = 'UA-162951120-1';
