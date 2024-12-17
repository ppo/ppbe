import { getStaticFullUrl } from '@/lib/url.mjs';
import { SITEMAP_ROUTE } from '@/settings.mjs';


const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${ getStaticFullUrl(SITEMAP_ROUTE) }
Feed: ${ getStaticFullUrl(ROUTES.rss) }
`.trim();


export const GET = () => {
  return new Response(robotsTxt, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
