import { mkdir, writeFile } from 'node:fs/promises';
const directory=new URL('../../../public/brand/fonts/',import.meta.url);
await mkdir(directory,{recursive:true});
const source='https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Source+Serif+4:ital,wght@1,400&display=swap';
const response=await fetch(source,{headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'}});
if(!response.ok)throw new Error(`Font CSS ${response.status}`);
const css=await response.text();
const blocks=[...css.matchAll(/\/\* (latin(?:-ext)?) \*\/\s*(@font-face\s*\{[^}]+\})/g)].map(match=>match[0]);
if(!blocks.length)throw new Error('No Latin font subsets returned');
let local=blocks.join('\n');
const urls=[...new Set([...local.matchAll(/url\((https:[^)]+)\)/g)].map(match=>match[1]))];
for(const [index,url] of urls.entries()){
  const font=await fetch(url);if(!font.ok)throw new Error(`Font download ${font.status}`);
  const name=`font-${String(index+1).padStart(2,'0')}.woff2`;
  await writeFile(new URL(name,directory),Buffer.from(await font.arrayBuffer()));
  local=local.replaceAll(url,`/brand/fonts/${name}`);
}
await writeFile(new URL('fonts.css',directory),local+'\n');
for(const family of ['manrope','sourceserif4']){
  const license=await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/OFL.txt`);
  if(!license.ok)throw new Error(`License download ${license.status}`);
  await writeFile(new URL(`${family}-OFL.txt`,directory),await license.text());
}
for(const [family,file] of [['manrope','Manrope[wght].ttf'],['sourceserif4','SourceSerif4-Italic[opsz,wght].ttf']]){
  const font=await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/${encodeURIComponent(file)}`);
  if(!font.ok)throw new Error(`Original font download ${font.status}`);
  await writeFile(new URL(file,directory),Buffer.from(await font.arrayBuffer()));
}
await writeFile(new URL('sources.json',directory),JSON.stringify({cssSource:source,fontSources:urls,licenses:['https://github.com/google/fonts/tree/main/ofl/manrope','https://github.com/google/fonts/tree/main/ofl/sourceserif4'],referenceDate:'2026-10-29'},null,2)+'\n');
console.log(`Downloaded ${urls.length} font subsets and both OFL licenses`);
