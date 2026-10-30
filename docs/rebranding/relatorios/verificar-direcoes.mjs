import { chromium } from '../../../.codex-qa.local/node_modules/playwright/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const shots = new URL('../preview/capturas/', import.meta.url);
await mkdir(shots,{recursive:true});
const results=[];
try {
  for(const direction of ['terminal','modular','flow']){
    for(const width of [320,375,768,1440]){
      const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
      const errors=[];
      page.on('pageerror',error=>errors.push(error.message));
      const response=await page.goto(`http://127.0.0.1:4174/preview.html?direction=${direction}`);
      await page.locator('h1').waitFor();
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
      const invalidLinks=await page.locator('a[href^="#"]').evaluateAll(links=>links.filter(link=>!document.querySelector(link.getAttribute('href'))).map(link=>link.getAttribute('href')));
      await page.getByText('Automação e integrações',{exact:true}).click();
      const offerOpens=await page.locator('.offer').nth(1).evaluate(element=>element.open);
      if(width<760){
        await page.getByRole('button',{name:'Menu'}).click();
        if(await page.getByRole('button',{name:'Menu'}).getAttribute('aria-expanded')!=='true')throw new Error('Menu did not open');
        await page.keyboard.press('Escape');
        if(await page.getByRole('button',{name:'Menu'}).getAttribute('aria-expanded')!=='false')throw new Error('Menu did not close');
      }
      await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,0);});
      if([375,1440].includes(width)) await page.screenshot({path:new URL(`${direction}-${width}.png`,shots).pathname.replace(/^\/([A-Za-z]:)/,'$1'),fullPage:false});
      results.push({direction,width,status:response.status(),overflow,invalidLinks,offerOpens,errors});
      await page.goto(`http://127.0.0.1:4174/preview.html?direction=${direction}&mode=brand`);
      await page.locator('.carousel').waitFor();
      const brandOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
      results.push({direction,width,mode:'brand',overflow:brandOverflow,slides:await page.locator('.social-slide').count()});
      if(width===1440) await page.screenshot({path:new URL(`${direction}-marca.png`,shots).pathname.replace(/^\/([A-Za-z]:)/,'$1'),fullPage:true});
      await page.close();
    }
  }
  const review=await browser.newPage({viewport:{width:1440,height:1080}});
  await review.goto('http://127.0.0.1:4174/');
  for(const direction of ['terminal','flow','modular']){
    await review.locator(`[data-direction="${direction}"]`).click();
    await review.frameLocator('#site-preview').locator(`body[data-direction="${direction}"] h1`).waitFor();
  }
  await review.getByRole('button',{name:'Mobile · 375'}).click();
  const iframeWidth=await review.locator('#site-preview').evaluate(frame=>frame.getBoundingClientRect().width);
  if(iframeWidth!==375) throw new Error(`Incorrect mobile width: ${iframeWidth}`);
  results.push({mode:'review',directionSwitches:true,mobileWidth:iframeWidth});
  await review.getByRole('button',{name:'Desktop',exact:true}).click();
  await review.screenshot({path:new URL('comparacao.png',shots).pathname.replace(/^\/([A-Za-z]:)/,'$1'),fullPage:false});
  const failed=results.some(result=>result.overflow || result.invalidLinks?.length || result.errors?.length || result.offerOpens===false);
  await writeFile(new URL('./direcoes-qa.json',import.meta.url),JSON.stringify({browser:browser.version(),results,passed:!failed},null,2)+'\n');
  console.log(JSON.stringify({passed:!failed,checks:results.length,failures:results.filter(result=>result.overflow||result.invalidLinks?.length||result.errors?.length||result.offerOpens===false)},null,2));
  if(failed)process.exitCode=1;
}finally{await browser.close();}
