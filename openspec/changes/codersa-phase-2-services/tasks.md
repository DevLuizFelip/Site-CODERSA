# Tasks

## 1. Sprint 0 — Auditoria e baseline antes de funcionalidades

- [x] 1.1 Revalidar branch `feat/codersa-phase-2-services`, status, HEAD/data, dez commits e remotes; preservar alterações locais e registrar estado real em `docs/phase-2/00-audit.md`, sem assumir correspondência com produção.
- [x] 1.2 Inventariar rotas ativas, composição, tokens, assets, consultas Supabase, APIs, chat, formulários e analytics; entregar mapa com arquivos/linhas, legado identificado e comparação com os deltas da Fase 1, registrando a pendência de leitor de tela sem encerrar a mudança anterior.
- [x] 1.3 Executar `npm ci`, `npm run lint`, `npm run build` e `npm test` antes de alterar código; registrar versões, saídas e falhas anteriores no relatório, verificando também disponibilidade das ferramentas browser e ambiente Python.
- [x] 1.4 Capturar baseline visual das rotas públicas nos dois temas e desktop/mobile, testar menu/foco/contato com rede interceptada e medir desempenho mobile em três execuções equivalentes; anexar evidências e limitações, comparando produção quando acessível sem declarar SHA não comprovado.
- [x] 1.5 Auditar rastreamento/histórico de ambiente sem imprimir valores, classificação de variáveis públicas versus administrativas, RLS verificável, CORS, validação, logging, antispam e exposição de APIs/chat; registrar P0/P1/P2 e recomendar rotação controlada se houver segredo real, sem usar credenciais comprometidas.
- [x] 1.6 Finalizar `00-audit.md` com riscos, diferenças do briefing, dependências e lista de arquivos a alterar; iniciar `04-implementation-log.md` e confirmar pelo relatório que o inventário sustenta as mudanças antes de iniciar Sprint 1. Corrigir eventual higiene de ambiente em incremento próprio, com diff sem valores e exemplo seguro.

## 2. Sprint 1 — Catálogo e fundamentos comerciais

- [x] 2.1 Entregar `01-information-architecture.md` com `/servicos`, nova `/servicos/blueprint`, anchors existentes e caminhos CTA → contato; verificar ausência de catálogo duplicado e documentar preservação de todas as URLs públicas e privadas.
- [x] 2.2 Redigir `02-services-content.md` com problemas, públicos, entregas e limites das ofertas, quatro modalidades Blueprint, matriz de inclusões/exclusões dos três pacotes e FAQ; revisar cada afirmação, sem preços públicos, prazos garantidos ou evidências fictícias.
- [x] 2.3 Ampliar dados em `src/site/content.js` e composição de `Sections.jsx`/Home/Services/Process para destacar Blueprint e as cinco etapas comerciais; verificar no preview os temas e a possibilidade de contratar diagnóstico, especificação ou avaliação independentemente, registrando screenshots e decisões no log.
- [x] 2.4 Criar `BlueprintPage.jsx`, adicionar rota e destaque na navegação existente usando componentes/tokens atuais; verificar hero, dores, definição, entregáveis, exemplos rotulados, etapas, pacotes, FAQ e CTA final com teclado e menu móvel.
- [x] 2.5 Acrescentar metadados e rewrite Blueprint antes do fallback; ampliar testes de HTML/sitemap para sete rotas, canonical sem query e exclusão de privadas; executar build e testes de HTML, verificando acesso direto e conteúdo Blueprint sem JavaScript e preservação de `/api/*`.

## 3. Sprint 2 — Qualificação e recebimento protegido

