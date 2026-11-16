# Codersa — atualização para clientes

Base: main 29404b7239637aeb9e44e34aea488456e67fb334. Nenhuma alteração nova foi sobrescrita. Implementação isolada em feat/codersa-client-site.

## Experiência

- Primeira tela orientada a problemas e serviços concretos, com chamada para solicitar projeto.
- Quatro soluções visíveis; Blueprint preservado em bloco próprio e página detalhada.
- Demonstração de fluxo identificada como ilustrativa, sem números, clientes ou depoimentos inventados.
- Composição com logo, fontes e cores existentes; CSS responsivo e tema claro/escuro.
- Todos os CTAs comerciais usam o formulário do CRM. A rota /contato fornece uma entrada indexável para o mesmo formulário, evitando coleta pelo formulário legado.
- Nenhuma alteração no CRM, banco ou remetente de e-mails.

## SEO

Sete páginas continuam pré-renderizadas em HTML, com um H1 por página, título e descrição próprios, canonical, Open Graph, Twitter Cards, sitemap e robots. Foram adicionados JSON-LD de Organization, WebSite, WebPage, BreadcrumbList e serviços apenas nas páginas pertinentes, sem avaliações, preços ou endereços presumidos. O JSON-LD também acompanha a navegação React.

Referências consultadas em 16/11/2026:
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data

## Validação

- npm ci e npm run build concluídos.
- npm test: 20 testes aprovados, incluindo validação do HTML e JSON-LD das sete páginas e destinos do CRM.
- Prévia desktop inspecionada no navegador: composição, ausência de overflow horizontal, hierarquia e navegação Blueprint.
- CSS inclui adaptações em 1100, 760 e 480 px. Não foi obtida emulação móvel do navegador nesta execução; revisar em aparelho real após publicação.
- Sem medição de Lighthouse ou dados de Search Console. SEO técnico não representa garantia de posição na busca.

## Reversão

Reverter o commit de atualização no GitHub e aguardar o deploy Vercel correspondente. Não há migração de dados.
