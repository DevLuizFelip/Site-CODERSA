# Desempenho mobile — medianas de três execuções

| Rota | Baseline | Final | LCP antes (ms) | LCP final (ms) | CLS final |
| --- | ---: | ---: | ---: | ---: | ---: |
| / | 100 | 100 | 1355 | 1357 | 0.0000 |
| /servicos | 100 | 90 | 1354 | 2897 | 0.0006 |
| /servicos/blueprint | nova | 100 | — | 1357 | 0.0008 |
| /processo | 100 | 100 | 1354 | 1358 | 0.0006 |
| /portfolio | 100 | 100 | 1354 | 1505 | 0.0006 |
| /sobre | 100 | 100 | 1354 | 1357 | 0.0006 |
| /contato | 91 | 91 | 2794 | 2776 | 0.0003 |

Lighthouse de navegação local, sem INP de campo. Não comprova experiência em produção. Orçamento Performance ≥90 atendido nas medianas. Accessibility/SEO 100 e Best Practices 77 nas rodadas observadas; o valor de Best Practices já existia na base.

## Variação em serviços

A rodada completa registrou queda 100→90 e LCP 1354→2897 ms em `/servicos`. Nova rodada isolada, preservada em `services-follow-up-lighthouse.json`, retornou Performance 91/100/91. Não substituir a rodada original por uma execução favorável.

Um diagnóstico adicional do Lighthouse observou LCP de 1,4 s e identificou a introdução de `gc.kis.v2.scr.kaspersky-labs.com` entre os recursos bloqueantes de renderização (economia estimada de 631 ms nesse recurso). O LCP era o parágrafo introdutório. Esse script não aparece em busca nos fontes, assets ou HTML de entrada do repositório; foi observado na resposta/navegador do ambiente de QA. O diagnóstico também aponta CSS e theme-init entre os recursos bloqueantes.

Há interferência ambiental e dependências GET externas nas condições de medição. A comparação não demonstra que toda a variação venha da aplicação ou do antivírus, nem permite garantir ausência de regressão em produção. Preservar as amostras e repetir em runner controlado antes do lançamento; não desabilitar a proteção do computador do usuário como alteração do projeto. As pequenas variações de CLS (abaixo de 0,001) e a ausência de INP de campo também estão explicitadas.
