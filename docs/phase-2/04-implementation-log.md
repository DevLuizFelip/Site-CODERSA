# Registro de implementação — Fase 2

## Sprint 0 — 02/11/2026

Branch `feat/codersa-phase-2-services`, HEAD-base `ac2865ad6b3832c54b5235ab245cd18c96ad0434`. Auditoria em `00-audit.md`. npm ci/build e 13 testes passaram; lint possui cinco falhas anteriores. Baseline browser: 61/61. Capturas: 24, sem imagens quebradas. Lighthouse: três execuções por seis rotas, Performance 91–100.

Ambiente e credenciais: nenhum segredo impresso, envio real ou alteração de dado remoto. `.env` deixa de ser rastreado, permanece local e ignorado; exemplo sem valores. Histórico preservado; não houve comprovação de chave administrativa no arquivo. Dependências Python existentes instaladas em `.venv` para testes.

## Decisões de continuidade

Preservar `/servicos`, anchors e identidade. Única rota nova `/servicos/blueprint`. Serviços complementares em seções. Formulário único com contexto e quatro campos de transporte. Blueprint independente de desenvolvimento. Não reativar chat. Não publicar. Não modificar a mudança OpenSpec da Fase 1.

## Sprints 1 e 2

`01-information-architecture.md` e `02-services-content.md` definem rotas e copy. `content.js` amplia catálogo, processo e dados Blueprint; `Sections.jsx`, Home e Services preservam composição, com destaque da oferta. `BlueprintPage.jsx` contém escopo, modalidades, pacotes, entregáveis, demonstração e FAQ. App e vercel.json incluem a nova rota; teste de HTML verifica sete rotas, canonical e sitemap.

Contato passa serviço por query permitida e serializa qualificação nos quatro campos existentes. Adiciona preferência e telefone condicional, empresa opcional, aviso e isca; sem storage novo de PII. Analytics aceita serviço permitido e clique Blueprint, mantendo provedor externo desligado. 18 testes Node passaram; lint dos arquivos JS alterados passou.

`backend/contact_security.py` compartilha validação, CORS e bloqueio de origem; Render e Vercel escapam HTML e ocultam exceções. Sem destinatário explícito ou gateway configurado, recusam envio. Sete testes Python passaram com MailerSend/SMTP falsos. Contrato, configuração, retenção ainda pendente e limitações: `contact-operation.md`.

Browser final: 112/112 verificações aprovadas após reiniciar o preview para carregar os metadados novos. Uma execução anterior foi invalidada por reinício do servidor no meio da matriz; a execução completa posterior passou. 28 screenshots das sete rotas, temas claro/escuro e 390/1440 sem imagens quebradas. Evidências em `reports/final/`.

## Sprint 3 — 03/11/2026

Revisão da copy contra `02-services-content.md` concluída; nenhuma evidência de cliente inventada. Header usa correspondência exata para não anunciar Soluções e Blueprint simultaneamente como página atual. Blueprint tem CTA também no hero. Telefone exige dígitos reais, não apenas comprimento/formatação; teste específico cobre espaços, pontuação e número sem DDD.

Gateway: template validado com nginx 1.31.8, duas instâncias locais e segredo efêmero; testou limite agregado, origem bloqueada, header de IP forjado e recuperação. `reports/gateway.json`. Ajustes de QA: bucket do mapa explicitado e diretório temporário do nginx criado no harness; nenhum recurso de produção alterado.

Build final, 18 testes Node e sete grupos de testes API aprovados; arquivos JS alterados sem erros de lint. Lint global permanece com cinco falhas legadas. `.venv` adicionada ao ignore do ESLint após instalação das dependências Python, sem silenciar fontes da aplicação. Validação estrita OpenSpec e diff check aprovados. Browser reexecutado após mudanças visuais: 112/112; envio real, RLS e leitor de tela continuam não comprovados.

Medição final completa: 21 execuções e orçamento ≥90 atendido nas medianas. Serviços teve queda 100→90 e LCP 1354→2897ms nessa rodada; demais medianas e CLS estão em `reports/performance-summary.md`. A queda não é rotulada como pequena nem atribuída ao código sem evidência: uma nova rodada isolada de serviços foi preparada para verificar variabilidade de laboratório. INP de campo não medido; não afirmar ausência de toda regressão a partir destes testes.

Rodada isolada de serviços: 91/100/91. Diagnóstico posterior: LCP 1,4s e script externo de domínio Kaspersky entre os recursos bloqueantes; esse domínio não aparece no código/HTML/assets do repositório. Interferência ambiental registrada, sem desativar proteção do usuário, sem apagar amostras desfavoráveis e sem atribuir causalidade exclusiva. Revalidação em runner controlado antes de produção permanece no checklist.

Configuração/rollback e bloqueios externos em `03-release-checklist.md` e `contact-operation.md`. Nenhum deploy, envio externo, upgrade de dependências ou mudança no banco. `.env` permaneceu local e fora do índice; remoção não altera seu histórico.

## Preparação para envio ao GitHub — 03/11/2026

Usuário solicitou o envio do código ao GitHub após revisar o preview. Preparar commit na branch `feat/codersa-phase-2-services`, incluindo briefing da Fase 2, implementação, OpenSpec e evidências; manter o briefing de Fase 3 local. O pedido não promove a candidata a produção e não altera os bloqueios de lançamento. Nenhum merge ou deploy foi solicitado nesta etapa.
