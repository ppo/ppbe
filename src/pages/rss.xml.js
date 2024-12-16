import rss from '@astrojs/rss';

import { getArticlesForRss } from '@/lib/blog.mjs';
import { HTML_HEAD } from '@/settings.mjs';
import { getStaticFullUrl } from '@/utils/url.mjs';


export async function GET(context) {
  const blog = await getArticlesForRss();

  return rss({
    title: HTML_HEAD.title,
    description: HTML_HEAD.description,
    site: getStaticFullUrl('/'),
    trailingSlash: false,

    items: blog,

    // (optional) inject custom xml
    customData: '<language>en-us</language>',
  });
}
