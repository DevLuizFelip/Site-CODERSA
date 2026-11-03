# CODERSA NEW — FASE 2 | Plano de implementação para agente de código

> **Tipo:** briefing executável + checklist de auditoria e implantação incremental  
> **Data:** 30/10/2026  
> **Repositório-alvo:** https://github.com/DevLuizFelip/Site-CODERSA  
> **Produção:** https://www.codersa.com.br/  
> **Missão:** transformar o rebranding já realizado na Fase 1 em um site comercial que venda serviços concretos da CODERSA, sem criar uma marca separada e sem descaracterizar o design vigente.

## 0. Contexto e limites do que foi verificado

Informações observadas na visualização pública do GitHub (a visualização pode estar defasada em relação ao HEAD atual):

- Repositório público `DevLuizFelip/Site-CODERSA`, branch `main` apresentada no GitHub.
- Diretórios visíveis: `api/`, `backend/`, `chat-widget/`, `public/`, `src/`.
- Arquivos visíveis: `package.json`, `vite.config.js`, `tailwind.config.js`, `vercel.json`, `eslint.config.js`, `README.md`, `.env`, e páginas HTML antigas/avulsas.
- `package.json` consultado contém React 19, Vite 7, Tailwind 3, React Router 7, Supabase JS, React Hot Toast, Swiper e outras dependências.
- Scripts apresentados: `dev`, `build`, `lint`, `preview`.
- O endereço de produção redireciona para `https://www.codersa.com.br/`, porém o conteúdo renderizado não foi passível de inspeção completa nesta consulta.
- **Não foi possível confirmar o SHA e a data exata do último commit, auditar todos os componentes nem validar a aparência final da Fase 1.** O agente, com acesso ao workspace, deve conferir essas informações antes de modificar arquivos.

**ATENÇÃO:** a presença de `.env` no índice público exige auditoria imediata de exposição de segredos. Não copiar, imprimir ou incluir valores de credenciais em relatórios. Caso segredos reais tenham sido versionados, recomendar revogação/rotação e remoção adequada do histórico por procedimento controlado.

## 1. Instruções obrigatórias ao agente

1. **Não reiniciar o projeto; não fazer rebrand novo.** Preservar logo, tipografia, tokens, paleta, componentes, animações e padrões de layout efetivamente existentes.
2. **Auditar antes de alterar.** Não inferir arquitetura real a partir de nomes de diretórios ou do briefing.
3. Trabalhar sobre uma **branch nova** (`feat/codersa-phase-2-services`); nunca aplicar mudanças destrutivas na `main` nem efetuar deploy sem aprovação.
4. Não substituir conteúdos da Fase 1 em massa. Fazer mudanças incrementais, revisáveis e com diffs claros.
5. Priorizar acessibilidade, desempenho, SEO, responsividade, segurança e conversão comercial.
6. Respeitar a stack e os padrões encontrados. Não adicionar frameworks, bibliotecas, CMS, bancos ou dependências sem justificativa técnica.
7. Não inventar clientes, depoimentos, cases, números de ROI, certificações, integrações ativas ou resultados comprovados.
8. Não divulgar preços como definitivos: valores do planejamento são apenas hipóteses internas a validar.
9. Proteger credenciais, dados de formulários e dados de prospects; verificar LGPD, retenção, finalidades e consentimentos adequados, com revisão jurídica onde necessário.
10. **Executar primeiro a auditoria e apresentar plano de arquivos a modificar.** Caso o ambiente permita execução contínua, avançar nas etapas de baixo risco; solicitar decisão apenas para alterações de alto impacto, rotas/posicionamento em conflito ou deploy.

## 2. Auditoria inicial obrigatória (FASE 2.0)

### 2.1 Estado Git e deploy

Executar no workspace:

```bash
git status --short
git branch --show-current
git log -1 --date=iso-strict --format='%H%n%ad%n%s'
git log -10 --oneline
git remote -v
```

