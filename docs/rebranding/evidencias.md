# Manifesto de evidências e canais

Revisão local: 29/10/2026, America/Sao_Paulo. Responsável pela confirmação comercial/editorial: fundador CODERSA. “Encontrado no código” não significa evidência, autorização ou disponibilidade operacional confirmada.

| Item | Fonte / contexto | Autorização e verificação disponível | Tratamento / fallback |
| --- | --- | --- | --- |
| Redução de 40% em APIs | `src/components/ServicesSection.jsx:93` | Sem método, período, cliente ou autorização fornecidos | Retirar; usar demonstração qualitativa de fluxo |
| Precisão milimétrica / modelos proprietários | `src/pages/ProcessPage.jsx` | Sem relatório ou descrição técnica de entrega fornecidos | Reescrever com etapas e limites concretos |
| Case completo | `PortfolioPage.jsx` consulta projetos públicos e `PortfolioCard.jsx` exibe resumo | Flag de publicação não demonstra autorização de métricas; nenhum dossiê local de case | Usar demonstração identificada até existir problema, solução, escopo e resultado autorizados |
| Depoimentos | `LeaveReviewPage.jsx` salva `is_approved: false`; admin gerencia avaliações | Não foram consultados dados privados nem presumida autorização | Não criar depoimento; só publicar conteúdo comprovadamente aprovado |
| Fundador Luiz Felipe C. Santana | Assinatura em `ProcessPage.jsx` | Nome/papel presentes no site; história, citação e imagem não confirmadas nesta execução | Validar texto e autorização antes de usar perfil definitivo; prévia não inventa foto ou biografia |
| LinkedIn pessoal | `Footer.jsx`: `https://www.linkedin.com/in/luizcostasantana/` | Destino encontrado; perfil e vínculo atual não auditados | Não rotular como página corporativa |
| GitHub pessoal | `Footer.jsx`: `https://github.com/DevLuizFelip` | Destino encontrado; vínculo atual não auditado | Identificar como perfil técnico se confirmado |
| E-mail anunciado | `Footer.jsx` e `ContactPage.jsx`: `codersa.ai@outlook.com` | Mailto existente; recebimento e titularidade não testados | Candidato ao fallback real; não criar endereço @codersa.com.br fictício |
| Telefone / WhatsApp | `ContactPage.jsx`: `+55 11 93619-3760` / `wa.me/5511936193760` | Link existente; não houve contato nem confirmação operacional | Exibir somente após confirmação, como ação voluntária |
| Agenda | `ContactPage.jsx`: `https://cal.com/codersa/23min` | URL encontrada; slots e disponibilidade não verificados | Omitir se indisponível; nenhum agendamento realizado |
| Canal dedicado de suporte | Cabeçalho “Canais de Suporte” em `ContactPage.jsx` | Não há canal separado demonstrado | Não inventar suporte dedicado ou SLA; solicitar finalidade de cada canal real |
| Prazo de 24h / presença online | Strings fixas em contato/serviços | Nenhum SLA ou monitoramento | Retirar promessa e indicador fixo |
| Cópia de e-mail ao visitante | `ContactPage.jsx`; contrato em `backend/app.py:71–80` | Código envia só ao destinatário configurado, com reply-to do cliente | Confirmar apenas recebimento da solicitação |
| PDF 4,2 MB | `ContactPage.jsx` com `href="#"` | Nenhum PDF localizado em ativos públicos | Omitir download até fornecer arquivo real e tamanho correto |
| Workshop 24 de setembro | `ServicesSection.jsx` | Ano, edição e próxima data não confirmados | Omitir como evento futuro |
| CODERSA Contracts | Briefing, seção 5 | Protótipo citado; oferta e identidade da marca-mãe não aprovadas | Não anunciar SaaS disponível; não herdar sua paleta |
| Logos e fotografias existentes | Inventário de `diagnostico.md` | Sem histórico de seleção/licenças entregue | Usar vetores originais nas direções propostas; aprovar kit final posteriormente |

## Regra para um case futuro

Registrar título, problema, público, escopo, solução, período, método de medição, resultado, limitações, fonte, responsável e autorização. Métricas devem explicitar referência e intervalo. Um resumo no portfólio não supre automaticamente esses campos.

## Fallback preparado para a revisão visual

Um fluxo demonstrativo de pedido/orçamento usa apenas nomes de etapas e estados genéricos, sem empresa, pessoa, porcentagem ou desempenho inventados. O rótulo “Demonstração ilustrativa” acompanha o fluxo. O contato da prévia conduz a uma explicação local e não envia mensagens.

## Estado de disponibilidade

O inventário registra a disponibilidade **local** de ativos e endereços. Disponibilidade dos canais externos permanece **não verificada**, de forma explícita. A falta de confirmação não autoriza substituí-los por caixas postais, clientes ou depoimentos inventados.

## Confirmação recebida para a candidata
Em 29/10/2026, o usuário confirmou nesta conversa o e-mail codersa.ai@outlook.com, WhatsApp +55 11 93619-3760, agenda cal.com/codersa/23min e Luiz Felipe C. Santana como fundador. Suporte usa os mesmos contatos, identificado por assunto. Esta confirmação substitui os estados pendentes desses itens na tabela histórica. Não equivale a teste de recebimento, disponibilidade de horários ou autorização de cases. Os canais e o nome estão aplicados; não foram inventados foto, biografia ou citação. Identidade B confirmada e kit original consolidado com fontes OFL; ver manual-marca.md.
