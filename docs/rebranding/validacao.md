# Relatório de validação
Referência: 29/10/2026, ambiente local Windows, Node 24.21.0, Chrome 156.0.8078.49. Candidata no working tree sobre 3b23b9a32e3d4396912a1fb0c5524cb4ae451b78.

## Build e testes
Build cliente/SSR/HTML: passou; seis rotas geradas. 13 testes Node passaram (contrato, erros, timeout, eventos sem dados pessoais, HTML, metadados e rewrites). Saídas em relatorios/build-final.txt e testes-final.txt. Bundle inicial 275,25 kB (88,60 kB gzip), contra 532,62 kB (159,8 kB gzip) anterior; admin e cliente Supabase separados em chunks.
Lint: cinco falhas anteriores ainda presentes, contra nove na baseline. chat-widget/js/chat-widget.js e public/js/chat-widget.js: parâmetro save sem uso; AuthContext.jsx: export misto para Fast Refresh; Sidebar.jsx: navigate sem uso; SecurityPage.jsx: error sem uso. Nenhuma falha nova no relatório final. Não declarar lint aprovado. Avisos de Browserslist desatualizado e imports React sem uso no SSR permanecem; não impedem build.

Browser: 61 verificações passaram, zero falhas; relatorios/browser-check.json é a fonte dos resultados finais. Matriz de 48 combinações rota/tema/largura e 13 jornadas complementares; interceptação de rede para formulários, portfólio, manutenção e sessão de teste. Sem mutações reais. Um teste intermediário de admin escuro coincidiu com troca de assets durante rebuild; suite repetida com build estável. Hidratação escura, contraste das iniciais e quebra no texto ampliado corrigidos; comparação de foco usa identidade do elemento e árvore AX verifica main porque navegação mobile fechada não está exposta.

## Lighthouse mobile
Lighthouse 13.6.0; Chrome e Node iguais à baseline; throttling simulado mobile, armazenamento frio por execução, mesmas seis rotas localhost e três execuções cada. Servidor anterior Vite preview, atual servidor Node para HTML por rota; não é auditoria de produção. GET externos reais, nenhum envio. Parte inicial coincidiu com término de uma checagem de browser; isso limita comparação fina, sem excluir resultados. Dados e configurações completos em relatorios/final-lighthouse.json.

| Rota | Execuções performance | Mediana final | Baseline | Acessibilidade | SEO |
| --- | --- | --- | --- | --- | --- |
| / | 100 / 91 / 91 | 91 | 96 | 100 | 100 |
| /servicos | 100 / 100 / 100 | 100 | 96 | 100 | 100 |
| /processo | 100 / 100 / 100 | 100 | 96 | 100 | 100 |
| /portfolio | 100 / 100 / 100 | 100 | 96 | 100 | 100 |
| /sobre | 100 / 100 / 100 | 100 | 96 | 100 | 100 |
| /contato | 100 / 91 / 100 | 100 | 96 | 100 | 100 |

Todas as medianas de desempenho atingem ≥90; home recuou cinco pontos, demais avançaram quatro. Acessibilidade automática anterior variava 78–91 e SEO era 82. Best Practices permanece 77, com HTTP local e erros de console entre os apontamentos. Não confundir nota automática com conformidade integral, funcionamento das dependências remotas ou resultado comercial.

## Limites
Envio/recebimento externo, backend Python no hosting, disponibilidade dos canais, regras RLS em produção e deploy não foram validados. Testes de admin usam sessão fictícia interceptada e verificam UI/roteamento; não constituem auditoria de autorização do servidor. Consulta de portfólio mantém filtro público e storage original. HTML gerado não consulta nem contém dados privados. Manutenção integral exige regra de hosting, conforme hosting.md.
Leitor de tela: amostragem humana pendente, roteiro em acessibilidade.md; tarefa 7.2 permanece aberta. OpenSpec validado em modo strict. Nenhuma publicação executada.
