# Fase 2 — Auditoria inicial

Referência: 02/11/2026, America/Sao_Paulo. Auditoria local em andamento; registros históricos de Fase 1 não substituem novas verificações.

## Estado Git

- Branch: `feat/codersa-phase-2-services`.
- HEAD: `ac2865ad6b3832c54b5235ab245cd18c96ad0434`.
- Commit: `2026-10-29T23:48:53-03:00`, `feat: implement CODERSA modular rebrand and public website`.
- Dez commits e remote verificados. Origin: `https://github.com/DevLuizFelip/Site-CODERSA.git`.
- Arquivos locais iniciais não rastreados: briefings de Fase 2, Fase 3 e planejamento `openspec/changes/codersa-phase-2-services/`. Preservados.
- Branch/deployment de produção e equivalência ao HEAD: não comprovados por metadados do provedor.

## Baseline técnico

- Node 24.21.0, npm 11.19.0, Python 3.14.8.
- `npm ci`: concluído sem alteração do lockfile. Audit aponta 20 vulnerabilidades preexistentes (1 crítica, 14 altas, 4 moderadas, 1 baixa). Não executado upgrade automático.
- `npm run lint`: cinco erros preexistentes: variável `save` nos dois widgets (linha 137), export de contexto em `src/auth/AuthContext.jsx:43`, `navigate` em Sidebar:13, `error` em SecurityPage:15.
- `npm run build`: aprovado; seis HTML gerados. Avisos de Browserslist antigo e imports React não usados na renderização servidor.
- `npm test`: 13/13 aprovados.
- Ambiente `.venv` existe, sem Flask instalado inicialmente. Ferramentas browser isoladas em `.codex-qa.local`; disponibilidade/execução serão registradas abaixo.

## Inventário e compatibilidade

| Área | Evidência e comportamento atual |
| --- | --- |
| Rotas públicas | `src/App.jsx:25`: Home, `/servicos`, `/processo`, `/portfolio`, `/sobre`, `/contato`, `/avaliar`; fallback de não encontrada |
| Área privada | `src/App.jsx:29`, AuthLayout/ProtectedRoute: `/login`, `/admin`, contatos, projetos, avaliações e segurança; proteção cliente exige RLS no servidor |
| Composição | `src/pages/HomePage.jsx:1` e `src/site/Sections.jsx`: Hero, Problem, Offers, Demonstration, Method, People, FAQ, ContactSection |
| Catálogo | `src/site/content.js`: três ofertas genéricas, anchors software/automacao/ia, processo de três passos; Blueprint ausente |
| Contato ativo | `src/pages/ContactPage.jsx:1`, `src/site/contact-service.js`: Render `/send-email`, quatro campos, timeout 15s, confirmação positiva e retry; sem qualificação |
| API alternativa | `api/index.py:86`: `/api/send-email` SMTP; não é endpoint padrão do frontend; `vercel.json` reserva `/api/*` |
| Backend Render | `backend/app.py:52`: MailerSend; também assistente simulado e ping |
| Supabase público | Layout consulta maintenance_mode; PortfolioPage:16 filtra projetos públicos e seleciona colunas; avaliação insere is_approved:false |
| Supabase privado | Dashboard consulta/modifica contacts/projects/testimonials/site_settings; upload project-images; não há políticas RLS versionadas verificáveis |
| Visual | `src/index.css:4`, `src/site/site.css`, `refinements.css`, `public/brand`: C modular, Manrope/Source Serif 4, grafite/papel/azul, dois temas, foco e movimento reduzido |
| SEO | `scripts/prerender.mjs`: HTML estático de seis rotas, canonical/OG/Twitter, sitemap/robots; `Layout.jsx` sincroniza head na navegação |
| Analytics | `src/site/analytics.js`: três eventos locais com allowlist e adaptador externo desativado |
| Legado | `src/components/ContactForm.jsx`, HeroSection/ServicesSection e HTML avulsos não compõem as páginas atuais; não removidos |
| Chat | Ausente do `index.html`/árvore React ativa; cópias legadas em public e chat-widget, histórico localStorage e uso de innerHTML |

Os quatro deltas da mudança Fase 1 foram confrontados: manter marca, URLs, evidências rotuladas, HTML inicial e confirmação verdadeira. A tarefa 7.2 anterior segue pendente por teste assistivo real; não confundir árvore AX e axe com leitor de tela.

## Segurança e prioridades

