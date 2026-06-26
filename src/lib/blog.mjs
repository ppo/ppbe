// TODO: Mix object (to simplify the functions) & functions (for easier interface)
/*
article: {
  collection: 'blog',
  id: 'example-post-1',
  slug: 'example-post-1',
  filePath: 'src/content/blog/251231.example-post-1.md',
  digest: '510c77829f3dd993',
  data: // see `src/content.config.mjs` › blog
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


const DEFAULT_COLLECTION = 'blog';

// Operations for `getRawArticles()`.
const OP_HYDRATE = 1;
const OP_SORT = 2;
const ALL_OPS = OP_HYDRATE | OP_SORT;

let _baseUrl;  // Lazy initialization in `hydrateArticle()`.


// RAW ARTICLES ====================================================================================

/**
 * Return all articles, with global filtering and processing. Optionally with requested operations.
*/
export async function getRawArticles(collection=DEFAULT_COLLECTION, operations=undefined) {
  const collectionEntries = await getCollection(collection);

  let rawArticles = [];
  collectionEntries.map((article) => {
    // DISABLED: Include future articles as handled in rendering.
    // // Discard future articles.
    // if (isFutureArticle(article)) return;

    // Hydration.
    if (operations & OP_HYDRATE) {
      article = hydrateArticle(article);
    }

    rawArticles.push(article);
  });

  // Sorting.
  if (operations & OP_SORT) {
    rawArticles = sortArticles(rawArticles);
  }

  return rawArticles;
}


// OPERATIONS ======================================================================================

/**
 * Return the hydrated article.
 */
export function hydrateArticle(article) {
  _baseUrl = _baseUrl || getNamedPath(article.collection);  // Lazy initialization.

  article.url = `${_baseUrl}/${article.data.slug}`;

  return article;
}


/**
 * Return the list of hydrated articles.
 */
function hydrateArticles(articles) {
  return articles.map((article) => hydrateArticle(article));
}


/**
 * Return whether the article is to be published in the future.
 */
export function isFutureArticle(article) {
  return article ? article.data.publishedAt > new Date() : false;
}


/**
 * Return the list of articles sorted by date; and featured if requested.
*/
function sortArticles(articles, featuredFirst=false) {
  return articles.sort((a, b) => {
    if (featuredFirst) {
      // Happens if only one of the articles is `featured`.
      if (a.data.featured && !b.data.featured) return -1;  // a comes before b.
      if (!a.data.featured && b.data.featured) return 1;   // b comes before a.
    }

    // Sort on `publishedAt`.
    return +new Date(b.data.publishedAt) - +new Date(a.data.publishedAt)
    // ALTERNATIVE VERSION: b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
  });
}


// LIST GETTERS ====================================================================================

/**
 * Return the list of published articles; hydrated and sorted.
 */
export async function getArticles(collection=DEFAULT_COLLECTION) {
  const articles = await getRawArticles(collection, ALL_OPS);
  return articles;
}


/**
 * Return the list of articles for the RSS feed.
 */
export async function getArticlesForRss(collection=DEFAULT_COLLECTION) {
  const rawArticles = await getRawArticles(collection, ALL_OPS);

  // Build data for RSS.
  const rssArticles = rawArticles.map((article) => ({
    title: article.data.title,
    description: article.data.abstract,
    pubDate: article.data.publishedAt,
    link: article.url,
    categories: article.data.tags,
  }));

  return rssArticles;
}


/**
 * Return the list of featured articles; hydrated and sorted.
 */
export async function getFeaturedArticles(collection=DEFAULT_COLLECTION, limit=BLOG_NUM_ON_HOME) {
  const rawArticles = await getRawArticles(collection);

  // Filter by featured.
  const featuredArticles = rawArticles.filter((article) => article.data.featured);
  // Sorting.
  const sortedArticles = sortArticles(featuredArticles);
  // Slicing.
  const limitedArticles = limit ? sortedArticles.slice(0, limit) : sortedArticles;
  // Hydration.
  const articles = hydrateArticles(limitedArticles);

  return articles;
}


/**
 * Return the list of latest articles; hydrated and sorted.
 */
export async function getLatestArticles(collection=DEFAULT_COLLECTION, limit=BLOG_NUM_ON_HOME) {
  const rawArticles = await getRawArticles(collection, OP_SORT);

  // Slicing.
  const limitedArticles = rawArticles.slice(0, limit);
  // Hydration.
  const articles = hydrateArticles(limitedArticles);

  return articles;
}


/**
 * Return the list of related articles, sorted as defined; hydrated.
 */
