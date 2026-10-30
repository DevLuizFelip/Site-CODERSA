# Design

## Context

Ver `proposal.md` para motivação e as quatro delta specs para contratos de comportamento. Inspeção local realizada em 29/10/2026; não constitui auditoria do domínio em produção nem validação de credenciais/serviços externos.

- React 19, React Router 7, Vite 7 e Tailwind 3; scripts existentes: `dev`, `build`, `lint`, `preview`. Não há suíte de testes configurada no `package.json`.
- `HomePage.jsx` renderiza apenas `HeroSection`. `Header.jsx` usa terminal e nome em serifa. `index.css` e Tailwind compartilham tokens globais; há cores fixas em páginas. `ThemeContext` aplica `dark` ao body e persiste a preferência.
- `ServicesSection.jsx` contém “Ver Detalhes” em uma div, claim de 40%, workshop sem ano e indicador “Time Online”. `ProcessPage.jsx` usa links de setor `href="#"`; o briefing descreve links `processo#`, sem ocorrência literal confirmada nesta revisão. `ContactPage.jsx` anuncia PDF com `href="#"`, cópia por e-mail e prazo sem evidência local.
- O formulário efetivamente montado está em `pages/ContactPage.jsx`; `components/ContactForm.jsx` e `PortfolioSection.jsx` estão vazios. O envio usa Render `/send-email`, com payload `nome`, `email`, `assunto`, `mensagem`. `backend/app.py` envia via MailerSend apenas ao destinatário configurado. `api/index.py` é alternativa SMTP `/api/send-email`, não usada pelo formulário atual.
- `PortfolioPage.jsx` lê `projects` com `show_in_portfolio=true` e imagens do Supabase. `Layout.jsx` aguarda consulta a `site_settings` antes de renderizar qualquer conteúdo. Login, avaliações e admin também usam Supabase.
- `index.html` tem título único e não contém conteúdo institucional no HTML inicial; `vercel.json` reescreve rotas para a SPA. Não há specs principais existentes. Arquivos `code-tela*.html` são referências, sem evidência de uso como páginas ativas.

## Goals / Non-Goals

**Goals:** separar decisões ainda propostas de decisões aprovadas; reaproveitar a aplicação e seus contratos; tornar conteúdo público gerável em HTML sem acesso privilegiado; permitir validação de marca e conversão antes da publicação.

**Non-Goals:** substituir React/Vite por outra plataforma, reestruturar autenticação, modificar schema Supabase, desenvolver produto SaaS, reativar o widget de chat ou automatizar publicação social. A aplicação de marca no painel é uma amostra de validação, sem redesign funcional do admin.

## Decisions

### 1. Entrega em fases com registros de decisão

Criar na implementação documentos versionados em `docs/rebranding/` para diagnóstico comercial, inventário de conteúdo, alternativas, decisões, evidências e relatórios. Apresentar 2–3 direções antes de consolidar ativos ou CSS de produção. Registrar escolha do fundador com data, escopo e fonte da confirmação. Até lá, propostas visuais permanecem materiais de revisão. Essa sequência deriva das pendências explícitas do briefing, sem bloquear o diagnóstico e a preparação de alternativas.

O descritor “Software, automação e IA aplicada”, a assinatura e o hero do briefing são candidatos iniciais de copy. O nicho técnico B2B é hipótese. A fase comercial seleciona público e ofertas, sem exigir mudanças na arquitetura proposta. Alternativa descartada: aplicar a paleta e substituir o terminal imediatamente, pois o briefing declara que não estão aprovados.

### 2. Tokens semânticos e ativos próprios

Manter Tailwind e variáveis CSS, consolidando fundo, superfície, texto, texto secundário, borda, ação, foco e sucesso para ambos os temas. Eliminar cores fixas conflitantes nas superfícies públicas. Usar sans legível para corpo/UI e serifa apenas como acento aprovado, com pesos e licenças registrados. A paleta candidata é grafite `#15181E`, branco quente `#F7F7F2`, secundário `#535C68` e azul `#3157FF`; contrastes são avaliados por par e estado antes da seleção.

Logo e diagramas devem ser vetoriais editáveis; entregar versões monocromáticas, ícone, favicon e regras de redução. Não há necessidade prevista de imagem generativa para construir o sistema de símbolos. A amostra de painel e templates sociais validam a marca fora da homepage. Alternativa descartada: estilos exclusivos por página, que tornam temas e manutenção inconsistentes.

### 3. Rotas existentes com conteúdo modular

Manter `/`, `/servicos`, `/processo`, `/portfolio`, `/sobre`, `/contato`, `/avaliar`, `/login` e `/admin/*`. Os rótulos novos apontam respectivamente para serviços, processo, portfólio, sobre e contato. Montar a homepage com seções independentes, dados editoriais revisáveis e um fluxo entrada → tratamento → acompanhamento → saída identificado como demonstração. Não criar páginas de produto sem oferta real.

FAQ, menu e controles usam elementos semânticos, foco visível e estados acessíveis; o menu móvel informa expansão e fecha por Escape e seleção. Respeitar `prefers-reduced-motion`; evitar animação decorativa contínua. Links só existem com destino; ofertas podem expandir detalhe acessível ou apontar para seção concreta. Alternativa descartada: trocar todas as URLs pelos rótulos novos, criando migração desnecessária.

### 4. Registro editorial separado de dados operacionais

Usar conteúdo estático versionado para narrativa, FAQ, ofertas, pessoas e demonstração. Manter o portfólio dinâmico existente sem copiar dados privados ao build. Um manifesto editorial registra fonte, autorização, contexto, responsável e revisão; métricas sem comprovação são removidas. Cases usam apenas dados já suportados pelo contrato existente e documentação complementar versionada; não pressupor novos campos no banco. Se não houver case autorizado, usar demonstração rotulada.

