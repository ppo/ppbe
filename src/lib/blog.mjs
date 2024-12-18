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

import { getNamedPath } from '@/lib/url';
import { BLOG_NUM_FEATURED_ON_HOME, BLOG_NUM_RELATED } from '@/settings.mjs';


async function _getRawArticles(sorted = false) {
  const rawArticles = await getCollection('blog');
  return sorted ? sortArticles(rawArticles) : rawArticles;
}

/**
 * Get all blog articles sorted by creation date (newest first).
 */
export async function getArticles() {
  const rawArticles = await _getRawArticles(true);
  return hydrateArticles(rawArticles);
}


/**
 * Get all blog articles for RSS feed.
 */
export async function getArticlesForRss() {
  const rawArticles = await _getRawArticles(true);
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
export async function getCategories() {
  const rawArticles = await _getRawArticles();
  const categories = new Set(rawArticles.map((a) => a.data.category).filter(Boolean));
  return Array.from(categories);
}


/**
 * Get all unique tags.
 */
export async function getTags() {
  const rawArticles = await _getRawArticles();
  const tags = new Set(rawArticles.flatMap((a) => a.data.tags || []));
  return Array.from(tags);
}


/**
 * Get previous and next articles for a given article.
 */
export async function getAdjacentArticles(refArticle) {
  const rawArticles = await _getRawArticles(true);
  const currentIndex = rawArticles.findIndex((a) => a.slug === refArticle.slug);
  const prevIndex = currentIndex < rawArticles.length - 1 ? currentIndex + 1 : null;
  const nextIndex = currentIndex > 0 ? currentIndex - 1 : null;

  return {
    prev: prevIndex === null ? null : hydrateArticle(rawArticles[prevIndex]),
    next: nextIndex === null ? null : hydrateArticle(rawArticles[nextIndex]),
  };
}


/**
 * Get featured articles.
 */
export async function getFeaturedArticles(limit = BLOG_NUM_FEATURED_ON_HOME) {
  const rawArticles = await _getRawArticles();
  const featuredArticles = sortArticles(rawArticles.filter((a) => a.data.featured));
  const articles = limit ? featuredArticles.slice(0, limit) : featuredArticles;
  return hydrateArticles(articles);
}


/**
 * Get related articles for a given article.
 */
export async function getRelatedArticles(refArticle, limit = BLOG_NUM_RELATED) {
  const rawArticles = await _getRawArticles();
  const relatedArticles = rawArticles.filter((a) => (
    // Exclude current article
    a.slug !== refArticle.slug && (
      // Same category or shared tags
      a.data.category === refArticle.data.category ||
      a.data.tags?.some((tag) => refArticle.data.tags?.includes(tag))
    )
  ));
  const articles = limit ? relatedArticles.slice(0, limit) : relatedArticles;
  return hydrateArticles(sortArticles(articles));
}


/**
 * Get a single article by its slug.
 */
export async function getArticleBySlug(slug) {
  const rawArticles = await _getRawArticles();
  return rawArticles.find((a) => a.slug === slug);
}


/**
 * Get articles by category.
 */
export async function getArticlesByCategory(category) {
  const rawArticles = await _getRawArticles();
  const articles = rawArticles.filter((a) => a.data.category === category);
  return hydrateArticles(sortArticles(articles));
}


/**
 * Get articles by tag.
*/
export async function getArticlesByTag(tag) {
  const rawArticles = await _getRawArticles();
  const articles = rawArticles.filter((a) => a.data.tags?.includes(tag));
  return hydrateArticles(sortArticles(articles));
}


/**
 * Helper function to hydrate the given article.
 *
 * Add `url`.
 */
function hydrateArticle(article) {
  article.url = getNamedPath('blog', article.slug);
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
function sortArticles(articles) {
  return articles.sort((a, b) =>
    +new Date(b.data.publishedAt) - +new Date(a.data.publishedAt)
    // ALTERNATIVE VERSION: b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
  );
}


/**
 * Remove the "category tag" from the tag list.
 */
export function removeCategoryFromTags(tags, category) {
  if (!tags || tags.length === 0) return tags;
  const categoryTag = category.replace(' ', '');
  return tags.filter((t) => t !== categoryTag);
}
