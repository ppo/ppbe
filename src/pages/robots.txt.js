import { SITEMAP_ROUTE } from '@/settings.mjs';


const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${ new URL(SITEMAP_ROUTE, import.meta.env.SITE).href }
`.trim();


export const GET = () => {
  return new Response(robotsTxt, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
