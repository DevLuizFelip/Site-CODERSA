# Proposal

## Why

A Fase 1 já estabeleceu identidade e experiência institucional, mas as ofertas ainda são genéricas e o contato não identifica o serviço procurado. A Fase 2 transforma essa base em uma jornada comercial para serviços concretos, priorizando CODERSA Blueprint como contratação independente de desenvolvimento.

## What Changes

- Executar Sprint 0 com baseline técnico, visual e de segurança e registrar `docs/phase-2/00-audit.md` antes de alterações estruturais.
- Evoluir Home, navegação e `/servicos`, preservando identidade modular, temas, URLs e componentes da Fase 1.
- Adicionar `/servicos/blueprint`, com processo, entregáveis configuráveis, modalidades, pacotes por escopo sem preços públicos e FAQ.
- Detalhar diagnóstico/engenharia de IA, automação/IDP e engenharia de software como seções da página existente; avaliação de IA será uma seção, sem rota exclusiva nesta entrega.
- Encaminhar CTAs com serviço selecionado a `/contato`, qualificar a solicitação e manter o contrato de transporte de quatro campos, confirmação verdadeira e possibilidade de nova tentativa.
- Endurecer o recebimento de contato no servidor, com validação, antispam, limitação de requisições e tratamento seguro de conteúdo e erros.
- Estender prerender, metadados, sitemap, hosting e eventos locais sem dados pessoais. Entregar documentação, testes e candidata revisável com rollback.
- Manter publicação dependente de solicitação explícita e confirmação de responsável/destinatário real para os leads.

## Capabilities

### New Capabilities

- `service-catalog`: apresentação de serviços por problema, público, entrega e limites, integrada à Home e às URLs atuais.
- `blueprint-offering`: oferta prioritária de especificação e arquitetura independente de desenvolvimento.
- `lead-qualification`: contexto de serviço entre CTA e contato, qualificação acessível e recebimento protegido e verificável.

### Modified Capabilities

Nenhuma spec consolidada existe em `openspec/specs/` (`openspec list --specs`). A mudança ainda aberta `rebrand-codersa-ai-first` contém deltas de `public-website`, `commercial-contact`, `brand-system` e `evidence-content`; eles são referência de compatibilidade, sem reescrita ou arquivamento nesta proposta. As novas capacidades descrevem apenas o incremento da Fase 2, sem duplicar os requisitos gerais anteriores.

## Impact

Frontend React 19/Router 7 e Vite existentes: `src/site/content.js`, `Sections.jsx`, `ContactPage.jsx`, `contact-service.js`, `analytics.js`, Home, Services, Process, Header, Footer e nova página Blueprint. Hosting e SEO: `vercel.json`, prerender e testes de HTML. Servidor: `backend/app.py`, template e `api/index.py`, respeitando a diferença entre Render padrão e API alternativa da Vercel. Documentos em `docs/phase-2/` e testes existentes serão ampliados sem migração de stack, CMS ou banco.

Auditoria deve verificar RLS do Supabase e riscos de APIs/widget sem reativar chat nem alterar administração por conveniência. `.env` está rastreado com os nomes `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`; isso não comprova vazamento de segredo administrativo. A entrega externa de e-mail e a correspondência entre produção e HEAD ainda não foram verificadas. A pendência de leitor de tela da Fase 1 deve permanecer explícita até validação real.
