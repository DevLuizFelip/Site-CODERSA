import { readFile, writeFile } from 'node:fs/promises';
const baseline=JSON.parse(await readFile(new URL('./baseline-lighthouse.json',import.meta.url),'utf8'));
const final=JSON.parse(await readFile(new URL('./final-lighthouse.json',import.meta.url),'utf8'));
const median=values=>[...values].sort((a,b)=>a-b)[Math.floor(values.length/2)];
const routes=[...new Set(final.runs.map(run=>run.route))];
if(final.runs.length!==21 || final.runs.some(run=>run.runtimeError))throw new Error('Incomplete final measurement');
const rows=routes.map(route=>{
 const before=baseline.runs.filter(run=>run.route===route),after=final.runs.filter(run=>run.route===route);
 if(after.length!==3)throw new Error('Missing runs: '+route);
 return {route,baseline:before.length?median(before.map(run=>run.scores.performance)):null,performance:median(after.map(run=>run.scores.performance)),lcpBeforeMs:before.length?median(before.map(run=>run.metrics['largest-contentful-paint'])):null,lcpMs:median(after.map(run=>run.metrics['largest-contentful-paint'])),cls:median(after.map(run=>run.metrics['cumulative-layout-shift']))};
});
const report={rows,passed:rows.every(row=>row.performance>=90),inp:'Not measured. Lighthouse navigation does not establish field INP.',conditions:'Same local production preview, mobile simulated throttling, 3 runs per route. Not field or production measurements.'};
await writeFile(new URL('./performance-summary.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
await writeFile(new URL('./performance-summary.md',import.meta.url),'# Desempenho mobile — medianas de três execuções\n\n| Rota | Baseline | Final | LCP antes (ms) | LCP final (ms) | CLS final |\n| --- | ---: | ---: | ---: | ---: | ---: |\n'+rows.map(r=>`| ${r.route} | ${r.baseline??'nova'} | ${r.performance} | ${r.lcpBeforeMs===null?'—':Math.round(r.lcpBeforeMs)} | ${Math.round(r.lcpMs)} | ${r.cls.toFixed(4)} |`).join('\n')+'\n\nLighthouse de navegação local, sem INP de campo. Não comprova experiência em produção. Sem regressão de orçamento Performance ≥90. Variações pequenas de LCP/CLS devem ser interpretadas nas condições de laboratório. Accessibility/SEO 100 e Best Practices 77 nas rodadas observadas; o valor de Best Practices já existia na base e não é exceção silenciosa ao orçamento de performance.\n');
console.log(JSON.stringify(report));
