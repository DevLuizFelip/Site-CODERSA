import { metadata, siteOrigin, offers } from './content.js';
import { channels } from './channels.js';
const names={'/servicos':'Soluções','/servicos/blueprint':'CODERSA Blueprint','/processo':'Como funciona','/portfolio':'Resultados','/sobre':'Sobre','/contato':'Contato'};
export function structuredData(route){
 const info=metadata[route];if(!info)return null;
 const organization={'@type':'Organization','@id':siteOrigin+'/#organization',name:'CODERSA',url:siteOrigin+'/',logo:siteOrigin+'/brand/logo-blue.svg',email:channels.email,description:'Engenharia de software, automação e inteligência artificial aplicada a processos empresariais.'};
 const graph=[organization,{'@type':'WebSite','@id':siteOrigin+'/#website',url:siteOrigin+'/',name:'CODERSA',inLanguage:'pt-BR',publisher:{'@id':organization['@id']}},{'@type':'WebPage','@id':siteOrigin+route+'#webpage',url:siteOrigin+route,name:info.title,description:info.description,inLanguage:'pt-BR',isPartOf:{'@id':siteOrigin+'/#website'}}];
 if(route!=='/'){
 const items=[{name:'Início',item:siteOrigin+'/'}];
 if(route==='/servicos/blueprint')items.push({name:'Soluções',item:siteOrigin+'/servicos'});
 items.push({name:names[route],item:siteOrigin+route});
 graph.push({'@type':'BreadcrumbList',itemListElement:items.map((item,i)=>({'@type':'ListItem',position:i+1,...item}))});
 }
 if(route==='/servicos')graph.push(...offers.map(o=>({'@type':'Service',name:o.title,description:o.summary,url:siteOrigin+'/servicos#'+o.id,provider:{'@id':organization['@id']}})));
 if(route==='/servicos/blueprint')graph.push({'@type':'Service',name:'CODERSA Blueprint',description:'Serviço independente de especificação e arquitetura de software e IA, com entregáveis definidos por escopo.',url:siteOrigin+route,provider:{'@id':organization['@id']}});
 return {'@context':'https://schema.org','@graph':graph};
}
