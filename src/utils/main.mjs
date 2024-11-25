import { HTML_HEAD } from '@/settings.mjs';


/**
 * Returns the first argument that is not `undefined`.
 */
export function getFirstDefined() {
  for (const arg of arguments) {
    if (arg !== undefined) return arg;
  }
}


/**
 * @param {...(string|undefined)} titles - Title(s) to be merged.
 * @returns {string} - The merged title, or the default title.
 */
export function joinHeadTitle(...titles) {
  return titles.filter(a => a).join(HTML_HEAD.titleSeparator);
}
