# Design

## Context

Ver `proposal.md` para motivação. Inspeção local em 02/11/2026, HEAD `ac2865ad6b3832c54b5235ab245cd18c96ad0434`, commit de 29/10/2026 às 23:48:53 -03:00. A branch inicial era `main`; planejamento criado em `feat/codersa-phase-2-services`. Os briefings de Fase 2 e Fase 3 estavam não rastreados e serão preservados.

Estado observado, sem equivaler à auditoria completa da Sprint 0:

- `src/App.jsx`: seis rotas institucionais (`/`, `/servicos`, `/processo`, `/portfolio`, `/sobre`, `/contato`), avaliação, login e administração protegida. A navegação já chama `/servicos` de “Soluções”.
- `src/site/content.js` centraliza navegação, metadados, três ofertas e processo de três etapas. `Sections.jsx` e páginas públicas compõem a experiência vigente. Não presumir que componentes antigos com nomes semelhantes estejam ativos.
- Marca modular em `public/brand`, tokens em `src/index.css`, estilos públicos em `src/site/site.css` e `refinements.css`. Manrope, Source Serif 4, azul, grafite e papel, temas claro/escuro e movimento reduzido já existem.
- Build faz prerender React por `entry-server.jsx` e `scripts/prerender.mjs`, gera sitemap/robots; `vercel.json` aponta cada rota a seu HTML. Não existe necessidade demonstrada de migrar para SSR por requisição.
- `ContactPage.jsx` usa `src/site/contact-service.js`: POST ao Render por padrão, quatro campos, confirmação positiva, timeout e preservação dos dados. `src/components/ContactForm.jsx` é legado; não tratá-lo como formulário ativo.
- `backend/app.py` envia via MailerSend; `api/index.py` oferece `/api/send-email` via SMTP e tem CORS amplo. Há validação insuficiente, interpolação HTML e erros de provedor expostos. Não foi comprovado qual código está efetivamente publicado em cada provedor.
- `.env` é rastreado com nomes de URL e chave anônima do Supabase. Não foram publicados valores. Chave anônima de frontend não prova vazamento administrativo; RLS e histórico ainda exigem auditoria.
- Testes Node verificam contato e seis HTML. Testes browser dependem de `.codex-qa.local` e caminho local do Chrome; a disponibilidade deve ser verificada antes de prometer execução reproduzível.
- `rebrand-codersa-ai-first` permanece aberta, 33/34 tarefas. O teste real com leitor de tela ainda está pendente. Não há specs consolidadas; compatibilidade será confrontada com seus quatro deltas, sem alterar a mudança anterior.

## Goals / Non-Goals

**Goals:** estender a composição e o conteúdo existentes, garantir contexto comercial até o recebimento e manter compatibilidade de URLs, transporte, prerender e temas. A auditoria é o primeiro gate do apply.

**Non-Goals:** rebranding, migração de framework, banco ou CMS, checkout/pagamentos, dashboard de vendas, automação de marketing da Fase 3, criação de SaaS, reativação do chat, publicação ou remoção automática de legado. Não criar novas dependências sem necessidade demonstrada.

## Decisions

### 1. Preservar `/servicos` e acrescentar somente a rota Blueprint

Usar `/servicos/blueprint`; serviços complementares ficam em seções identificáveis de `/servicos`, preservando `#software`, `#automacao` e `#ia`. Destacar Blueprint na navegação sem redesenhar o menu. Não criar `/solucoes` duplicada. Essa escolha segue o briefing, cujos slugs são sugestões e que prioriza reutilização. Alternativa de migrar URLs exigiria redirects 301 e aumentaria risco sem ganho comprovado.

### 2. Ampliar os dados e componentes ativos

Expandir o modelo JavaScript de `content.js` com IDs estáveis de serviço, público, problema, entregáveis, limites e destino; adicionar dados Blueprint e FAQ específicos. Reutilizar `PageIntro`, estilos de botões/cards, FAQ e seções. Parametrizar apenas onde houver reutilização real; não introduzir TypeScript ou um motor genérico de páginas. Atualizar o processo para as cinco etapas com saídas claras e contratações independentes, inclusive em `/processo`.

