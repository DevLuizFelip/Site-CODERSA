# Build, preview e manutenção
Requisitos reproduzidos: Node 24.21.0, npm 11.19.0. Instalar com `npm ci`; configurar VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no ambiente local/hosting. Nunca usar chave service_role no frontend. Endpoint opcional em contato.md.

```powershell
npm run build
npm test
npm run preview -- --host 127.0.0.1 --port 4173
```

Build Vite cliente + SSR gera seis HTML em dist: /, /servicos, /processo, /portfolio, /sobre, /contato. `entry-server.jsx` não depende de window nem consulta dados remotos. `main.jsx` hidrata HTML marcado; outras rotas usam spa.html vazio com noindex. Navegação cliente mantém interatividade e atualiza metadados. Canonical/OG usam origem em src/site/content.js; validar domínio antes de trocar hosting. Sitemap inclui somente seis rotas.

`vercel.json` mantém /api/* antes das páginas, rotas públicas explícitas e fallback SPA para login/admin/avaliar. Ativos permanecem arquivos. Preview Node reproduz páginas/fallback; /api responde JSON 501 pois não executa Python. Essa resposta verifica separação de API/HTML, não operação do backend em produção. Publicar somente dist como estático; dist-ssr é ferramenta de geração e não diretório público. Rewrites finais precisam de smoke no ambiente publicado quando publicação for solicitada.

## Manutenção
Cliente consulta site_settings com limite de 4 segundos. Conteúdo aparece sem esperar a rede; manutenção ativa substitui conteúdo após resposta. Falha/timeout mantém site. HTML inicial e acesso sem JavaScript continuam disponíveis: o flag do banco não retira conteúdo estático.
Para interrupção integral, ativar página de manutenção/rewrite no hosting para todas as rotas públicas e controlar cache/CDN; preservar acesso administrativo/API conforme necessidade. Verificar com JavaScript desligado e request direto. Remover regra após restabelecer e invalidar cache. Não depender do flag para sigilo.

## QA local
Dependências auxiliares isoladas: `npm install --prefix .codex-qa.local --save-exact playwright@1.64.1 lighthouse@13.6.0 @axe-core/playwright fontkit`. Scripts usam Chrome em C:/Program Files/Google/Chrome/Application/chrome.exe; adaptar caminho para outra máquina.
Com preview ativo: `node tests/browser-check.mjs`, `node tests/browser-smoke.mjs`, `node docs/rebranding/relatorios/medir-final.mjs`. Executar Lighthouse sem outros navegadores de teste concorrentes. Testes de browser interceptam mutações; Lighthouse apenas GET. Dependências QA não integram bundle.
