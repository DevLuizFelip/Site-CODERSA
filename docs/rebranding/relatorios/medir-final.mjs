// Run from the repository root after npm run build and preview on port 4173.
// QA dependencies are isolated in the ignored .codex-qa.local directory.
import { chromium } from '../../../.codex-qa.local/node_modules/playwright/index.mjs';
import lighthouse from '../../../.codex-qa.local/node_modules/lighthouse/core/index.js';
import { writeFile } from 'node:fs/promises';

const routes = ['/', '/servicos', '/processo', '/portfolio', '/sobre', '/contato'];
const origin = 'http://127.0.0.1:4173';
const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--remote-debugging-port=9223'],
});
const output = {
  referenceDate: '2026-10-29', timeZone: 'America/Sao_Paulo',
  node: process.version, browser: browser.version(), lighthouse: '13.6.0',
  sourceCommit: '3b23b9a32e3d4396912a1fb0c5524cb4ae451b78 + rebrand working tree',
  origin, mode: 'local production build, mobile simulated throttling, light, cold storage per run',
  note: 'Real public GET dependencies; no form submissions. Not a production-domain or field audit.',
  runs: [],
};
try {
  for (const route of routes) {
    for (let run = 1; run <= 3; run++) {
      const result = await lighthouse(origin + route, {
        port: 9223, output: 'json', logLevel: 'error',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        formFactor: 'mobile', throttlingMethod: 'simulate',
        maxWaitForLoad: 45000,
      });
      const lhr = result.lhr;
      const entry = {
        route, run, fetchTime: lhr.fetchTime,
        scores: Object.fromEntries(Object.entries(lhr.categories).map(([key, category]) => [key, category.score === null ? null : Math.round(category.score * 100)])),
        metrics: Object.fromEntries(['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index'].map(key => [key, lhr.audits[key]?.numericValue ?? null])),
        runtimeError: lhr.runtimeError ?? null,
        warnings: lhr.runWarnings,
        failedAudits: Object.values(lhr.audits).filter(audit => audit.score !== null && audit.score < 1).map(audit => ({ id: audit.id, title: audit.title, score: audit.score, displayValue: audit.displayValue })),
        settings: { formFactor: lhr.configSettings.formFactor, throttling: lhr.configSettings.throttling, screenEmulation: lhr.configSettings.screenEmulation, throttlingMethod: lhr.configSettings.throttlingMethod },
      };
      output.runs.push(entry);
      await writeFile(new URL('./final-lighthouse.json', import.meta.url), JSON.stringify(output, null, 2) + '\n');
      console.log(JSON.stringify({ route, run, scores: entry.scores, error: entry.runtimeError?.code }));
    }
  }
} finally {
  await browser.close();
}