Registrar: branch atual; SHA do HEAD; data e mensagem do último commit; diferenças locais; branch de produção (se verificável); e se o deploy publicado corresponde ao commit atual (somente se evidenciado por dados do provedor, metadados de build ou verificação reproduzível).

### 2.2 Inventário técnico

Mapear rotas, layouts, componentes, conteúdo, estilos, tokens, SEO, imagens, assets, formulários, back-end, widget de chat, analytics, integrações e chamadas de API.

Inspecionar `package.json`, arquivos em `src/`, `api/`, `backend/`, `chat-widget/`, configurações Vite/Tailwind/ESLint/Vercel e arquivos de documentação. Não expor conteúdo sensível.

Checar existência de arquivos/artefatos legados e sua relevância: não removê-los automaticamente.

### 2.3 Testes de linha de base

```bash
npm ci
npm run lint
npm run build
```

Rodar testes adicionais se existirem. Capturar erros existentes **antes** de introduzir mudanças. Verificar visualmente com navegador local, em desktop e mobile, todas as rotas existentes; verificar console, rede, imagens, estado hover/focus, redirecionamentos e fluxo de contato. Comparar o deploy apenas quando acessível.

### 2.4 Segurança prioritária

- Inspecionar se `.env` está rastreado via `git ls-files .env`; verificar somente **nomes das variáveis** e classe de risco, jamais publicar valores.
- Não presumir que todas as variáveis sejam segredos: diferenciar chaves públicas próprias de frontend de chaves administrativas/servidor.
- Confirmar `.gitignore`, uso correto de `VITE_*`, segredos no servidor, controles de acesso e endpoints expostos.
- Se houver segredos comprometidos, **interromper uso desses segredos e registrar recomendação de rotação**; não tentar 'resolver' apenas apagando o arquivo do último commit.
- Verificar validação de inputs, rate limiting, antispam, CORS, autenticação/autorização nas APIs, logging sem PII desnecessária e proteções do widget de chat.

### 2.5 Entregável da auditoria

Criar `docs/phase-2/00-audit.md` com:

- SHA/data realmente apurados;
- mapa real de rotas, páginas e componentes;
- arquitetura identificada;
- inventário visual e oportunidades de reaproveitamento;
- problemas classificados como P0 (segurança/produção), P1 (impedimento), P2 (melhoria);
- avaliação de riscos e dependências;
- lista de arquivos candidatos a alteração;
- diferenças entre esperado e observado;
- evidências (arquivos/linhas/testes/screenshots, sem segredos).

**Gate:** não implementar mudanças estruturais enquanto a auditoria não demonstrar o que já existe.

## 3. Objetivo de negócio e posicionamento

A CODERSA é uma empresa **AI-first de engenharia de software e inteligência artificial**. Ela transforma desafios de negócio em arquiteturas, sistemas, automações e aplicações de IA tecnicamente viáveis. A Fase 2 deve converter a experiência institucional da Fase 1 em um funil comercial claro.

Proposta de valor editorial (ajustar ao tom atual do site):

> **Da ideia à arquitetura. Da arquitetura à solução.**  
> Projetamos, especificamos e desenvolvemos software e soluções de IA para transformar processos e operações empresariais.

Jornada comercial: **Diagnosticar → Especificar → Validar → Implementar → Evoluir**.

O cliente pode contratar apenas diagnóstico, especificação ou avaliação, sem adquirir desenvolvimento. **Não prometer execução integral sem diagnóstico.**

## 4. Portfólio e ofertas

### 4.1 Oferta principal — CODERSA Blueprint

Serviço de especificação e arquitetura **independente da implementação**. É a oferta principal a destacar na navegação e nas chamadas para ação.

**Públicos-alvo:** fundadores, PMEs, gestores de produto, software houses e empresas com processos a digitalizar.

**Problema:** necessidade de construir/modernizar software sem requisitos, arquitetura, estimativa e plano técnico confiáveis.

**Entregáveis configuráveis por escopo:**

