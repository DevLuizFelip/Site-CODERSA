const directions = {
  terminal: {label:'A / EVOLUÇÃO',title:'Terminal editorial',description:'Preserva a referência ao código com um terminal redesenhado. Serifa expressiva, espaço em branco e azul usado com contenção.',colors:['#15181e','#f7f7f2','#535c68','#3157ff']},
  modular: {label:'B / RECOMENDADA',title:'C modular',description:'Um C construído com módulos representa partes que passam a funcionar juntas. Grade clara, azul de ação e contraste editorial.',colors:['#15181e','#f7f7f2','#535c68','#3157ff']},
  flow: {label:'C / INTEGRAÇÃO',title:'Fluxo contínuo',description:'Duas linhas formam um C aberto e conectam informação, software e pessoas. Grafite dominante, caminhos visíveis e acentos azuis.',colors:['#15181e','#f7f7f2','#aab5c5','#8ca1ff']},
};
let current = 'modular';
function selectDirection(key) {
  current=key;
  const direction=directions[key];
  document.querySelectorAll('[data-direction]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.direction===key)));
  document.getElementById('direction-label').textContent=direction.label;
  document.getElementById('direction-title').textContent=direction.title;
  document.getElementById('direction-description').textContent=direction.description;
  document.getElementById('swatches').innerHTML=direction.colors.map(color=>`<span class="swatch" style="background:${color}" title="${color}"></span>`).join('');
  const site=document.getElementById('site-preview');
  site.src=`preview.html?direction=${key}`;
  site.title=`Homepage proposta — ${direction.title}`;
  const brand=document.getElementById('brand-preview');
  brand.src=`preview.html?direction=${key}&mode=brand`;
  brand.title=`Aplicações propostas — ${direction.title}`;
  document.getElementById('open-preview').href=site.src;
}
document.querySelectorAll('[data-direction]').forEach(button=>button.addEventListener('click',()=>selectDirection(button.dataset.direction)));
document.querySelectorAll('[data-width]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-width]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  document.querySelector('.frame-stage').classList.toggle('mobile',button.dataset.width==='mobile');
}));
selectDirection(current);
