import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { render } from '../dist-ssr/entry-server.js';
import { metadata, siteOrigin } from '../src/site/content.js';
const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
await writeFile(new URL('../dist/spa.html', import.meta.url), template);
for (const [route, info] of Object.entries(metadata)) {
  const head = `<title>${escape(info.title)}</title>
<meta name="description" content="${escape(info.description)}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${siteOrigin}${route}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="CODERSA">
<meta property="og:title" content="${escape(info.title)}">
<meta property="og:description" content="${escape(info.description)}">
<meta property="og:url" content="${siteOrigin}${route}">
<meta property="og:image" content="${siteOrigin}/brand/og.png">
<meta name="twitter:card" content="summary_large_image">`;
  const html = template.replace(/<!--route-head-start-->[\s\S]*?<!--route-head-end-->/, head).replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${render(route)}</div>`);
  if (!html.includes('data-prerendered="true"') || !html.includes('<h1')) throw new Error(`Missing rendered content: ${route}`);
  const directory = new URL(`../dist${route === '/' ? '/' : route + '/'}`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), html);
  console.log(`Rendered ${route}`);
}
await writeFile(new URL('../dist/sitemap.xml', import.meta.url), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(metadata).map(route => `<url><loc>${siteOrigin}${route}</loc></url>`).join('')}</urlset>\n`);
await writeFile(new URL('../dist/robots.txt', import.meta.url), `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /login\nDisallow: /avaliar\nDisallow: /spa.html\nSitemap: ${siteOrigin}/sitemap.xml\n`);
