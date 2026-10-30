import * as fontkit from '../../../.codex-qa.local/node_modules/fontkit/dist/module.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const out=new URL('../../../public/brand/',import.meta.url);
const sansBase=fontkit.openSync(fileURLToPath(new URL('fonts/Manrope[wght].ttf',out)));
const sans=sansBase.getVariation ? sansBase.getVariation({wght:600}) : sansBase;
const serif=fontkit.openSync(fileURLToPath(new URL('fonts/SourceSerif4-Italic[opsz,wght].ttf',out)));
const shape='<path d="M44 8H20L8 20v24l12 12h24V44H26l-6-6V26l6-6h18Z"/><path d="M48 26h8v12h-8z"/>';
const mark=(x,y,size,color)=>`<g transform="translate(${x} ${y}) scale(${size/64})" fill="${color}">${shape}</g>`;
function text(value,x,y,size,color='#15181E',font=sans){
  const run=font.layout(value);let offset=0;const scale=size/font.unitsPerEm;
  return run.glyphs.map((glyph,index)=>{const position=run.positions[index];const path=`<path transform="translate(${x+(offset+position.xOffset)*scale} ${y-position.yOffset*scale}) scale(${scale} ${-scale})" fill="${color}" d="${glyph.path.toSVG()}"/>`;offset+=position.xAdvance;return path;}).join('');
}
const svg=(w,h,content,title)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img"><title>${title}</title>${content}</svg>\n`;
await mkdir(out,{recursive:true});
for(const [name,color] of [['graphite','#15181E'],['white','#F7F7F2'],['blue','#3157FF'],['mono','#000000']]){
  await writeFile(new URL(`symbol-${name}.svg`,out),svg(64,64,mark(0,0,64,color),'CODERSA — C modular'));
  await writeFile(new URL(`logo-${name}.svg`,out),svg(360,90,mark(0,6,75,color)+text('codersa.',87,65,61,color),'CODERSA'));
}
await writeFile(new URL('favicon.svg',out),svg(64,64,'<rect width="64" height="64" rx="8" fill="#3157FF"/>'+mark(4,4,56,'#fff'),'CODERSA'));
await writeFile(new URL('avatar.svg',out),svg(1080,1080,'<rect width="1080" height="1080" fill="#3157FF"/>'+mark(260,260,560,'#F7F7F2'),'CODERSA — avatar'));
for(const [number,background,foreground,lines,caption] of [
  [1,'#3157FF','#FFFFFF',['Seu time não precisa','ser a integração.'],'Três sinais de um processo que merece atenção.'],
  [2,'#15181E','#F7F7F2',['Copiar. Conferir.','Cobrar.'],'Quando a rotina é mover dados, olhe para o fluxo.'],
  [3,'#F7F7F2','#15181E',['Antes de automatizar,','entenda o caminho.'],'Comece por um processo. Mapeie quem faz o quê.'],
]){
  const content=`<rect width="1080" height="1080" fill="${background}"/>`+mark(65,65,65,foreground)+text('codersa.',145,113,48,foreground)+text(`0${number} / 03`,850,105,25,foreground)+text(lines[0],65,420,65,foreground)+text(lines[1],65,510,78,foreground,serif)+text(caption,65,940,29,foreground);
  await writeFile(new URL(`carousel-0${number}.svg`,out),svg(1080,1080,content,`Carrossel educativo CODERSA — slide ${number}`));
}
await writeFile(new URL('post.svg',out),svg(1080,1350,'<rect width="1080" height="1350" fill="#F7F7F2"/>'+mark(65,65,65,'#3157FF')+text('codersa.',145,113,48)+text('Informação reunida.',65,510,70)+text('Próxima ação clara.',65,610,80,'#3157FF',serif)+text('Software, automação e IA aplicada.',65,1215,34),'CODERSA — post educativo'));
const panel='<rect width="1200" height="760" fill="#F7F7F2"/><rect width="240" height="760" fill="#15181E"/>'+mark(35,35,65,'#F7F7F2')+text('codersa.',105,82,30,'#F7F7F2')+text('Fluxos',35,200,22,'#F7F7F2')+text('Acompanhamento',35,260,18,'#AAB5C5')+text('Visão da operação',290,90,40)+text('Aplicação de marca — dados ilustrativos',290,135,20,'#535C68')+['Entrada','Em revisão','Próxima ação'].map((name,index)=>{const x=290+index*285;return `<rect x="${x}" y="220" width="250" height="380" fill="#E8ECFA"/>`+text(name,x+20,265,22)+`<rect x="${x+16}" y="300" width="218" height="105" fill="#FFFFFF"/>`+text('Fluxo demonstrativo',x+30,345,17)+text('Responsável definido',x+30,378,15,'#535C68');}).join('');
await writeFile(new URL('panel-reference.svg',out),svg(1200,760,panel,'CODERSA — aplicação de marca em painel de referência'));
await writeFile(new URL('og.svg',out),svg(1200,630,'<rect width="1200" height="630" fill="#F7F7F2"/>'+mark(65,45,85,'#3157FF')+text('codersa.',165,109,62)+text('Sua operação conectada.',65,310,76)+text('Seu time focado no que importa.',65,405,58,'#3157FF',serif)+text('Software, automação e IA aplicada.',65,560,28),'CODERSA — Software, automação e IA aplicada'));
const luminance=hex=>{const rgb=hex.replace('#','').match(/../g).map(value=>parseInt(value,16)/255).map(value=>value<=.04045?value/12.92:((value+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};
const pairs=[['text light','#15181E','#F7F7F2'],['muted light','#535C68','#F7F7F2'],['button light','#FFFFFF','#3157FF'],['text dark','#F7F7F2','#15181E'],['muted dark','#AAB5C5','#15181E'],['action dark','#8CA1FF','#15181E'],['button dark','#15181E','#8CA1FF'],['success light','#18633C','#F7F7F2'],['error light','#A32727','#F7F7F2'],['control border light','#747D88','#F7F7F2'],['control border dark','#8591A3','#15181E']].map(([name,fg,bg])=>{const values=[luminance(fg),luminance(bg)].sort((a,b)=>b-a);return {name,fg,bg,ratio:Number(((values[0]+.05)/(values[1]+.05)).toFixed(2))};});
await writeFile(new URL('./contrastes.json',import.meta.url),JSON.stringify(pairs,null,2)+'\n');
console.log(JSON.stringify({assets:19,contrastPairs:pairs},null,2));
