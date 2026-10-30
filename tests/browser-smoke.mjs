import { chromium } from '../.codex-qa.local/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const out=new URL('../docs/rebranding/relatorios/capturas/',import.meta.url);await mkdir(out,{recursive:true});
const results=[];
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 await page.goto(new URL('../public/brand/og.svg',import.meta.url).href);
 await page.setViewportSize({width:1200,height:630});
 await page.screenshot({path:fileURLToPath(new URL('../public/brand/og.png',import.meta.url))});
 await page.setViewportSize({width:1440,height:1000});
 await page.goto(new URL('../docs/rebranding/kit.html',import.meta.url).href);
 await page.locator('img').last().waitFor();
 results.push({kind:'kit',brokenImages:await page.locator('img').evaluateAll(images=>images.filter(image=>!image.complete||!image.naturalWidth).map(image=>image.alt))});
 await page.screenshot({path:fileURLToPath(new URL('kit.png',out)),fullPage:true});
 for(const theme of ['light','dark']){
  const context=await browser.newContext({viewport:{width:1440,height:1000},colorScheme:theme,reducedMotion:'reduce'});
  await context.route('**/rest/v1/**',route=>route.fulfill({json:route.request().url().includes('site_settings')?{maintenance_mode:false}:[]}));
  const screen=await context.newPage();const errors=[];screen.on('pageerror',error=>errors.push(error.message));
  for(const path of ['/','/servicos','/processo','/portfolio','/sobre','/contato']){
   await screen.goto('http://127.0.0.1:4173'+path);
   await screen.locator('h1').waitFor();await screen.evaluate(()=>document.fonts.ready);
   await screen.getByRole('button',{name:theme==='dark'?'Ativar tema claro':'Ativar tema escuro'}).waitFor();
   await screen.screenshot({path:fileURLToPath(new URL((path==='/'?'home':path.slice(1))+'-'+theme+'.png',out)),fullPage:false});
   results.push({path,theme,title:await screen.title(),h1:await screen.locator('h1').innerText(),overflow:await screen.evaluate(()=>document.documentElement.scrollWidth>innerWidth),errors:[...errors]});
  }
  await screen.setViewportSize({width:375,height:1000});await screen.goto('http://127.0.0.1:4173/');await screen.evaluate(()=>document.fonts.ready);await screen.screenshot({path:fileURLToPath(new URL('home-mobile-'+theme+'.png',out)),fullPage:true});
  await context.close();
 }
 await writeFile(new URL('../docs/rebranding/relatorios/smoke.json',import.meta.url),JSON.stringify(results,null,2)+'\n');
 console.log(JSON.stringify(results,null,2));
}finally{await browser.close();}
