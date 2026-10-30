# Diagnóstico do rebranding CODERSA

Data de referência: 29/10/2026, America/Sao_Paulo. Mudança: `rebrand-codersa-ai-first`.
Base inspecionada: commit `3b23b9a32e3d4396912a1fb0c5524cb4ae451b78`.

## Escopo e método

Inspeção do repositório local e do briefing consolidado. As referências abaixo são verificáveis no código; não certificam o estado do domínio publicado, a entrega de e-mail, a disponibilidade dos canais ou a autorização de clientes. Não foram enviados formulários nem feitas alterações em sistemas externos. A medição do build local tem relatório próprio em `baseline.md`.

## Inventário de rotas

| Rota | Implementação | Situação observada / ação no redesign |
| --- | --- | --- |
| `/` | `src/pages/HomePage.jsx`, `src/components/HeroSection.jsx` | Apenas hero; ampliar com situações, fluxo, ofertas, processo, evidência, FAQ e contato. |
| `/servicos` | `src/pages/ServicesPage.jsx`, `src/components/ServicesSection.jsx` | Quatro ofertas apresentadas; validar prioridade, concretizar detalhes e revisar sidebar. |
| `/processo` | `src/pages/ProcessPage.jsx` | Três fases; links de setores vazios e promessas fortes sobre modelos proprietários e precisão. |
| `/portfolio` | `src/pages/PortfolioPage.jsx`, `src/components/PortfolioCard.jsx` | Projetos Supabase filtrados por `show_in_portfolio`; falha acaba no mesmo estado vazio. Cards têm título, descrição, tecnologias e imagem; não há narrativa completa de case. |
| `/sobre` | `src/pages/AboutPage.jsx` | Narrativa de engenharia/autonomia; revisar afirmações e validar história/pessoas antes de republicar. |
| `/contato` | `src/pages/ContactPage.jsx` | Formulário integrado ao Render; corrigir validação, confirmação, timeout e canais. |
| `/avaliar` | `src/pages/LeaveReviewPage.jsx` | Insere depoimento com `is_approved: false`; preservar fluxo, revisar teclado e semântica dos controles de estrelas. |
| `/login` | `src/pages/LoginPage.jsx` | Autenticação Supabase e MFA; manter compatibilidade visual e funcional. |
| `/admin`, `/admin/contatos`, `/admin/projetos`, `/admin/avaliacoes`, `/admin/seguranca` | `src/App.jsx`, `src/auth/ProtectedRoute.jsx`, `src/dashboard/` | Proteção por sessão e operação existente; fora do redesign funcional. |

`src/App.jsx` é a fonte das rotas. `src/dashboard/pages/LeadsPage.jsx` existe mas não está montada nesse roteamento. Os arquivos `code-tela*.html` são referências, não as páginas ativas do React.

## Achados confirmados

