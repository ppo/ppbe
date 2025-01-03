import rss from '@astrojs/rss';

import { getArticlesForRss } from '@/lib/blog';
import { getStaticFullUrl } from '@/lib/url';
import { HTML_HEAD } from '@/settings';


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
