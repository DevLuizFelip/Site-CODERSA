import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {metadata,crmContactUrl,contactPath} from '../src/site/content.js';
import {structuredData} from '../src/site/seo.js';
test('every rendered page has matching schema, title, canonical and social metadata',async()=>{
 for(const [route,info] of Object.entries(metadata)){
 const html=await readFile(`dist${route==='/'?'/':route+'/'}index.html`,'utf8');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
 const schema=JSON.parse(html.match(/id="site-structured-data">(.*?)<\/script>/s)[1]);
 assert.deepEqual(schema,structuredData(route));
 assert.equal(schema['@graph'].find(x=>x['@type']==='WebPage').name,info.title);
 assert.ok(html.includes('name="twitter:description"'));
 assert.ok(!JSON.stringify(schema).includes('aggregateRating'));
 }
});
test('homepage provides the services and CRM journey in initial HTML',async()=>{
 const html=await readFile('dist/index.html','utf8');
 for(const text of ['Software sob medida','Automação e integrações','Inteligência artificial','Avaliação de IA','CODERSA BLUEPRINT','Menos tarefas'])assert.ok(html.includes(text));
 assert.ok(html.includes(crmContactUrl));
 assert.equal(contactPath('unknown'),crmContactUrl);
 assert.ok(contactPath('blueprint').includes('servico=blueprint'));
});