Blueprint terá página dedicada, comparação Essential/Professional/Enterprise com inclusões/exclusões propostas em `02-services-content.md`, modalidades editoriais e CTA final para o formulário único. O acesso ao formulário será por navegação contextualizada, evitando duplicar estado e implementação do contato na página Blueprint. Copy será consultiva e exemplos serão demonstrativos.

### 3. Transportar contexto por identificador permitido

CTAs usam `/contato?servico=blueprint` ou ID conhecido. `ContactLink` recebe contexto e distingue o clique Blueprint do evento histórico de mapeamento. A seleção é editável; valores desconhecidos usam seleção neutra. Não transportar descrição ou PII por URL, storage ou eventos. O formulário renderiza inicialmente estado neutro compatível com prerender, aplicando o parâmetro no cliente sem mismatch de hidratação.

Manter `nome`, `email`, `assunto`, `mensagem` na rede. Serializar serviço com rótulo validado em assunto e empresa opcional, preferência e descrição em mensagem com rótulos claros. Manter assunto útil para pedidos de suporte existentes. Preferências iniciais: e-mail e WhatsApp; telefone opcional só aparece e se torna obrigatório se WhatsApp for escolhido. Não solicitar telefone para resposta por e-mail nem filtrar domínios gratuitos como se fossem e-mails inválidos. Limites de tamanho frontend/servidor devem incluir o envelope serializado; truncamento silencioso é proibido.

Alternativa de novos campos no JSON quebraria o contrato testado e exigiria implantação sincronizada do backend. Novo schema de lead e persistência não são necessários nesta entrega.

### 4. Proteger os dois caminhos de recebimento

Conservar Render como endpoint padrão e `VITE_CONTACT_ENDPOINT` como configuração; não trocar provedores implicitamente. Aplicar validação equivalente ao backend Render e à API Vercel: JSON objeto, strings, limites, formato de e-mail, proteção contra cabeçalhos injetados e corpo excessivo; escapar texto no HTML e retornar erros genéricos. Testes Python com provedores substituídos verificam que entradas rejeitadas não enviam e-mail.

Antispam mantém os quatro campos: campo isca apenas no cliente como camada auxiliar e política de limitação/filtragem no gateway de cada endpoint. Limitação distribuída será aplicada no gateway/proxy do hosting, antes do código de e-mail, com origem direta protegida; contador em memória não satisfaz execução multi-instância. Política inicial configurável: 5 tentativas por minuto por origem, HTTP 429 e janela de recuperação documentada. A candidata pode ser implementada e testada com gateway local; publicação fica bloqueada até demonstrar a mesma proteção no caminho público e ausência de bypass direto. Não provisionar serviço ou alterar infraestrutura de produção neste workflow.

Restringir CORS a produção e origens de teste explicitamente configuradas; CORS não substitui antispam. Logs não devem carregar payload ou exceção bruta do provedor. Não adicionar autenticação obrigatória ao contato público. Auditoria identifica APIs/widget expostos e riscos de RLS; remediações administrativas ou de histórico exigem escopo específico se extrapolarem contato.

### 5. Estender SEO e medição existentes

Adicionar Blueprint ao registro de metadados para gerar sétimo HTML e sitemap, rewrite específico antes do fallback, canonical sem query e compartilhamento existente. Os testes deixam de exigir seis páginas fixas e passam a verificar conjunto esperado e unicidade. Não migrar stack para resolver problema de SPA já tratado.

Expandir allowlists de eventos, rotas, origens e serviço. Manter `process_mapping_click` para fluxos existentes, acrescentar `blueprint_cta_click` e serviço permitido aos eventos de envio/erro. Nenhum campo livre entra no payload. Adaptador externo permanece desligado; relatórios não confundem cliques, recebimentos e contratos.

### 6. Auditoria e implementação em etapas verificáveis