| ID | Evidência no repositório | Consequência e tratamento |
| --- | --- | --- |
| D01 | `ContactPage.jsx`, duas instâncias de `SidebarLink href="#"`, “PDF, 4.2 MB”; nenhum PDF em `public/` ou `src/assets/` | Download anunciado sem recurso. Omitir até existir arquivo real. |
| D02 | `ServicesSection.jsx`, “Ver Detalhes” dentro de `div` | Texto parece ação, mas não é operável. Transformar em link/detalhe real ou retirar. |
| D03 | `ProcessPage.jsx`, `SidebarItem` com `href="#"` | Setores voltam à própria página. O briefing menciona `processo#`; o problema equivalente foi confirmado, não a string literal. |
| D04 | `ServicesSection.jsx`, “Redução de 40% em APIs” | Nenhum relatório de medição/autorização fornecido. Retirar como fato até haver evidência. |
| D05 | `ProcessPage.jsx`, “precisão milimétrica” e modelos neurais proprietários; `AboutPage.jsx`, sistemas autônomos | Claims comerciais sem comprovação no material fornecido. Reescrever com escopo e limites concretos. |
| D06 | `ServicesSection.jsx`, “Próximo Workshop”, “24 de Setembro, 19:00” | Ano e evento futuro não confirmados. Não reapresentar como próximo evento. |
| D07 | `ContactPage.jsx`, “Respostas em até 24h” e “Cópia enviada ao seu e-mail” | Prazo sem evidência. `backend/app.py` envia ao destinatário configurado e usa o e-mail do cliente em reply-to, não em cópia. |
| D08 | `ContactPage.jsx`, `window.open` após resposta positiva | Abre WhatsApp automaticamente. Oferecer ação voluntária após confirmação. |
| D09 | `ContactPage.jsx`, inputs/textarea sem `required`, sucesso baseado só em `response.ok` | Campos vazios chegam ao servidor; timeout não é definido. Backend exige quatro campos. |
| D10 | `ServicesSection.jsx`/`ContactPage.jsx`, “Time Online”/“Especialistas Ativos” com verde fixo | Presença não vem de serviço de disponibilidade. Remover sinalização não comprovada. |
| D11 | `Footer.jsx`, links sociais só com ícones; `Header.jsx`, menu sem `aria-expanded` | Nomes acessíveis e estados precisam de revisão. Contraste quantitativo será medido; textos finos/pequenos são observação, não laudo completo. |
| D12 | `index.html`, um título e `#root` vazio | HTML inicial não contém apresentação por rota, descrição, canonical ou Open Graph. |
| D13 | `Layout.jsx`, `if (loading) return null` até consulta `site_settings` | Conteúdo depende da consulta remota; falta limite explícito de espera. |
| D14 | `main.jsx` e `App.jsx` montam `AuthProvider`; `AuthContext.jsx` só renderiza filhos após sessão inicial | Dupla inicialização; geração de HTML precisará separar conteúdo público e estado de autenticação sem remover proteção privada. |
| D15 | `tailwind.config.js` define `background-light` e `text-main`; páginas usam `bg-background` e `text-text` | Há classes sem token correspondente. Consolidar nomes durante aplicação da identidade escolhida. |

## Ativos e identidade

- Marca no header: `BsTerminal` de `react-icons` e texto Codersa, sem carregar as imagens de logo existentes.
- Ativos disponíveis: `src/assets/CodersaLogo4.svg`, variantes PNG 4/6/7, `public/CodersaLogo8.png`, `public/dersa. - Editado.png`, `public/favicon.png`, `public/images/gradiente.jpg`. Nomes não demonstram qual versão está aprovada.
- Fontes solicitadas por `index.html`: Montserrat, Playfair Display, Manrope e Mrs Saint Delafield. CSS global usa Montserrat e Playfair; a assinatura no processo usa Mrs Saint Delafield. Licenças/documentação de distribuição não constam no kit atual.
- Paleta efetiva em `src/index.css`: preto/branco e cinzas; modo escuro inverte tokens. A paleta grafite/branco quente/azul pertence ao briefing e continua candidata.
- `src/components/ContactForm.jsx` e `PortfolioSection.jsx` têm zero bytes; não tratá-los como funcionalidades existentes.

## Integrações e contratos

| Integração | Contrato observado | Limite da verificação |
| --- | --- | --- |
| Contato Render | POST `/send-email` com `nome`, `email`, `assunto`, `mensagem`; resposta `{ success, message }` | Código inspecionado, sem envio real. Não assumir funcionamento das credenciais. |
| MailerSend | `backend/app.py`: remetente/chave por ambiente, destinatário configurável, reply-to do cliente | Não é CRM nem confirmação enviada ao cliente. |
| API alternativa Vercel | `api/index.py`, POST `/api/send-email`, SMTP | Não é chamada pelo formulário ativo; não migrar implicitamente. |
| Supabase | Sessão/MFA; `projects`, `project-images`, `site_settings`, `testimonials`, `contacts` | Schemas e políticas não foram auditados. Não exportar dados privados para o build. |
| Agenda / WhatsApp / e-mail | Links em `ContactPage.jsx` e footer | Endereços encontrados não equivalem a canais atualmente confirmados. Ver manifesto. |
| Widget de chat | Referências comentadas em `index.html` | Desativado; não reativar como parte do redesign. |
| Hosting | `vercel.json`: `/api/*` antes de fallback para `index.html` | Rotas de HTML estático exigirão adaptação e teste futuro. |

## Ordem recomendada

1. Comparar as direções visuais e validar a prioridade comercial com materiais concretos.
2. Aplicar identidade escolhida, conteúdo revisado e correções de interação.
3. Validar contato com respostas controladas, HTML indexável, compatibilidade de rotas e temas.
4. Revisar acessibilidade, desempenho e canais antes de preparar publicação.

O diagnóstico não aprova a identidade nem comprova cases. Essas decisões ficam registradas em `decisoes.md` e `evidencias.md`.
