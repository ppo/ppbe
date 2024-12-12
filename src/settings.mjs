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
  home:  '/',
  about: '/about',
  cv:    '/cv',
};

// URL of the sitemap.
export const SITEMAP_ROUTE = '/sitemap-index.xml';

// Named URLs (as name: path).
export const URLS = {
  facebook:  'https://www.facebook.com/pascal.polleunus',
  github:    'https://github.com/ppo',
  instagram: 'https://www.instagram.com/ppolleunus',
  linkedin:  'https://www.linkedin.com/in/pascal-polleunus/',
  x:         'https://x.com/ppolleunus',
};


// NAVS ============================================================================================

// Elements of the main nav.
/** @type {import('./types/settings').Nav} */
export const MAIN_NAV = [
  {label: 'About',   url: ROUTES.about, },
];

// Elements of the social nav.
/** @type {import('./types/settings').Nav} */
export const SOCIAL_NAV = [
  {label: 'Instagram', icon: 'instagram', url: URLS.instagram, },
  {label: 'X/Twitter', icon: 'x',         url: URLS.x, },
  {label: 'LinkedIn',  icon: 'linkedin',  url: URLS.linkedin, },
  {label: 'GitHub',    icon: 'github',    url: URLS.github, },
  {label: 'Facebook',  icon: 'facebook',  url: URLS.facebook, },
];


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