O planejamento atual não executou `npm ci`, lint, build, testes, navegador ou auditoria do deploy. No apply, começar pela Sprint 0 e produzir `00-audit.md` com achados P0/P1/P2, evidências e arquivo-alvo antes de mudanças estruturais. Registrar a impossibilidade de verificar produção ou políticas remotas quando faltar acesso, sem declarar equivalência ao HEAD.

Arquivos candidatos:

| Área | Arquivos |
| --- | --- |
| Conteúdo e composição | `src/site/content.js`, `src/site/Sections.jsx`, `src/pages/HomePage.jsx`, `ServicesPage.jsx`, `ProcessPage.jsx`, nova `src/pages/BlueprintPage.jsx` |
| Navegação e contato | `src/App.jsx`, `src/components/Header.jsx`, `Footer.jsx`, `src/pages/ContactPage.jsx`, `src/site/contact-service.js`, `analytics.js` |
| Estilos | `src/site/site.css` e `refinements.css`, apenas ajustes necessários com tokens atuais |
| Servidor | `backend/app.py`, `backend/templates/email_template.html`, `api/index.py`, configuração revisável do gateway em `docs/phase-2/` |
| SEO e verificação | `vercel.json`, `scripts/prerender.mjs` se necessário, `tests/contact.test.mjs`, `static-pages.test.mjs`, verificações browser e testes Python de contato |
| Documentação | `docs/phase-2/00-audit.md`, `01-information-architecture.md`, `02-services-content.md`, `03-release-checklist.md`, `04-implementation-log.md` |
| Higiene de ambiente | `.gitignore` e exemplo de ambiente sem valores, conforme conclusão da auditoria |

## Risks / Trade-offs

- Backend publicado diferente do código local → verificar configuração e versão no apply; testar contra destinatário de teste sem envio real não solicitado.
- Limitação só no app ou gateway contornável → rejeitar como critério de publicação; verificar duas instâncias e acesso direto à origem. Falta de configuração do provedor não bloqueia testes locais, mas bloqueia lançamento.
- RLS não acessível e chave frontend rastreada → registrar limitação; verificar políticas com acesso autorizado. Não classificar chave anônima como segredo de servidor por nome, nem afirmar segurança só porque é pública.
- Conteúdo dos pacotes ainda não é contrato comercial → documentar matriz proposta e revisar precisão antes de publicar, sem inventar preços ou prazos.
- Aumento de páginas pode quebrar asserts fixos e hydration → atualizar testes de cardinalidade, acesso direto, temas e primeira renderização.
- Pendência assistiva da Fase 1 → registrar teste real com leitor e não declarar conformidade integral com base em axe.
- Produção não inspecionada nesta proposta → Sprint 0 compara quando acessível; equivalência de commit exige metadados verificáveis.

## Migration Plan

1. Revalidar branch/HEAD e preservar arquivos locais; concluir Sprint 0 e seu gate.
2. Implementar conteúdo e Blueprint em incrementos; manter catálogo e contato existentes disponíveis.
3. Proteger servidores e preparar política de gateway revisável; testar qualificação e falhas com rede e provedores controlados.
4. Validar build, testes, HTML inicial, APIs e acesso direto, responsividade 360/390/768/1024/1440, ambos os temas, zoom 200%, teclado, leitor de tela e desempenho antes/depois. Preservar cobertura de 320/375 da fase anterior.
5. Preparar checklist e PR com screenshots, limites verificados e rollback. Confirmar responsável, destinatário de teste, retenção e acesso; revisão jurídica do aviso quando aplicável. Nenhum envio externo ou deploy sem solicitação específica.
6. Somente após solicitação de publicação, aplicar proteção de gateway e backend antes do frontend, comprovar recebimento em teste e preservar deployment anterior. Rollback restaura frontend, servidores e configuração de gateway compatíveis, sem reabrir endpoint vulnerável. Não há migração de banco.

## Open Questions

- Qual deployment/commit atende cada domínio? Confirmar com metadados do provedor no apply; a estratégia local não depende dessa resposta.
- Quem operará a caixa de leads, qual destinatário de teste e qual política de retenção será adotada? Confirmar antes de envio externo e publicação; não presumir que o destinatário padrão de código seja o responsável aprovado.
