import { getCollection } from 'astro:content';

import { getNamedPath } from '@/lib/url';
import { BLOG_NUM_FEATURED_ON_HOME, BLOG_NUM_RELATED } from '@/settings.mjs';


async function _getRawArticles() {
  return await getCollection('blog');
}

/**
 * Get all blog articles sorted by creation date (newest first).
 */
export async function getArticles() {
  const articles = await _getRawArticles();
  return sortArticles(articles);
}


/**
 * Get all blog articles for RSS feed.
 */
export async function getArticlesForRss() {
  const articles = await _getRawArticles();
  return transformArticlesForRss(articles);
}


/**
 * Get all unique categories.
 */
export async function getCategories() {
  const articles = await _getRawArticles();
  const categories = new Set(articles.map((a) => a.data.category).filter(Boolean));
  return Array.from(categories);
}


/**
 * Get all unique tags.
 */
export async function getTags() {
  const articles = await _getRawArticles();
  const tags = new Set(articles.flatMap((a) => a.data.tags || []));
  return Array.from(tags);
}


/**
 * Get previous and next articles for a given article.
 */
export async function getAdjacentArticles(refArticle) {
  const articles = await getArticles();
  const currentIndex = articles.findIndex((a) => a.slug === refArticle.slug);

  return {
    prev: currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null,
    next: currentIndex > 0 ? articles[currentIndex - 1] : null,
  };
}


/**
 * Get featured articles.
 */
export async function getFeaturedArticles(limit = BLOG_NUM_FEATURED_ON_HOME) {
  const articles = await _getRawArticles();
  const featuredArticles = sortArticles(articles.filter((a) => a.data.featured));
  return limit ? featuredArticles.slice(0, limit) : featuredArticles;
}


/**
 * Get a single article by its slug.
 */
export async function getArticleBySlug(slug) {
  const articles = await _getRawArticles();
  return articles.find((a) => a.slug === slug);
}


/**
 * Get articles by category.
 */
export async function getArticlesByCategory(category) {
  const articles = await getArticles();
  return articles.filter((a) => a.data.category === category);
}


/**
 * Get articles by tag.
 */
export async function getArticlesByTag(tag) {
  const articles = await getArticles();
  return articles.filter((a) => a.data.tags?.includes(tag));
}


/**
 * Get related articles for a given article.
 *
 * Criteria: Same category or shared tags.
 */
export async function getRelatedArticles(refArticle, limit = BLOG_NUM_RELATED) {
  const articles = (await getArticles())
    .filter((a) => a.slug !== refArticle.slug) // Exclude current article
    .filter((a) => (
      a.data.category === refArticle.data.category ||
      a.data.tags?.some((tag) => refArticle.data.tags?.includes(tag))
    ));
  return limit ? articles.slice(0, limit) : articles;
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
 * Helper function to map articles for RSS feeds.
 */
function transformArticlesForRss(articles) {
  return articles.map((a) => ({
    title: a.data.title,
    description: a.data.abstract,
    pubDate: a.data.publishedAt,
    link: getNamedPath('blog', a.slug),
    categories: a.data.tags,
  }));
}
