import { defineCollection, z } from 'astro:content';

const hero = z.object({
  image: z.string().nullish(),
  video: z.string().nullish(),
  alt: z.string().nullish(),
  title: z.string().nullish(),
  subtitle: z.string().nullish(),
  url: z.string().nullish(),
  caption: z.string().nullish(),
  captionUrl: z.string().nullish(),
  captionIsHtml: z.boolean().nullish(),
  class: z.string().nullish(),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().nullish(),
    abstract: z.string().nullish(),
    featured: z.boolean().nullish(),
    category: z.string().nullish(),
    tags: z.array(z.string()).nullish(),
    hero: hero.nullish(),
    // collection: z.string().nullish(),
    // related: z.array(reference('blog')).nullable(),  // References to other blog articles, using their `slug`.
    // author: z.string(),
    publishedAt: z.date().nullable(), // The reference date for sorting
    createdAt: z.date().nullish(), // When the content was originally created, defaults to publishedAt.
    // OR? z.string().datetime()
    //OR? z.coerce.date() // Transform string to Date object
  }),
});

// TODO: const books = defineCollection({});
// TODO: const projects = defineCollection({});


// Note: The key should match the collection directory name in `src/content`.
export const collections = {
  blog,
};