- P0 de publicação: baseline de dependências contém advisory crítico de prototype pollution no Swiper e outros 19 avisos. Swiper não está importado na árvore ativa observada; isso limita alcance observado, não dispensa atualização e revisão em incremento próprio antes de produção. Sem upgrade automático nesta entrega.
- P1: endpoints de e-mail não têm limite/antispam verificável, validam pouco, interpolam HTML e devolvem exceção bruta (`api/index.py:115`, `backend/app.py:83`). Corrigir ambos na Sprint 2 e exigir gateway protegido antes da publicação.
- P1: CORS amplo na API alternativa; backend possui origens explícitas, mas sem controles contra clientes não browser. CORS não impede abuso.
- P1: políticas RLS e permissões de storage não constam no repositório. Proteção de rota React não comprova autorização do banco. Não realizadas consultas a dados privados, mutações ou tentativas de burlar acesso remoto; requer revisão autorizada de políticas no provedor.
- P1: entrega de leads/destinatário e configuração MailerSend/SMTP reais não verificados. Endpoints têm defaults de destinatário diferentes. Usar destinatário de teste apenas após confirmação.
- P2: cinco erros de lint legados e dependência de caminhos locais de QA; registrar sem escondê-los por desabilitação global.
- P2: widget desativado tem persistência local de conversa e innerHTML; manter desativado e revisar antes de qualquer reativação. Não há prova de exploração/implantação do serviço avulso.

`git ls-files .env` confirmou rastreamento. Histórico contém uma versão em `bfc520145a678c188065a5e0eb0c1d412591e1c9` (22/09/2025), com somente `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`; classificação local do token: papel anon. Nenhum valor foi emitido no relatório. Não se comprovou segredo administrativo nesse arquivo; não executar rotação ou reescrita de histórico por suposição. Segredos encontrados futuramente exigem interromper uso e rotação controlada. Recomenda-se deixar ambiente local ignorado e documentar apenas nomes, preservando o arquivo local existente.

## Produção e diferenças do briefing

Consulta pública de `https://www.codersa.com.br/` retorna título “Codersa | Engenharia de Software”, sem texto legível na ferramenta web. Isso não prova versão, SHA, equivalência visual ou sucesso do contato. Não houve acesso autenticado ao hosting. A arquitetura local já usa prerender e testes, diferentemente da hipótese de SPA pura do briefing; manter essa solução. `/servicos` já representa Soluções, portanto não criar `/solucoes` duplicada.

## Plano de arquivos e gate

Alterações previstas: `src/site/{content.js,Sections.jsx,contact-service.js,analytics.js}`, páginas Home/Services/Process/Contact e nova Blueprint, App e navegação; refinements.css para extensões pontuais; metadados e vercel.json; backend/app.py, template e api/index.py; configuração revisável de gateway; testes Node/Python/browser; cinco documentos da fase. Preservar tokens, imagens, auth/admin, avaliações e portfólio. Nenhuma migração de banco, stack ou deploy.

## Baseline visual e desempenho concluídos

Harness original `tests/browser-check.mjs` no HEAD-base, com cópia temporária apenas para redirecionar saídas: 61 verificações aprovadas, zero falhas. Abrange seis rotas em 320/375/768/1440 e ambos os temas, axe, teclado/menu, zoom 200%, redução de movimento, formulário com rede interceptada (incluindo timeout/retry/duplicidade), portfólio, manutenção, avaliações, login/admin e HTML sem scripts. Evidência: `reports/baseline/browser-check.json`. Uma primeira cópia do harness foi interrompida por leitura PowerShell sem UTF-8, corrigida e reexecutada; não era falha do site. O harness definitivo foi ampliado no mesmo arquivo original para a Fase 2.

24 capturas (seis rotas × dois temas × 390/1440) em `reports/baseline/screenshots/`, zero imagens quebradas; Home desktop inspecionada visualmente. Lighthouse 13.6.0 em Chrome headless, Node 24, build local, mobile/throttling simulado, três execuções por rota: Performance 100 em Home/serviços/processo/portfólio/sobre e 91 em contato; Accessibility/SEO 100, Best Practices 77. Condições completas e auditorias em `reports/baseline-lighthouse.json`; não são Core Web Vitals de usuários reais.

Ambiente Python preparado isoladamente com as dependências já declaradas no backend, imports Flask e MailerSend verificados. Nenhuma nova dependência da aplicação foi adicionada.

Inventário e baseline sustentam o incremento; gate de funcionalidades concluído. Riscos externos são bloqueios de lançamento, sem impedir implementação e testes locais controlados. Higiene: `.env` local preservado, removido do índice e ignorado; `.env.example` só contém nomes. Isso não remove histórico nem substitui revisão de RLS.
