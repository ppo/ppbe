import { getCollection } from 'astro:content';

import { NUM_FEATURED_ARTICLES_ON_HOME } from '@/settings.mjs';


/**
 * Get all blog articles sorted by creation date (newest first)
 */
export async function getAllArticles() {
  const articles = await getCollection('blog');
  return sortArticles(articles);
}

/**
 * Get a single article by its slug
 */
export async function getArticleBySlug(slug) {
  const articles = await getCollection('blog');
  return articles.find(article => article.slug === slug);
}

/**
 * Get featured articles
 */
export async function getFeaturedArticles(limit = NUM_FEATURED_ARTICLES_ON_HOME) {
  const articles = await getCollection('blog');
  const featuredArticles = sortArticles(articles.filter(article => article.data.featured));
  return limit ? featuredArticles.slice(0, limit) : featuredArticles;
}

/**
 * Get previous and next articles for a given article
 */
export async function getAdjacentArticles(refArticle) {
  const articles = await getAllArticles();
  const currentIndex = articles.findIndex(article => article.slug === refArticle.slug);

  return {
    prev: currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null,
    next: currentIndex > 0 ? articles[currentIndex - 1] : null,
  };
}

/**
 * Get articles by category
 */
export async function getArticlesByCategory(category) {
  const articles = await getAllArticles();
  return articles.filter(article => article.data.category === category);
}

/**
 * Get articles by tag
 */
export async function getArticlesByTag(tag) {
  const articles = await getAllArticles();
  return articles.filter(article => article.data.tags?.includes(tag));
}

/**
 * Get related articles for a given article
 */
export async function getRelatedArticles(article, limit = 3) {
  const articles = await getAllArticles();

  return articles
    .filter(p => p.slug !== article.slug) // Exclude current article
    .filter(p => (
      p.data.category === article.data.category || // Same category
      p.data.tags?.some(tag => article.data.tags?.includes(tag)) // Shared tags
    ))
    .slice(0, limit);
}

/**
 * Get all unique categories
 */
export async function getAllCategories() {
  const articles = await getAllArticles();
  const categories = new Set(articles.map(article => article.data.category).filter(Boolean));
  return Array.from(categories);
}

/**
 * Get all unique tags
 */
export async function getAllTags() {
  const articles = await getAllArticles();
  const tags = new Set(articles.flatMap(article => article.data.tags || []));
  return Array.from(tags);
}

/**
 * Helper function to sort articles by date
 */
function sortArticles(articles) {
  return articles.sort((a, b) =>
    +new Date(b.data.publishedAt) - +new Date(a.data.publishedAt)
    // ALTERNATIVE VERSION: b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
  );
}
