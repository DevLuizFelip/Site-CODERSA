# Linha de base técnica

Referência: 29/10/2026, America/Sao_Paulo. Código medido: `3b23b9a32e3d4396912a1fb0c5524cb4ae451b78`, antes das alterações no produto. Os timestamps UTC de execução estão no JSON; a data de referência segue o contexto do projeto.

## Build e lint

- `npm run build`: passou. Vite instalado 7.3.1, 125 módulos, JS 532,62 kB (159,80 kB gzip), CSS 43,88 kB (8,50 kB gzip). Avisos anteriores: chunk acima de 500 kB e base Browserslist desatualizada.
- `npm run lint`: falhou com 9 erros anteriores. Arquivos/regras em `relatorios/lint-baseline.txt`; não atribuir essas falhas ao redesign.
- Dependências do projeto instaladas a partir do lockfile existente, sem mudança no manifesto ou lockfile. Ferramentas de medição isoladas em `.codex-qa.local`, ignorado pelo Git.

## Condições reproduzíveis

Windows, Node 24.21.0, Chrome 156.0.8078.49, Lighthouse 13.6.0, Playwright 1.64.1. Build de produção servido pelo Vite em `http://127.0.0.1:4173`, em vez do servidor de desenvolvimento. Lighthouse mobile com throttling simulado: RTT 150 ms, throughput 1.638,4 Kbps, CPU ×4; tela 412×823, DPR 1,75. Três execuções sequenciais por rota, estado/storage limpo pelo Lighthouse, sem login nem envio de formulários. Dependências públicas de rede não foram substituídas por mocks.

O uso de HTTP local influencia o score de boas práticas. Dados de laboratório não representam Core Web Vitals de campo. Falhas de console e disponibilidade das dependências externas podem afetar a experiência; esta medição não comprova entrega de e-mail, conteúdo de cases ou funcionamento do domínio publicado.

## Resultados

| Rota | Performance (3 execuções) | Mediana Performance | Acessibilidade | Boas práticas | SEO | LCP mediano | TBT mediano | CLS mediano |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 96 / 96 / 96 | 96 | 91 | 77 | 82 | 2,209 s | 9 ms | 0,0019 |
| `/servicos` | 97 / 96 / 96 | 96 | 78 | 77 | 82 | 2,194 s | 33 ms | 0,0088 |
| `/processo` | 86 / 96 / 96 | 96 | 82 | 77 | 82 | 2,179 s | 9,5 ms | 0,0522 |
| `/portfolio` | 96 / 96 / 96 | 96 | 91 | 77 | 82 | 2,220 s | 11 ms | 0,00003 |
| `/sobre` | 96 / 96 / 96 | 96 | 82 | 77 | 82 | 2,181 s | 8 ms | 0,0038 |
| `/contato` | 96 / 97 / 96 | 96 | 81 | 77 | 82 | 2,185 s | 10 ms | 0,0116 |

As demais categorias também são medianas das três execuções. Nenhuma execução retornou `runtimeError`. A variação de `/processo` reforça o uso de mediana, não de uma única execução.

Achados automáticos incluem links sem nome acessível, ausência de meta description, fallback HTML servido como robots.txt, JavaScript não utilizado, dependências que bloqueiam renderização e erros de console. Scores não certificam conformidade WCAG; a implementação ainda exige testes manuais previstos nas tarefas.

## Reexecutar

1. Instalar as dependências do projeto a partir do lockfile.
2. Instalar ferramentas isoladas: `npm install --prefix .codex-qa.local --save-exact lighthouse@13.6.0 playwright@1.64.1`.
3. Executar `npm run build` e `npm run preview -- --host 127.0.0.1 --port 4173 --strictPort`.
4. Com Chrome no caminho indicado pelo script e a porta 9223 livre, executar `node docs/rebranding/relatorios/medir-baseline.mjs`.

O script sobrescreve `relatorios/baseline-lighthouse.json`; para medir a versão final, copiar/parametrizar o destino e preservar esta linha de base. O JSON contém scores, métricas, condições e IDs de auditoria; não guarda payloads de formulários, credenciais ou detalhes completos de requisições.

## Artefatos

- `relatorios/build-baseline.txt`: saída do build.
- `relatorios/lint-baseline.txt`: inventário dos nove erros anteriores.
- `relatorios/baseline-lighthouse.json`: 18 resultados individuais.
- `relatorios/medir-baseline.mjs`: procedimento usado na medição.
