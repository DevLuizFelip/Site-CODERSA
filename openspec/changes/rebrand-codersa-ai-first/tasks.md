# Tasks

## 1. Diagnóstico e decisões comerciais

- [x] 1.1 Registrar em `docs/rebranding/diagnostico.md` o inventário das rotas, ações, conteúdo, ativos e integrações observados no design; verificar cada apontamento com referência ao arquivo e separar observação local de auditoria de produção.
- [x] 1.2 Executar build/lint atuais e medir as seis rotas institucionais em Lighthouse mobile com três execuções por rota; entregar relatório de baseline com versões, condições, resultados e falhas anteriores identificadas.
- [x] 1.3 Preparar matriz de público, necessidades, ofertas reais e hipóteses de nicho; apresentar recomendação e registrar a seleção do fundador em `docs/rebranding/decisoes.md`, sem marcar hipótese como oferta aprovada.
- [x] 1.4 Inventariar evidências, pessoas, canais, agenda e recursos baixáveis; entregar manifesto com fonte, autorização, data de revisão e disponibilidade, incluindo fallback real quando faltar case ou canal corporativo.
- [x] 1.5 Definir funil, denominador, janela inicial proposta de 30 dias e critério de sucesso comercial com base no diagnóstico; verificar que o documento distingue meta proposta, meta validada e resultado medido.

## 2. Direções visuais e kit de marca

- [x] 2.1 Criar 2–3 direções visuais comparáveis com homepage desktop/mobile, avatar e carrossel, incluindo evolução do terminal e alternativa modular/de fluxo; verificar que todas são identificadas como propostas e mantêm CODERSA como marca principal.
- [x] 2.2 Apresentar as direções e registrar escolha do fundador para logo, cores, fontes e voz com data e origem da confirmação; verificar o registro antes de executar as tarefas de consolidação visual.
- [x] 2.3 Consolidar kit vetorial, monocromático, claro/escuro e favicon com fontes/licenças e manual de aplicação; verificar legibilidade a 16/32 pixels e contraste por combinação/estado.
- [x] 2.4 Entregar aplicações da direção selecionada em homepage, painel de referência, avatar, post e carrossel; verificar consistência e documentar uso de verde apenas em sucesso.
- [x] 2.5 Consolidar copy e protótipo das seis rotas institucionais, incluindo hero candidato do briefing, fluxo, ofertas, FAQ e contato; registrar revisão comercial e visual desktop/mobile antes da implementação definitiva.

## 3. Base visual e navegação

- [x] 3.1 Implementar tokens aprovados em `src/index.css` e `tailwind.config.js`, atualizar ativos e tipografia e substituir cores fixas conflitantes nas páginas públicas; verificar ambos os temas e registrar regressão visual de login/admin.
- [x] 3.2 Atualizar header/footer e navegação para Soluções, Como funciona, Resultados, Sobre e Contato preservando URLs; verificar menu móvel com teclado, Escape, estado expandido e fechamento após seleção.
- [x] 3.3 Corrigir semântica de landmarks, foco, nomes de links/ícones e redução de movimento; verificar teclado, contraste e movimento reduzido em cada componente modificado e registrar os resultados.

## 4. Conteúdo institucional e evidências

- [x] 4.1 Expandir `HomePage.jsx` e o hero em seções de problema, situações, fluxo identificado, ofertas, evidências, processo, pessoas, FAQ e contato; verificar presença de todas as seções e CTA “Mapear meu processo” com destino real.
- [x] 4.2 Revisar `ServicesSection.jsx`, `ProcessPage.jsx` e `AboutPage.jsx` com conteúdo validado; verificar remoção de claims não comprovados, workshop expirado, presença online fictícia e links de setores sem destino.
- [x] 4.3 Substituir “Ver Detalhes” por ação acessível com conteúdo real ou omitir a ação; remover download sem arquivo e CTA de demonstração sem destino, verificando todos os links nas páginas afetadas.
- [x] 4.4 Atualizar portfólio/cards mantendo a consulta e storage atuais, incluindo estados distintos de carregamento, erro e vazio; verificar esses estados com respostas controladas e garantir que apenas projetos públicos sejam mostrados.
- [x] 4.5 Aplicar o manifesto editorial aos cases, demonstrações, pessoas e métricas; verificar em revisão que cada fato publicado tem evidência/autorização e cada exemplo simulado tem rótulo visível.
- [x] 4.6 Entregar templates finais de post/carrossel e guia do fluxo editorial manual com uma pauta preenchida; verificar uso da identidade selecionada, fonte e revisão, sem publicar em redes.