- [x] 3.1 Estender `ContactLink` e CTAs para transmitir somente IDs de serviço permitidos; testar acesso direto, seleção Blueprint, troca de serviço, parâmetro inválido e preservação dos anchors e do contato geral/suporte, sem PII na URL.
- [x] 3.2 Ampliar formulário ativo com empresa opcional, serviço, descrição, preferência e telefone condicional para WhatsApp; verificar rótulos, erros associados, foco, privacidade e obrigatoriedade correta, mantendo ambos os temas e sem mismatch de hidratação.
- [x] 3.3 Serializar a qualificação em assunto/mensagem mantendo exatamente os quatro campos do contrato; ampliar `tests/contact.test.mjs` para seleção, campos opcionais, limites incluindo envelope e telefone condicional, além de HTTP, rede, corpo negativo, JSON inválido e timeout, verificando preservação dos dados e ausência de conversão falsa.
- [x] 3.4 Endurecer `backend/app.py` e `api/index.py` com validação de JSON/tipos/limites/e-mail/cabeçalhos, escape de HTML, CORS configurável e erros/logs seguros; adicionar e executar testes Python com MailerSend/SMTP substituídos, comprovando que entradas inválidas não disparam mensagens e que o contrato anterior continua aceito.
- [x] 3.5 Preparar configuração revisável de gateway com limite inicial de 5 tentativas/minuto por origem, filtragem de spam e proteção da origem direta, mais isca auxiliar no cliente; testar HTTP 429 e ausência de disparos em duas instâncias locais e documentar configuração/bypass e recuperação. Registrar como bloqueio de publicação se o provedor real ainda não tiver proteção equivalente verificada.
- [x] 3.6 Estender allowlists de analytics para rota Blueprint, serviço e `blueprint_cta_click`, mantendo eventos existentes e adaptador externo desligado; testar descarte de parâmetros arbitrários/PII, erro do adaptador e exatamente um evento de sucesso por tentativa confirmada.
- [x] 3.7 Ampliar testes browser para CTA → qualificação → envio controlado, duplicidade, falhas e nova tentativa; executar com interceptação de rede sem enviar ao destinatário real e registrar em `04-implementation-log.md` contrato, configuração, política de dados e limites das verificações.

## 4. Sprint 3 — Revisão e candidata de lançamento

- [x] 4.1 Revisar copy integrada de Home, catálogo, Blueprint, processo e contato contra `02-services-content.md`; verificar inclusões/exclusões, independência do desenvolvimento, hipóteses comerciais e exemplos rotulados, atualizando o documento com o conteúdo final.
- [x] 4.2 Executar regressão nas larguras 320/360/375/390/768/1024/1440, temas claro/escuro, zoom 200%, teclado, foco, contraste e movimento reduzido; realizar amostragem real com leitor de tela ou registrar a pendência explicitamente, com screenshots e resultados no checklist sem declarar conformidade integral a partir de automação.
- [x] 4.3 Executar lint, build, testes Node/Python e smoke integrado de links, imagens, console, rede, HTML, navegação cliente, acesso direto/reload, manutenção, portfólio vazio/erro, login, avaliação e bloqueio de admin sem sessão; registrar falhas anteriores versus introduzidas e corrigir regressões críticas antes de liberar candidata.
- [x] 4.4 Repetir três medições mobile por rota institucional, incluindo Blueprint, com as condições do baseline; comparar LCP/CLS e INP quando medido, registrando limites de laboratório, mediana Lighthouse Performance ≥90 ou exceção explícita e regressões em `03-release-checklist.md`.
- [x] 4.5 Consolidar `03-release-checklist.md` e `04-implementation-log.md` com evidências, arquivos, testes, bloqueios externos, procedimento de rollback de frontend/backend/gateway e critérios de destinatário/responsável/retenção; verificar que testes simulados não são apresentados como recebimento externo validado.
- [x] 4.6 Preparar PR revisável com escopo final, screenshots antes/depois, resultados, configuração e rollback, preservando briefings locais e sem publicar; verificar diff, ausência de segredos e todos os critérios satisfeitos ou limitações explicitamente registradas.

## Workflow follow-up

- Confirmar responsável, destinatário de teste, política de retenção/acesso e aviso aplicável antes de qualquer envio externo; realizar teste de recebimento somente quando autorizado, com dados sintéticos.
- Publicar apenas após solicitação explícita, proteção real de gateway/origem comprovada, testes integrados e checklist de liberação satisfeitos; preservar deployments e configuração anterior para rollback.
- Manter a pendência assistiva da Fase 1 visível até evidência real; não arquivar nem alterar aquela mudança como efeito colateral.
- Arquivar esta mudança pelo workflow próprio após implementação e revisão, preservando a coerência com specs da Fase 1 quando forem consolidadas.
