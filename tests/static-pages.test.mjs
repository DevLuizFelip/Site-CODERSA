import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { metadata, siteOrigin } from '../src/site/content.js';
test('six institutional pages have route-specific initial HTML and metadata', async () => {
  const titles = new Set();
  for (const [route, meta] of Object.entries(metadata)) {
    const html = await readFile(new URL(`../dist${route === '/' ? '/' : route + '/'}index.html`, import.meta.url), 'utf8');
    assert.ok(html.includes('data-prerendered="true"'), route);
    assert.match(html, /<h1[^>]*>/);
    assert.ok(html.includes(meta.title), route);
    assert.ok(html.includes(`href="${siteOrigin}${route}"`), route);
    assert.match(html, /property="og:image"/);
    assert.doesNotMatch(html, /Login da Dashboard|Senha|Novo Lead<br/);
    titles.add(meta.title);
  }
  assert.equal(titles.size, 6);
});
test('private routes use an empty noindex shell and are absent from sitemap', async () => {
  const shell = await readFile(new URL('../dist/spa.html', import.meta.url), 'utf8');
  assert.match(shell, /<div id="root"><\/div>/);
  assert.match(shell, /noindex,follow/);
  const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
  assert.doesNotMatch(sitemap, /\/login|\/admin|\/avaliar/);
  assert.equal((sitemap.match(/<loc>/g) || []).length, 6);
});
test('hosting keeps Python API precedence and explicit public destinations', async () => {
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
  assert.deepEqual(config.rewrites[0], { source: '/api/(.*)', destination: '/api/index.py' });
  for (const route of Object.keys(metadata)) assert.ok(config.rewrites.some(rule => rule.source === route && rule.destination === (route === '/' ? '/index.html' : `${route}/index.html`)));
});
