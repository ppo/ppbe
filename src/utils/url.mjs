import { HTML_HEAD, ROUTES } from '@/settings.mjs';


/**
 * Returns the clean version of the given URL/path.
 *
 * Basically removes trailing slash.
 *
 * @param {(URL|string)} url URL or path.
 * @returns {string} The clean URL/path.
 */
export function cleanUrl(url) {
  const FAKE_BASE_URL = 'https://-fake-domain-.trick';

  const isUrl = url instanceof URL;
  const isRelative = (typeof url === 'string' && !url.startsWith('http') && !url.startsWith('/'));

  if (!isUrl) {
    url = new URL(url, FAKE_BASE_URL);
  }
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1);
  }
  if (!isUrl) {
    url = url.toString();
    if (url.startsWith(FAKE_BASE_URL)) url = url.slice(FAKE_BASE_URL.length);
    if (isRelative && url.startsWith('/')) url = url.slice(1);
  }

  return url;
}


/**
 * Returns the current URL path.
 *
 * @param {Object} Astro Astro global context.
 * @returns {string} Current URL path.
*/
export function getCurrentPath(Astro) {
  return cleanUrl(new URL(Astro.request.url)).pathname;
}


/**
 * Returns the full URL of the given path.
 *
 * @param {Object} Astro Astro global context.
 * @param {string} [path] URL path. Default: current path.
 * @returns {URL} The URL.
 */
export function getFullUrl(Astro, path) {
  const realPath = path
    ? ( path.startsWith('/') ? path : `${Astro.url.pathname}/${path}` )
    : Astro.url.pathname;
  return new URL(cleanUrl(realPath), Astro.site);
}


/**
 * Returns the full URL of the given image.
 *
 * @param {Object} Astro Astro global context.
 * @param {string|URL|null} image URL path.
 * @returns {(URL|null)} The image URL or null.
 */
export function getImageUrl(Astro, image) {
  if (typeof image === 'string') return getFullUrl(Astro, image);
  return image || null;
}


/**
 * Returns the full URL of the image for socials metadata.
 *
 * @param {Object} Astro Astro global context.
 * @param {string|URL|null} image URL path.
 * @returns {(URL|null)} The image URL or null.
 */
export function getMetaImageUrl(Astro, image) {
  image = image || HTML_HEAD.metaImage;
  return getImageUrl(Astro, image);
}


/**
 * Returns a path based on a named route.
 *
 * @param {string} name Name of the route.
 * @param {string|undefined} path Extra path to append to the named URL.
 * @returns {string} The path.
 */
export function getNamedPath(name, path) {
  if (!(name in ROUTES)) {
    throw new Error(`There's no route named '${name}'.`);
  }

  let route = ROUTES[name];
  path = path || '';

  if (route && route !== '/' && route.endsWith('/')) route = route.slice(0, -1);
  if (path && !path.startsWith('/')) path = '/' + path;

  return cleanUrl(route + path);
}


export function isCurrentPath(Astro, path) {
  path = path instanceof URL ? cleanUrl(path).pathname : cleanUrl(path);
  const currentPath = getCurrentPath(Astro);
  return path === '/' ? currentPath === path : currentPath.startsWith(path);
}
