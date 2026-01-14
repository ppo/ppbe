export const WHERE_AM_I = '🇵🇹 Milfontes, Portugal'.replaceAll(' ', ' ');


// MAIN ============================================================================================

export const APP_SLUG = 'ppbe';
export const SITE_URL = 'https://pascal.polleunus.be';
export const SITE_NAME = 'Pascal Polleunus';
export const MY_EMAIL = 'pascal@polleunus.be';

export const IS_DEV = import.meta.env.MODE == 'development';
export const IS_PROD = !IS_DEV;


// HEAD ============================================================================================

// Settings for the HTML <head>.
export const HTML_HEAD = {
  title: SITE_NAME,
  titleSeparator: ' • ',
  description: 'Pascal Polleunus’ personal website.',
  // image: '',
  author: 'Pascal Polleunus',
  twitterUsername: 'ppolleunus',
};


// ROUTES & URLS ===================================================================================

// Named routes (as name: path).
export const ROUTES = {
  home:            '/',
  about:           '/about',
  blog:            '/blog',
  vanbuildrethink: '/vanbuildrethink',
  mp25:            '/master-plan-2025',
  cv:              '/cv',

  rss:     '/rss.xml',
  sitemap: '/sitemap-index.xml',
};

// Named URLs (as name: path).
export const URLS = {
  facebook:  'https://www.facebook.com/pascal.polleunus.be',
  github:    'https://github.com/ppo',
  instagram: 'https://www.instagram.com/ppolleunus',
  linkedin:  'https://www.linkedin.com/in/pascal-polleunus/',
  x:         'https://x.com/ppolleunus',
  youtube:   'https://www.youtube.com/@ppolleunus',

  unitygz: 'https://unitygz.com/',
};


// NAVS ============================================================================================

// Elements of the main nav.
/** @type {import('./types/settings').Nav} */
export const MAIN_NAV = [
  { label: 'Unity GZ', url: URLS.unitygz, style: 'highlight' },
  { label: 'Blog',     url: ROUTES.blog, },
  { label: 'About',    url: ROUTES.about, },
];

// Elements of the social nav.
/** @type {import('./types/settings').Nav} */
export const SOCIAL_NAV = [
  { label: 'Facebook',  icon: 'simple-icons:facebook',  url: URLS.facebook, },
  { label: 'GitHub',    icon: 'simple-icons:github',    url: URLS.github, },
  { label: 'Instagram', icon: 'simple-icons:instagram', url: URLS.instagram, },
  { label: 'LinkedIn',  icon: 'simple-icons:linkedin',  url: URLS.linkedin, },
  { label: 'X/Twitter', icon: 'simple-icons:x',         url: URLS.x, },
  { label: 'YouTube',   icon: 'simple-icons:youtube',   url: URLS.youtube, },
];

// Elements of the social nav.
/** @type {import('./types/settings').Nav} */
export const FOOTER_NAV = [
  ...SOCIAL_NAV,
  null,
  { label: 'RSS Feed', icon: 'simple-icons:rss', url: ROUTES.rss, },
];

// Elements of the link page (@) nav.
/** @type {import('./types/settings').Nav} */
export const LINK_PAGE_NAV = [
  { label: 'Website', icon: 'mdi:home', url: SITE_URL, },
  null,
  ...SOCIAL_NAV,
];


// DESIGN ==========================================================================================

/** @type {import('./types/settings').Fonts} */
export const FONTS = {
  // display: { name: 'Atkinson Hyperlegible', weights: [700], },  // Available: 4, 7
  display: { name: 'Alan Sans', weights: [300, 500, 600], },  // Available: 3-9
  body: { name: 'Roboto', weights: [400, 500], },  // Available: 1-9
  mono: { name: 'Roboto Mono', weights: [400, 500], },  // Available: 1-7
  // icons: { name: 'Material Icons', },
};


// SERVICES ========================================================================================

// Google Analytics: Tracking ID.
export const GOOGLE_ANALYTICS_TRACKING_ID = 'G-1HW5P0NNDY';


// FEATURES ========================================================================================

// BLOG
export const BLOG_NUM_ON_HOME = 3;
export const BLOG_NUM_RELATED = 3;