1. Resumo executivo e definição do problema.
2. Mapa de stakeholders, usuários e jornadas.
3. Requisitos funcionais e não funcionais, com premissas e exclusões.
4. Escopo de MVP, backlog priorizado e critérios de aceite.
5. Diagramas arquiteturais (C4/UML/fluxos quando pertinentes).
6. Modelo de dados e pontos de integração.
7. Estratégia de IA: necessidade real, provedores, RAG/agentes quando justificáveis, métricas de avaliação e controles humanos.
8. Stack sugerida com alternativas, trade-offs e justificativas.
9. Segurança, privacidade, observabilidade e requisitos de operação.
10. Roadmap por etapas e estimativas **com incertezas explicitadas**.
11. Registro de decisões arquiteturais (ADRs) e riscos.
12. Documentação PDF e fontes editáveis/versionáveis quando contratadas.

**Variações editoriais:** Blueprint Software, Blueprint AI, Blueprint Automation e Blueprint Modernization.

**Pacotes comerciais sem preço público inicial:** Essential (alto nível), Professional (especificação detalhada), Enterprise (complexidade e integrações sob proposta). Deixar explícito o que cada nível inclui e exclui. O produto não é um template genérico produzido por LLM; diferencial = validação de decisões técnicas.

### 4.2 Diagnóstico de oportunidades de IA

Mapeamento de processos, maturidade de dados, integrações e oportunidades com matriz impacto × esforço × risco. Entregável: relatório de prioridades, hipóteses de retorno e roteiro de implementação. Não apresentar ROI fictício como resultado garantido.

### 4.3 Intelligent Document Processing (IDP)

Organização, classificação, extração, validação e encaminhamento de documentos empresariais. Casos: cadastros, notas e contratos (com controle humano para interpretações sensíveis). Página deve explicar limitações, formatos e implantação por projeto, sem prometer acurácia universal.

### 4.4 Intelligent Automation & Integrations

Automação de fluxos de aprovação, integração de sistemas, CRM/ERP, notificações e tarefas. Recomendar automação determinística quando mais apropriada do que IA generativa.

### 4.5 AI Evaluation & Testing

Auditoria de soluções de IA: qualidade de resposta, grounding/RAG, alucinações, latência, custo, robustez, segurança e monitoramento. Entrega de método, amostra, critérios, métricas e recomendações. Explicitar que resultados dependem dos datasets e condições do teste.

### 4.6 Serviços complementares (não necessariamente páginas independentes no MVP)

- Documentação técnica e engenharia reversa de sistemas.
- Software architecture review e modernização de legados.
- AI Knowledge Systems/RAG com permissões e citação de fontes.
- Consultoria em arquitetura de IA e otimização de inferência.
- Governança técnica de IA (com suporte jurídico específico quando aplicável).
- Desenvolvimento e sustentação de software sob demanda.

## 5. Público-alvo e comunicação por problemas

**Primários para validação:**

1. Software houses e empresas SaaS: projeto técnico, arquitetura e documentação.
2. Empresas administrativas/contábeis: documentos e fluxos manuais.
3. Logística e operação: integrações, relatórios e aprovações.

Verticais futuras: indústria, agronegócio e eventos. A ordem é uma hipótese estratégica, não um dado de mercado comprovado.

**Tom:** técnico, objetivo, consultivo, acessível ao decisor de negócio, sem excesso de jargão, hype e promessas não demonstradas. A página deve responder rapidamente: o que resolvemos, para quem, como entregamos e como contratar.

## 6. Proposta de arquitetura de informação

**IMPORTANTE:** mapear primeiro as rotas existentes. Os slugs abaixo são sugestões; reutilizar paths atuais quando possível, preservar backlinks, implementar redirects 301 se alguma URL mudar.

- `/` — Home: incluir posicionamento e CTAs, sem refazer design.
- `/solucoes` — visão geral dos problemas e quatro áreas de atuação.
- `/solucoes/blueprint` — página prioritária, explicando escopo, processo, entregáveis, modalidades e FAQ.
- `/solucoes/inteligencia-artificial` — diagnóstico e engenharia de IA.
- `/solucoes/automacao` — IDP, integrações e automações.
- `/solucoes/engenharia-de-software` — arquitetura, documentação e desenvolvimento.
- `/solucoes/qualidade-de-ia` — evaluation, testing e governança técnica (fase posterior se houver pouca evidência comercial).
- `/contato` ou rota existente — captação de lead contextualizada.