O fluxo editorial manual e os templates ficam em `docs/rebranding/` e diretório de ativos; nenhum post é enviado a redes por esta mudança. Alternativa descartada: novo CMS ou migração de banco para esta primeira entrega.

### 5. HTML público gerado no build e interatividade preservada

Adicionar entrada de renderização estática com APIs de servidor do React e roteador estático para as seis rotas institucionais. Gerar HTML por rota com título, descrição, canonical e Open Graph específicos; sitemap e robots referenciam apenas rotas indexáveis. Manter bundle cliente para interações. Ajustar rewrites para servir arquivos gerados antes do fallback SPA; `/api/*` conserva precedência. Não gerar páginas privadas nem pré-renderizar avaliações com dados pessoais.

Separar a apresentação estática do bloqueio inicial de `Layout.jsx`: a consulta de manutenção ocorre no cliente com estado de carregamento limitado e tratamento de erro, sem impedir toda a apresentação institucional por tempo indefinido. Com JavaScript, manutenção ativa mantém a substituição de conteúdo existente. O modo atual não oferece bloqueio de acesso no servidor; não tratar manutenção como proteção de informação sensível. Desativação integral também do HTML estático exige retirar a publicação no hosting, procedimento documentado.

Tornar uso de `window`, `localStorage` e provedores compatível com geração no servidor, iniciando com tema previsível e aplicando preferência sem quebra de renderização. O HTML inicial contém apenas conteúdo institucional estático, inclusive em portfólio e contato; projetos são carregados depois, com loading/erro/vazio explícitos. Alternativas consideradas: metadados só no cliente não resolvem a resposta sem scripts; migração completa para framework SSR adiciona complexidade desnecessária.

### 6. Contato conserva o serviço e melhora os estados

Extrair configuração do endpoint com valor atual como padrão; manter payload e interpretar HTTP e `success` do JSON. Adicionar timeout de 15 segundos, bloqueio durante envio e mensagens inline acessíveis, preservando valores em erros. Confirmar recebimento, sem alegar entrega ao cliente. Trocar abertura automática de WhatsApp por link voluntário. Validar canal comercial, suporte e agenda antes de publicar; manter canal real se ainda não existir endereço corporativo. Provisionamento de caixas e alteração de DNS não estão presumidos.

Testar sucesso, falha, timeout e duplicidade com respostas controladas, sem envio de e-mail real. Integração em staging usa destinatário de teste e credenciais apropriadas quando disponíveis. Não trocar Render por Vercel nem alterar MailerSend nesta mudança. Alternativa descartada: migrar para a API de mesmo domínio durante o redesign, que implicaria mudança de operação e credenciais.

### 7. Medição local com integração desacoplada

Definir eventos `process_mapping_click`, `contact_submit_success` e `contact_submit_error`, com rota e origem do CTA, sem campos do formulário. Disponibilizar adaptador neutro com provedor desativado por padrão; em revisão, validar eventos em coletor local. Documentar funil, denominador de sessões elegíveis, período inicial proposto de 30 dias e linha de base; meta comercial numérica só após diagnóstico. Um provedor externo e regras de consentimento são configurados antes de habilitar coleta externa, sem pressupor serviço pago.

### 8. Critérios técnicos propostos

Adotar WCAG 2.2 AA como alvo de aceitação, verificando teclado, leitor de tela por amostragem, contraste dos dois temas, movimento reduzido e telas de 320/375/768/1440 pixels. Medir Lighthouse mobile com versão fixada, três execuções por rota, mediana Performance ≥90 nas seis rotas institucionais. Estes são critérios propostos por esta mudança, não números aprovados ou medidos no briefing. Exceções exigem registro antes de publicação. Medir build atual antes das alterações para comparação; não prometer Core Web Vitals de campo sem tráfego real.

## Risks / Trade-offs

- [Escolha visual ou comercial ainda pendente] → Preparar alternativas e diagnóstico primeiro; não consolidar a identidade até registro da seleção.
- [Tokens globais afetam login/admin] → Revisão visual das rotas protegidas e de autenticação em ambos os temas, mantendo funções existentes.
- [Conteúdo estático e preferências do cliente divergem] → Gerar apenas conteúdo público determinístico, testar HTML inicial e navegação após carregar scripts.
- [Manutenção não bloqueia HTML no servidor] → Preservar comportamento cliente e documentar retirada no hosting para indisponibilidade integral.
- [Render, Supabase ou credenciais indisponíveis] → Estados de erro e testes controlados; registrar integração não verificada sem declarar entrega externa validada.
- [Ausência de evidências ou canal corporativo] → Demonstração identificada e canais reais, sem inventar provas, caixas postais ou SLAs.
- [Lighthouse varia por ambiente] → Fixar condições e registrar três execuções e eventual exceção, sem confundir score de laboratório com dados de campo.

## Migration Plan

1. Registrar baseline local, decisões comerciais e identidade selecionada; entregar protótipos e kit de marca para revisão antes de aplicar o visual final.
2. Implementar por rotas/componentes mantendo contratos e dados existentes; gerar artefatos editoriais e HTML público no build.
3. Validar preview em ambos os temas, rotas diretas, formulário controlado, manutenção, admin, busca e desempenho. Guardar relatórios e limitações reais.
4. Preparar versão candidata e checklist com canais, evidências e aprovações. Publicação depende de solicitação específica; preparar tudo antes dessa etapa.
5. Reverter para o commit/build anterior e configuração anterior de rewrites se houver regressão. Não há migração de dados a desfazer. Acompanhar conversão no período definido após habilitar medição.