## 5. Contato e conversão

- [x] 5.1 Atualizar o formulário realmente usado em `ContactPage.jsx`, mantendo endpoint padrão e payload, com campos obrigatórios e erros acessíveis; verificar que dados inválidos não geram requisição.
- [x] 5.2 Implementar confirmação por HTTP e corpo positivo, timeout de 15 segundos e bloqueio de duplicidade; adicionar testes comportamentais com rede controlada para sucesso, resposta negativa, erro HTTP, rede e timeout, verificando preservação dos dados e nova tentativa.
- [x] 5.3 Remover popup automático, cópia por e-mail e prazo sem comprovação; apresentar canais confirmados por finalidade e WhatsApp voluntário, verificando sucesso sem abertura de outra aplicação.
- [x] 5.4 Adicionar eventos de CTA, envio confirmado e erro por adaptador com provedor externo desativado; verificar uma conversão por tentativa bem-sucedida, nenhuma por falha e ausência de dados pessoais nos eventos.
- [x] 5.5 Documentar endpoint, estados, timeout, canais e configuração da medição; validar cenários controlados e, se houver staging com destinatário de teste, registrar o teste integrado sem declarar envio externo validado quando indisponível.

## 6. HTML indexável e hosting

- [x] 6.1 Separar renderização pública estática do acesso a browser e consultas remotas, adaptando provedores e consulta de manutenção; verificar renderização sem `window`, timeout de consulta e substituição por manutenção no cliente.
- [x] 6.2 Adicionar geração de HTML no build para `/`, `/servicos`, `/processo`, `/portfolio`, `/sobre` e `/contato`, mantendo interatividade no cliente; verificar conteúdo principal por rota sem executar scripts e ausência de dados privados no build.
- [x] 6.3 Gerar título, descrição, canonical e Open Graph por rota, sitemap e robots; verificar metadados distintos e exclusão de login/admin/avaliação das rotas indexáveis.
- [x] 6.4 Ajustar rewrites preservando `/api/*` e fallback das demais rotas; verificar acesso direto/reload de todas as URLs existentes no preview, sem interferir em API ou proteção administrativa.
- [x] 6.5 Documentar comandos de build/preview, estratégia de HTML estático, configuração de hosting e procedimento de manutenção integral; executar os comandos documentados e verificar testes de carregamento com e sem scripts.

## 7. Integração e versão candidata

- [x] 7.1 Executar build/lint e testes comportamentais adicionados; entregar relatório que distinga falhas introduzidas, falhas anteriores e integrações externas não verificadas.
- [ ] 7.2 Validar jornadas públicas nos temas claro/escuro a 320/375/768/1440 pixels, zoom de 200%, teclado e leitor de tela por amostragem; registrar contraste, foco, redução de movimento e correções em relatório de acessibilidade.
- [x] 7.3 Verificar acesso direto e navegação cliente, portfólio com falha/vazio, login, bloqueio de admin sem sessão, avaliação e manutenção com dados de teste; registrar ausência de regressões funcionais e exposição de dados privados.
- [x] 7.4 Repetir Lighthouse mobile nas seis rotas com as condições da baseline; registrar três execuções, mediana ≥90 ou exceção explícita antes de publicar, além das diferenças de desempenho observadas.
- [x] 7.5 Preparar build candidato, checklist de canais/evidências/decisões e procedimento de rollback ao build anterior; verificar que materiais estão revisáveis e que não restam decisões de marca implicitamente aprovadas.

## Workflow follow-up

- Publicar somente após solicitação específica, usando o build candidato validado.
- Após habilitar medição, acompanhar o período definido sem confundir cliques com solicitações confirmadas.
- Arquivar a mudança após conclusão e revisão, usando o workflow de archive.
