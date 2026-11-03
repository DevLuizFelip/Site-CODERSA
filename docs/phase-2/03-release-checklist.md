# Candidata Fase 2 — checklist de revisão

Referência: 03/11/2026, America/Sao_Paulo. Branch `feat/codersa-phase-2-services`; base `ac2865ad6b3832c54b5235ab245cd18c96ad0434`. Implementação local, sem commit/push ou deploy. A conclusão das tarefas locais não libera produção automaticamente.

## Escopo revisado

- [x] Auditoria e baseline antes das funcionalidades (`00-audit.md`).
- [x] Marca, tokens, fontes, temas e estrutura da Fase 1 preservados; Blueprint em Home/catálogo/navegação e página dedicada.
- [x] `/servicos` e anchors preservados; nenhuma duplicação em `/solucoes`; sete HTML institucionais, sitemap/canonical/OG e rewrites explícitos.
- [x] Blueprint independente de implementação, com modalidades, entregáveis, matriz de pacotes, exclusões e FAQ; sem preço público ou evidência fictícia.
- [x] Qualificação contextualizada e editável, empresa opcional e telefone somente para WhatsApp; quatro campos de transporte; confirmação e retry controlados.
- [x] Servidores validam entradas, escapam HTML, restringem CORS e ocultam erros sensíveis; destinatário explícito e origem fechada sem gateway.
- [x] Analytics local por allowlist, sem dados pessoais ou provedor externo ativado.

## Verificação executada

| Verificação | Resultado e evidência |
| --- | --- |
| Instalação/build | `npm ci` e `npm run build` aprovados; sete HTML gerados |
| Testes Node | 18/18: contrato, falhas, timeout, limites, contexto, telefone, privacidade e HTML/hosting |
| APIs Python | 7/7 grupos, com casos positivos, malformados, tamanho, CORS, escape, origem e falha de provedor; sem mensagens reais |
| Gateway real local | nginx 1.31.8, duas instâncias: cinco aceitações iniciais, três 429 sem envio, origem 403 e recuperação após 13s; `reports/gateway.json` |
| Browser/axe | 112/112; sete rotas × dois temas × 320/360/375/390/768/1024/1440, mais jornadas integradas; `reports/final/browser-check.json` |
| Contato integrado controlado | CTAs, qualificação, seleção/troca, contexto inválido, falhas/retry, duplo envio, foco e evento único de sucesso; rede interceptada |
| Regressão de funções | Portfólio vazio/erro/retry/público, manutenção e timeout, avaliação moderada, login e admin sem sessão e com sessão sintética |
| Teclado/acessibilidade | Menu, Escape e retorno de foco, salto, FAQ, labels/erros, dois temas e movimento reduzido; axe sem violações nos cenários testados |
| Ampliação | 200% de texto em Home/contato e Blueprint nos dois temas sem overflow; `reports/final/blueprint-zoom.json`; árvore assistiva é evidência de estrutura, não teste de leitor real |
| Screenshots | 24 antes e 28 depois; sete páginas finais em 390/1440 e dois temas, sem imagens quebradas; Home/Blueprint/contato inspecionados |
| Lighthouse mobile | Três execuções por rota; resultados completos e comparação em `reports/performance-summary.md` e JSONs originais; INP de campo não medido |
| Lint | Arquivos JS alterados sem erros. `npm run lint` ainda falha nos mesmos cinco pontos anteriores, listados na auditoria; não houve supressão global |
| OpenSpec/diff | Validação estrita aprovada; `git diff --check` sem erro de whitespace; briefings locais preservados |

`.venv` foi excluída do escopo ESLint para não analisar JavaScript de dependências Python instaladas para QA. Isso não oculta erros de código do projeto.

## Pendências e bloqueios para publicação

- [ ] Revisar/corrigir as 20 vulnerabilidades preexistentes de dependências, incluindo advisory crítico de Swiper. Não houve upgrade automático nem declaração de segurança integral.
- [ ] Preparar gateway real equivalente e confirmar identidade do cliente, quota compartilhada, proteção da origem e CORS nas respostas de erro. Não usar só contador por worker ou esconder a URL como proteção.
- [ ] Confirmar responsável pela caixa de leads, `DESTINATION_EMAIL`, remetente/provedor, política de acesso/retenção/exclusão e aviso aplicável; revisar juridicamente quando necessário.
- [ ] Receber autorização específica para teste externo e comprovar chegada em destinatário de teste com dados sintéticos. Sucesso simulado não comprova entrega real.
- [ ] Verificar políticas RLS/storage no Supabase com acesso autorizado. Não houve inspeção de dados privados ou teste remoto de mutação.
- [ ] Realizar amostragem real com Narrador/NVDA/JAWS. A pendência de Fase 1 permanece; axe/AX não comprova conformidade WCAG integral.
- [ ] Registrar deployment/commit de produção pelo provedor; a equivalência ao HEAD não está comprovada.
- [ ] Revalidar desempenho em runner controlado: a medição local de serviços variou e o diagnóstico observou script externo injetado pelo antivírus entre os recursos bloqueantes. Preservar comparação e amostras de `reports/performance-summary.md`; não tratar esse teste como garantia de ausência de regressões em produção.
- [ ] Resolver as cinco falhas preexistentes de lint para ter lint global verde antes de uma política de CI que o exija.
- [ ] Revisão comercial final dos níveis de pacote e condições contratuais; conteúdo não promete prazo/preço fixo ou transferência automática de propriedade.
- [ ] Solicitação explícita de deploy, com configuração e rollback revisados.

## Ordem de implantação quando autorizada

1. Preservar identificadores dos deployments atuais de frontend/backend e configuração de gateway, domínios e variáveis no mecanismo seguro do provedor. Não exportar valores para este repositório.
2. Preparar gateway e segredo forte, CA/TLS, limites e origem protegida; configurar destinatário explícito e dados de teste. Validar antes de interromper o caminho atual.
3. Promover backend protegido e caminho de gateway compatíveis. Verificar que acesso direto falha fechado, que o proxy não tenta novamente um POST e que as duas instâncias compartilham quota.
4. Configurar `VITE_CONTACT_ENDPOINT` para caminho protegido e promover frontend com build validado. Verificar URLs/HTML direto, menu, temas, contato, portfólio, manutenção e área privada.
5. Confirmar recebimento em teste autorizado e logs sem PII desnecessária. Só então liberar conforme decisão do responsável.

## Rollback

Restaurar frontend e metadados/rewrites do deployment preservado. Reverter backend/gateway apenas para uma combinação protegida e compatível; não reabrir endpoint sem limitação para restaurar um fluxo aparentemente funcional. Se não houver backend seguro anterior, manter envio indisponível com erro e canais diretos reais enquanto se corrige a configuração.

Verificar acesso direto às rotas antigas, HTML e API sem resposta SPA, login/bloqueio de admin, manutenção e contato. Não há migração de banco nesta entrega. Preservar dados de usuários e não reescrever histórico Git. Fallback de código-base é o HEAD acima em checkout separado com seu lockfile, sem sobrescrever a branch atual.