Se o site já tiver páginas de serviços, **atualizá-las** em vez de duplicá-las. Não criar uma rota por serviço pequeno antes de validar demanda.

### 6.1 Conteúdo mínimo na Home

- Hero preservado no design, com posicionamento inteligível de engenharia de software/IA.
- Bloco ‘Como ajudamos’: diagnóstico, especificação, implementação, evolução.
- Card em destaque **CODERSA Blueprint**, com CTA ‘Solicitar um Blueprint’.
- Resumo de serviços relevantes, sem catálogo inflado.
- Bloco ‘Como trabalhamos’ com processo de contratação.
- CTA de conversa com contexto do serviço.

### 6.2 Página Blueprint — estrutura recomendada

1. Hero: título claro, subtítulo com benefício e CTA.
2. Dores comuns e contexto de contratação.
3. O que é / o que não é Blueprint.
4. Entregáveis e exemplos ilustrativos rotulados como demonstrativos.
5. Passos: descoberta → análise → especificação → revisão/entrega.
6. Pacotes por escopo, sem valores fixos no MVP.
7. FAQ: prazo condicionado à complexidade; propriedade e formatos contratados; independência de desenvolvimento; o que o cliente deve fornecer.
8. CTA final e formulário de qualificação.

### 6.3 Campos de formulário (mínimos)

Nome, email profissional, empresa (opcional), serviço de interesse, breve descrição do problema, preferências de contato e campo de privacidade/aviso aplicável. Não coletar documentos sensíveis neste primeiro contato. Confirmar sucesso/erro, validar dados no servidor, antispam e consentimentos quando necessários. Definir responsável real pelo recebimento de leads antes de publicar.

## 7. Diretrizes de UI, UX e acessibilidade

- **Fase 1 é a fonte da verdade visual.** Extrair design tokens existentes; não inventar nova paleta ou estilo.
- Reaproveitar componentes de cards, buttons, grids, header, footer, motion e hierarquia tipográfica.
- Garantir contraste suficiente, estados de foco visíveis, navegação por teclado, textos alternativos, `aria-*` quando pertinente e animações respeitando `prefers-reduced-motion`.
- Layout validado em 360, 390, 768, 1024 e 1440 px (ou breakpoints equivalentes).
- CTA primário consistente; não interromper a navegação com pop-ups excessivos.
- Evitar blocos genéricos de marketing sem explicação concreta do serviço.

## 8. Requisitos técnicos e SEO

- Centralizar dados de serviços em estrutura tipada/consistente **apenas se isso fizer sentido na arquitetura existente**; evitar repetição entre cartões e páginas.
- Usar roteamento existente e lazy loading onde houver ganho real.
- Titles e meta descriptions únicos por página, canonical correto, Open Graph/Twitter cards e sitemap/robots coerentes.
- Estrutura semântica `main`, `nav`, `section`, `h1...h3`; links internos funcionais.
- Não permitir links quebrados, imagens 404, layout shift evitável ou regressões de LCP/INP/CLS.
- Analisar se renderização atual permite indexação adequada. Caso SPA puramente client-side prejudique SEO, documentar opções de prerender/SSR e custo de mudança **antes** de migrar stack.
- Instrumentar eventos de CTA/form submit somente com plataforma já aprovada, sem expor PII em analytics.
- Para cada nova rota: estado vazio, loading e erro onde aplicável.

## 9. Execução incremental (ordem por prioridade)

### Sprint 0 — Auditoria e baseline

- [ ] Confirmar último commit SHA/data e status Git.
- [ ] Inspecionar código, rotas, site publicado e design system real.
- [ ] Registrar baseline lint/build/testes e screenshots.
- [ ] Auditar `.env`, APIs e widget de chat; registrar riscos.
- [ ] Gerar `docs/phase-2/00-audit.md`.

