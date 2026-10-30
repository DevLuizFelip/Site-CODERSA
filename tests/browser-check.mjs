import { chromium } from '../.codex-qa.local/node_modules/playwright/index.mjs';
import AxeBuilder from '../.codex-qa.local/node_modules/@axe-core/playwright/dist/index.mjs';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { loadEnv } from 'vite';
import { fileURLToPath } from 'node:url';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const origin='http://127.0.0.1:4173';
const results=[];const issues=[];
const out=new URL('../docs/rebranding/relatorios/capturas/',import.meta.url);await mkdir(out,{recursive:true});
const apiPattern='**/rest/v1/**';
const fulfill=(route,data,status=200)=>route.fulfill({status,contentType:'application/json',body:JSON.stringify(data)});
async function context(options={}){
 const ctx=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',...options});
 await ctx.route(apiPattern,route=>fulfill(route,route.request().url().includes('site_settings')?{maintenance_mode:false}:[]));
 await ctx.route('**/send-email',route=>fulfill(route,{success:false},503));
 return ctx;
}
async function record(name,work){try{await work();results.push({name,passed:true});console.log('PASS '+name);}catch(error){issues.push({name,message:error.message});results.push({name,passed:false});console.log('FAIL '+name+': '+error.message.slice(0,350));}}
try{
 for(const theme of ['light','dark'])for(const width of [320,375,768,1440]){
  const ctx=await context({colorScheme:theme,viewport:{width,height:1000}});const page=await ctx.newPage();
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  for(const route of ['/','/servicos','/processo','/portfolio','/sobre','/contato']){
   await record(`layout ${theme} ${width} ${route}`,async()=>{
    await page.goto(origin+route);await page.locator('h1').waitFor();await page.evaluate(()=>document.fonts.ready);
    await page.getByRole('button',{name:theme==='dark'?'Ativar tema claro':'Ativar tema escuro'}).waitFor();
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Horizontal overflow');
    assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('main').count(),1);
    assert.deepEqual(errors,[],'Browser/hydration errors');
    assert.equal(await page.locator('a[href="#"],a:not([href])').count(),0);
    const scan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    assert.deepEqual(scan.violations.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)})),[],'Accessibility violations');
   });
  }
  await ctx.close();
 }
 await record('navigation, keyboard, disclosure, theme persistence and reduced motion',async()=>{
  const ctx=await context({viewport:{width:375,height:900}});const page=await ctx.newPage();await page.goto(origin);
  await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').innerText(),'Pular para o conteúdo');await page.keyboard.press('Enter');assert.equal(await page.locator(':focus').getAttribute('id'),'conteudo');
  const menu=page.getByRole('button',{name:'Menu'});await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false');assert.equal(await menu.evaluate(node=>node===document.activeElement),true);
  await menu.click();await page.getByRole('navigation',{name:'Principal'}).getByRole('link',{name:'Soluções',exact:true}).click();await page.waitForURL('**/servicos');assert.equal(await menu.getAttribute('aria-expanded'),'false');
  await page.getByText('Automação e integrações',{exact:true}).click();assert.equal(await page.locator('#automacao').evaluate(node=>node.open),true);
  await page.getByRole('button',{name:'Ativar tema escuro'}).click();await page.reload();await page.getByRole('button',{name:'Ativar tema claro'}).waitFor();
  assert.equal(await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches),true);
  const duration=await page.locator('.button').first().evaluate(node=>getComputedStyle(node).transitionDuration);assert.equal(duration,'0s');await ctx.close();
 });
 await record('200% text zoom and accessibility-tree reading sample',async()=>{
  const ctx=await context({viewport:{width:768,height:1000}});const page=await ctx.newPage();
  for(const route of ['/','/contato']){
   await page.goto(origin+route);await page.locator('h1').waitFor();
   await page.evaluate(()=>{for(const el of document.querySelectorAll('.public-site h1,.public-site h2,.public-site h3,.public-site p,.public-site a,.public-site button,.public-site label,.public-site input,.public-site textarea,.public-site summary')){el.style.fontSize=(parseFloat(getComputedStyle(el).fontSize)*2)+'px';}});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Text zoom overflow');
   const client=await ctx.newCDPSession(page);await client.send('Accessibility.enable');const tree=await client.send('Accessibility.getFullAXTree');
   const sample=tree.nodes.filter(node=>!node.ignored&&['heading','link','button','textbox','navigation','main'].includes(node.role?.value)).map(node=>({role:node.role.value,name:node.name?.value}));
   assert.ok(sample.some(node=>node.role==='heading'&&node.name));assert.ok(sample.some(node=>node.role==='main'));
   await writeFile(new URL('../docs/rebranding/relatorios/ax-'+(route==='/'?'home':'contato')+'.json',import.meta.url),JSON.stringify(sample,null,2)+'\n');
  }
  await ctx.close();
 });
 await record('contact required fields, single send, positive confirmation and voluntary WhatsApp',async()=>{
  const ctx=await context();const page=await ctx.newPage();let requests=0;let payload;let popups=0;
  page.on('popup',()=>popups++);await page.addInitScript(()=>{window.testEvents=[];addEventListener('codersa:analytics',e=>window.testEvents.push(e.detail));});
  await ctx.route('**/send-email',async route=>{requests++;payload=route.request().postDataJSON();await new Promise(resolve=>setTimeout(resolve,200));await fulfill(route,{success:true});});
  await page.goto(origin+'/contato');await page.getByRole('button',{name:'Enviar solicitação'}).click();assert.equal(requests,0);assert.equal(await page.locator('[aria-invalid=true]').count(),4);assert.equal(await page.locator(':focus').getAttribute('id'),'nome');
  for(const [field,value] of Object.entries({nome:'Pessoa Teste',email:'teste@example.com',assunto:'Teste controlado',mensagem:'Descrição de teste local.'}))await page.locator('#'+field).fill(value);
  await page.locator('form').evaluate(form=>{form.requestSubmit();form.requestSubmit();});await page.getByRole('heading',{name:'Solicitação recebida.'}).waitFor();assert.equal(requests,1);assert.deepEqual(Object.keys(payload),['nome','email','assunto','mensagem']);assert.equal(popups,0);
  const events=await page.evaluate(()=>window.testEvents);assert.equal(events.filter(e=>e.name==='contact_submit_success').length,1);assert.equal(JSON.stringify(events).includes('teste@example.com'),false);assert.ok(await page.getByRole('link',{name:'Abrir WhatsApp'}).isVisible());await ctx.close();
 });
 for(const mode of ['http','negative','network','timeout'])await record('contact '+mode+' retains fields and permits retry',async()=>{
  const ctx=await context();const page=await ctx.newPage();await page.addInitScript(()=>{window.testEvents=[];addEventListener('codersa:analytics',e=>window.testEvents.push(e.detail));});
  await ctx.route('**/send-email',route=>mode==='network'?route.abort('failed'):mode==='timeout'?new Promise(()=>{}):fulfill(route,{success:false},mode==='http'?500:200));
  await page.goto(origin+'/contato');for(const [field,value] of Object.entries({nome:'Pessoa Teste',email:'teste@example.com',assunto:'Teste',mensagem:'Processo de teste.'}))await page.locator('#'+field).fill(value);
  await page.getByRole('button',{name:'Enviar solicitação'}).click();await page.getByRole('alert').waitFor({timeout:20000});assert.equal(await page.locator('#mensagem').inputValue(),'Processo de teste.');assert.equal(await page.getByRole('button',{name:'Enviar solicitação'}).isEnabled(),true);assert.equal((await page.evaluate(()=>window.testEvents)).filter(e=>e.name==='contact_submit_success').length,0);
  await ctx.unroute('**/send-email');await ctx.route('**/send-email',route=>fulfill(route,{success:true}));await page.getByRole('button',{name:'Enviar solicitação'}).click();await page.getByRole('heading',{name:'Solicitação recebida.'}).waitFor();await ctx.close();
 });
 await record('portfolio empty, failure, retry and public records only',async()=>{
  const ctx=await context();const page=await ctx.newPage();await page.goto(origin+'/portfolio');await page.getByText('Ainda não há projetos disponíveis para exibição.').waitFor();
  await ctx.route('**/rest/v1/projects*',route=>fulfill(route,{message:'test failure'},500));await page.reload();await page.getByText('Não foi possível carregar o portfólio agora.').waitFor();
  await ctx.unroute('**/rest/v1/projects*');await ctx.route('**/rest/v1/projects*',route=>{assert.ok(route.request().url().includes('show_in_portfolio=eq.true'));return fulfill(route,[{id:'public',title:'Projeto de teste público',description:'Fixture local',show_in_portfolio:true,technologies:['React'],image_url:null},{id:'private',title:'PROJETO PRIVADO',show_in_portfolio:false}]);});
  await page.getByRole('button',{name:'Tentar novamente'}).click();await page.getByRole('heading',{name:'Projeto de teste público'}).waitFor();assert.equal(await page.getByText('PROJETO PRIVADO').count(),0);await ctx.close();
 });
 await record('maintenance and settings timeout preserve documented behavior',async()=>{
  const ctx=await context();const page=await ctx.newPage();await ctx.route('**/rest/v1/site_settings*',route=>fulfill(route,{maintenance_mode:true}));await page.goto(origin);await page.getByRole('heading',{name:'Estamos em Manutenção'}).waitFor();assert.equal(await page.getByRole('navigation').count(),0);
  await ctx.unroute('**/rest/v1/site_settings*');await ctx.route('**/rest/v1/site_settings*',()=>new Promise(()=>{}));await page.goto(origin);await page.getByRole('heading',{level:1}).waitFor();await page.waitForTimeout(4200);assert.ok((await page.locator('h1').innerText()).includes('Sua operação'));await ctx.close();
 });
 await record('review form keeps moderation and accessible star input',async()=>{
  const ctx=await context();const page=await ctx.newPage();let posted;
  await ctx.route('**/rest/v1/testimonials*',route=>{posted=route.request().postDataJSON();return fulfill(route,[],201);});
  await page.goto(origin+'/avaliar');await page.getByRole('radio',{name:'5 estrelas'}).check();await page.getByLabel('Seu nome').fill('Pessoa Teste');await page.getByLabel('Cargo e empresa').fill('Teste local');await page.getByLabel('Sua avaliação',{exact:true}).fill('Avaliação de teste controlada.');await page.getByRole('button',{name:'Enviar avaliação'}).click();await page.getByRole('heading',{name:'Obrigado pela avaliação.'}).waitFor();assert.equal(posted[0].is_approved,false);assert.equal(posted[0].rating,5);await ctx.close();
 });
 for(const theme of ['light','dark'])await record('login and admin regression '+theme,async()=>{
  const ctx=await context({colorScheme:theme});const page=await ctx.newPage();await page.goto(origin+'/admin');await page.waitForURL('**/login');await page.getByLabel('E-mail',{exact:true}).waitFor();await page.screenshot({path:fileURLToPath(new URL('login-'+theme+'.png',out))});
  const env=loadEnv('production',process.cwd(),'VITE_');const project=new URL(env.VITE_SUPABASE_URL).hostname.split('.')[0];
  const user={id:'00000000-0000-4000-8000-000000000001',aud:'authenticated',role:'authenticated',email:'fixture@example.com',app_metadata:{},user_metadata:{},created_at:'2026-01-01T00:00:00Z'};
  const expiry=Math.floor(Date.now()/1000)+3600;const jwt=Buffer.from(JSON.stringify({alg:'HS256',typ:'JWT'})).toString('base64url')+'.'+Buffer.from(JSON.stringify({sub:user.id,exp:expiry,role:'authenticated'})).toString('base64url')+'.test-signature';
  await page.evaluate(({project,session})=>localStorage.setItem('sb-'+project+'-auth-token',JSON.stringify(session)),{project,session:{access_token:jwt,refresh_token:'test-only',expires_at:expiry,expires_in:3600,token_type:'bearer',user}});
  await ctx.route('**/auth/v1/**',route=>fulfill(route,user));await page.goto(origin+'/admin');await page.locator('.dashboard-layout').waitFor();await page.screenshot({path:fileURLToPath(new URL('admin-'+theme+'.png',out))});assert.equal(new URL(page.url()).pathname,'/admin');await ctx.close();
 });
 await record('initial HTML works without scripts and API does not return SPA HTML',async()=>{
  const ctx=await browser.newContext({javaScriptEnabled:false});const page=await ctx.newPage();const titles=new Set();for(const route of ['/','/servicos','/processo','/portfolio','/sobre','/contato']){await page.goto(origin+route);assert.equal(await page.locator('h1').count(),1);titles.add(await page.title());}assert.equal(titles.size,6);assert.equal(await page.getByRole('button',{name:'Enviar solicitação'}).isDisabled(),true);const api=await page.request.get(origin+'/api/send-email');assert.equal(api.headers()['content-type'],'application/json');await ctx.close();
 });
}finally{
 await writeFile(new URL('../docs/rebranding/relatorios/browser-check.json',import.meta.url),JSON.stringify({browser:browser.version(),results,issues,passed:issues.length===0},null,2)+'\n');
 await browser.close();console.log(JSON.stringify({checks:results.length,failures:issues.length},null,2));if(issues.length)process.exitCode=1;
}