export async function getRelatedArticles(refArticle) {
  // No related?
  if (!refArticle.data.related) return;
  // Cached?
  if (refArticle.relatedArticles) return refArticle.relatedArticles;

  // Get each related article by ID; hydrated. With caching. No sorting.
  refArticle.relatedArticles = await Promise.all(
    refArticle.data.related.map(({ id }) => getArticleById(id, refArticle.collection))
  );

  return refArticle.relatedArticles;
}


/**
 * Return the list of similar articles; hydrated and sorted.
 */
export async function getSimilarArticles(refArticle, limit=BLOG_NUM_RELATED) {
  const rawArticles = await getRawArticles(refArticle.collection);

  // Filter by similarity.
  const similarArticles = rawArticles.filter((article) => (
    // Exclude current article
    article.data.slug !== refArticle.data.slug
    && (
      // Same category or shared tags
      article.data.category === refArticle.data.category
      || article.data.tags?.some((tag) => refArticle.data.tags?.includes(tag))
    )
  ));
  // Sorting.
  const sortedArticles = sortArticles(similarArticles);
  // Slicing.
  const limitedArticles = limit ? sortedArticles.slice(0, limit) : sortedArticles;
  // Hydration.
  const articles = hydrateArticles(limitedArticles);

  return articles;
}

/**
 * Return the previous and next articles for the given article; hydrated.
 */
export async function getAdjacentArticles(refArticle) {
  const rawArticles = await getRawArticles(refArticle.collection, OP_SORT);

  // Get index of current article.
  const currentIndex = rawArticles.findIndex((a) => a.data.slug === refArticle.data.slug);
  // Calculate previous & next indexes.
  const prevIndex = currentIndex < rawArticles.length - 1 ? currentIndex + 1 : null;
  const nextIndex = currentIndex > 0 ? currentIndex - 1 : null;

  return {
    prev: prevIndex === null ? null : hydrateArticle(rawArticles[prevIndex]),
    next: nextIndex === null ? null : hydrateArticle(rawArticles[nextIndex]),
  };
}


// "BY" GETTERS ====================================================================================

/**
 * Return all articles in the given category; hydrated and sorted.
 */
export async function getArticlesByCategory(category, collection=DEFAULT_COLLECTION) {
  const rawArticles = await getRawArticles(collection);

  // Filter articles by category.
  const filteredArticles = rawArticles.filter((article) => article.data.category === category);
  // Hydration & sorting.
  const articles = sortArticles(hydrateArticles(filteredArticles));

  return articles;
}


/**
 * Return all articles having the given tag; hydrated and sorted.
*/
export async function getArticlesByTag(tag, collection=DEFAULT_COLLECTION) {
  const rawArticles = await getRawArticles(collection);

  // Filter articles by tag.
  const filteredArticles = rawArticles.filter((article) => (
    article.data.category === tag || article.data.tags?.includes(tag)
  ));
  // Hydration & sorting.
  const articles = sortArticles(hydrateArticles(filteredArticles));

  return articles;
}


/**
 * Return the article having the given ID; hydrated.
 */
export async function getArticleById(id, collection=DEFAULT_COLLECTION) {
  const rawArticles = await getRawArticles(collection);
  // Find and hydration.
  const article = hydrateArticle(rawArticles.find((article) => article.id === id));
  return article;
}


/**
* Return the article having the given slug; hydrated.
  */
export async function getArticleBySlug(slug, collection=DEFAULT_COLLECTION) {
  const rawArticles = await getRawArticles(collection);
  // Find and hydration.
  const article = hydrateArticle(rawArticles.find((article) => article.data.slug === slug));
  return article;
}


// CATEGORIES & TAGS ===============================================================================

/**
 * Return the list of unique categories; sorted.
 */
export async function getCategories(collection=DEFAULT_COLLECTION) {
  const rawArticles = await getRawArticles(collection);

  // Get unique categories.
  const rawCategories = Array.from(new Set(
    rawArticles.map((article) => article.data.category)
      .filter(Boolean)  // Remove falsy values (false, 0, '', null, undefined, NaN).
  ));
  // Sorting.
  const categories = rawCategories.sort((a, b) => a.localeCompare(b));

  return categories;
}


/**
 * Return the list of unique tags; sorted.
 */
export async function getTags(collection=DEFAULT_COLLECTION) {
  const rawArticles = await getRawArticles(collection);

  // Get unique tags.
  const rawTags = Array.from(new Set(
    // rawArticles.flatMap((article) => article.data.tags)
    rawArticles.flatMap((article) => [article.data.category, ...article.data.tags])
      .filter(Boolean)  // Remove falsy values (false, 0, '', null, undefined, NaN).
  ));
  // Sorting.
  const tags = rawTags.sort((a, b) => a.localeCompare(b));

  return tags;
}