**Aceite:** mapa existente documentado, problemas priorizados, nenhum segredo exposto no relatório.

### Sprint 1 — Fundamentos comerciais

- [ ] Definir estrutura de conteúdo dos serviços.
- [ ] Integrar posicionamento e Blueprint ao fluxo existente da Home.
- [ ] Criar ou adaptar página visão geral de soluções.
- [ ] Criar página principal Blueprint.
- [ ] Conectar CTAs a rota de contato existente.

**Aceite:** conteúdo inteligível, navegação sem duplicação e visual coerente com a Fase 1.

### Sprint 2 — Serviços e conversão

- [ ] Adicionar páginas ou seções de IA, automação/IDP e engenharia conforme auditoria.
- [ ] Implementar formulário de qualificação confiável e testes para estados/validação.
- [ ] Adicionar FAQ, SEO e tracking permitido.

**Aceite:** jornada de lead validada end-to-end em ambiente de teste, sem dados sensíveis indevidos.

### Sprint 3 — Qualidade, revisão e lançamento

- [ ] Revisar copy de todos os serviços para precisão técnica/comercial.
- [ ] Executar lint/build/testes, smoke test, acessibilidade e responsividade.
- [ ] Verificar links, formulários, SEO, console e APIs.
- [ ] Produzir `docs/phase-2/03-release-checklist.md`.
- [ ] Preparar PR com screenshots antes/depois e notas de migração.
- [ ] Deploy apenas mediante aprovação.

**Aceite:** zero falha crítica; nenhum conflito com Fase 1; deploy reversível.

## 10. Métricas para avaliar a Fase 2

- Conversão de visitas em contato qualificado por serviço.
- Cliques no CTA do Blueprint.
- Formulários concluídos versus erros/abandono.
- Reuniões de diagnóstico e propostas enviadas.
- Taxa de proposta → contrato, ticket e margem após primeiras vendas.
- Performance web, acessibilidade e erros client/server.

Não adicionar gráficos ou números fictícios ao site público.

## 11. Artefatos a produzir no repositório

```text
docs/phase-2/
  00-audit.md               # Evidências do código e commit real
  01-information-architecture.md
  02-services-content.md    # Copy final e escopo por serviço
  03-release-checklist.md
  04-implementation-log.md  # Arquivos alterados, decisões e testes
```

O código final deve obedecer à estrutura existente; **não criar novos diretórios src artificialmente só para coincidir com este briefing**.

## 12. Modelo de resposta do agente após cada sprint

1. Estado Git: branch, HEAD e data do commit analisado.
2. O que foi auditado e evidências objetivas.
3. O que foi implementado: rotas e arquivos modificados.
4. Comandos executados e resultados (`lint`, `build`, testes).
5. Prints/comparações visuais, quando disponíveis.
6. Problemas remanescentes e suas prioridades.
7. Riscos de segurança, regressões e rollback.
8. Próxima etapa exata e dependências.

## 13. Comando inicial para o agente

> Leia integralmente `CODERSA_New_Fase_2_Agente_Codigo.md` e o briefing da Fase 1 (`CODERSA_New_Briefing_Rebranding.md`, se disponível). Faça a Sprint 0 antes de escrever funcionalidades. Verifique o SHA e a data do último commit no workspace, auditando as rotas, componentes, tokens visuais e o fluxo de contato existentes. Compare com o site de produção quando o ambiente permitir. Preserve a identidade e a arquitetura já implementadas. Gere `docs/phase-2/00-audit.md`, proponha a lista de arquivos a modificar e execute somente mudanças incrementais seguras, priorizando o CODERSA Blueprint. Não faça deploy sem aprovação. Nunca imprima segredos.

---

**Definição de sucesso da Fase 2:** site existente evoluído para comunicar e captar demandas por Blueprint, engenharia de software, IA e automação, mantendo a marca da Fase 1 e com evidência de qualidade técnica e fluxo comercial testado.
