// TODO: Mix object (to simplify the functions) & functions (for easier interface)
// TODO: Hydrate article => article.url
/*
article: {
  collection: 'blog',
  id: 'example-post-1.md',
  slug: 'example-post-1',
  filePath: 'src/content/blog/example-post-1.md',
  digest: '510c77829f3dd993',
  data: // see content/config › blog
  body: '[…]',
  rendered: {
    html: '[…]',
    metadata: { headings: [Array], imagePaths: [], frontmatter: [Object] }
  },
  render: [Function: render]
}
*/


import { getCollection } from 'astro:content';

import { BLOG_NUM_ON_HOME, BLOG_NUM_RELATED } from '@/settings';

import { getNamedPath } from '@/lib/url';


async function _getRawArticles(collection, sorted = false) {
  const rawArticles = (await getCollection(collection));
    // .filter((a) => !isFutureArticle(a));
  return sorted ? sortArticles(rawArticles) : rawArticles;
}


/**
 * Get all blog articles sorted by creation date (newest first).
 */
export async function getArticles(collection) {
  const rawArticles = await _getRawArticles(collection, true);
  return hydrateArticles(rawArticles);
}


/**
 * Get all blog articles for RSS feed.
 */
export async function getArticlesForRss(collection) {
  const rawArticles = await _getRawArticles(collection, true);
  const articles = hydrateArticles(rawArticles);
  return articles.map((a) => ({
    title: a.data.title,
    description: a.data.abstract,
    pubDate: a.data.publishedAt,
    link: a.url,
    categories: a.data.tags,
  }));
}


/**
 * Get all unique categories.
 */
export async function getCategories(collection) {
  const rawArticles = await _getRawArticles(collection);
  const categories = new Set(rawArticles.map((a) => a.data.category).filter(Boolean));
  return Array.from(categories);
}


/**
 * Get all unique tags.
 */
export async function getTags(collection) {
  const rawArticles = await _getRawArticles(collection);
  const tags = new Set(rawArticles.flatMap((a) => a.data.tags || []));
  return Array.from(tags);
}


/**
 * Get featured articles.
 */
export async function getFeaturedArticles(collection, limit = BLOG_NUM_ON_HOME) {
  const rawArticles = await _getRawArticles(collection);
  const featuredArticles = sortArticles(rawArticles.filter((a) => a.data.featured));
  const articles = limit ? featuredArticles.slice(0, limit) : featuredArticles;
  return hydrateArticles(articles);
}


/**
 * Get latest articles.
 */
export async function getLatestArticles(collection, limit = BLOG_NUM_ON_HOME) {
  const rawArticles = await _getRawArticles(collection);
  const featuredArticles = sortArticles(rawArticles, true);
  const articles = limit ? featuredArticles.slice(0, limit) : featuredArticles;
  return hydrateArticles(articles);
}


/**
 * Get previous and next articles for a given article.
 */
export async function getAdjacentArticles(refArticle) {
  const rawArticles = await _getRawArticles(refArticle.collection, true);
  const currentIndex = rawArticles.findIndex((a) => a.data.slug === refArticle.data.slug);
  const prevIndex = currentIndex < rawArticles.length - 1 ? currentIndex + 1 : null;
  const nextIndex = currentIndex > 0 ? currentIndex - 1 : null;

  return {
    prev: prevIndex === null ? null : hydrateArticle(rawArticles[prevIndex]),
    next: nextIndex === null ? null : hydrateArticle(rawArticles[nextIndex]),
  };
}


/**
 * Get linked articles for a given article.
 */
export async function getLinkedArticles(refArticle) {
  const rawArticles = await _getRawArticles(refArticle.collection);
  const articles = rawArticles.filter((a) => (
    refArticle.data.linked?.filter((la) => la.id === a.id).length > 0
  ));
  return hydrateArticles(sortArticles(articles));
}


/**
 * Get related articles for a given article (same category or shared tags).
 */
export async function getRelatedArticles(refArticle, limit = BLOG_NUM_RELATED) {
  const rawArticles = await _getRawArticles(refArticle.collection);
  const relatedArticles = rawArticles.filter((a) => (
    // Exclude current article
    a.data.slug !== refArticle.data.slug
    && (
      // Same category or shared tags
      a.data.category === refArticle.data.category
      || a.data.tags?.some((tag) => refArticle.data.tags?.includes(tag))
    )
  ));
  const articles = limit ? relatedArticles.slice(0, limit) : relatedArticles;
  return hydrateArticles(sortArticles(articles));
}


/**
 * Get a single article by its slug.
 */
export async function getArticleBySlug(collection, slug) {
  const rawArticles = await _getRawArticles(collection);
  const article = rawArticles.find((a) => a.data.slug === slug);
  return hydrateArticle(article);
}


/**
 * Get articles by category.
 */
export async function getArticlesByCategory(collection, category) {
  const rawArticles = await _getRawArticles(collection);
  const articles = rawArticles.filter((a) => a.data.category === category);
  return hydrateArticles(sortArticles(articles));
}


/**
 * Get articles by tag.
*/
export async function getArticlesByTag(collection, tag) {
  const rawArticles = await _getRawArticles(collection);
  const articles = rawArticles.filter((a) => a.data.tags?.includes(tag));
  return hydrateArticles(sortArticles(articles));
}


/**
 * Helper function to hydrate the given article.
 *
 * Add `url`.
 */
function hydrateArticle(article) {
  article.url = getNamedPath(article.collection, article.data.slug);
  return article;
}


/**
 * Helper function to hydrate all articles.
 */
function hydrateArticles(articles) {
  return articles.map((a) => hydrateArticle(a));
}


/**
 * Helper function to sort articles by date.
 */
function sortArticles(articles, featuredFirst = false) {
  return articles.sort((a, b) => {
    if (featuredFirst) {
      if (a.data.featured && !b.data.featured) return -1;
      if (!a.data.featured && b.data.featured) return 1;
    }

    return +new Date(b.data.publishedAt) - +new Date(a.data.publishedAt)
    // ALTERNATIVE VERSION: b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
  });
}


/**
 * Helper function to check if the article must not yet be published.
 */
export function isFutureArticle(article) {
  return article ? article.data.publishedAt > new Date() : false;
}


/**
 * Remove the "category tag" from the tag list.
 */
export function removeCategoryFromTags(tags, category) {
  return tags.filter((t) => t !== category);
}


/**
 * Format a list of tags for display.
*/
export function formatTags(tags) {
  return tags.map((t) => {
    return '#' + t
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .replace(/[ -]/g, '');
  }).join(' ');
}
