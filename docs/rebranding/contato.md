# Contato e medição
Canais confirmados pelo usuário nesta conversa: codersa.ai@outlook.com, WhatsApp +55 11 93619-3760, cal.com/codersa/23min. Vendas e suporte usam os mesmos contatos; assunto diferencia finalidade. Fundador confirmado: Luiz Felipe C. Santana. Não houve envio externo nem agendamento.

## Contrato e estados
`ContactPage.jsx` usa `src/site/contact-service.js`. POST JSON para https://codersa-backend.onrender.com/send-email (substituível por VITE_CONTACT_ENDPOINT no build), mantendo nome, email, assunto e mensagem. Campos obrigatórios, e-mail validado e espaços externos removidos. HTTP positivo e corpo JSON com success exatamente true confirmam recebimento. Nenhum outro retorno é conversão.
Timeout de 15 segundos aborta requisição; HTTP, rede, JSON inválido e resposta negativa mostram erro acessível, preservam campos e permitem nova tentativa. Trava síncrona impede duplo envio. Desmontagem aborta. Sucesso recebe foco e oferece WhatsApp voluntário; não abre popup nem promete cópia de e-mail ou prazo.

## Eventos
`src/site/analytics.js`: process_mapping_click, contact_submit_success, contact_submit_error. Apenas rota/origem/categoria permitidas; nunca nome, e-mail, mensagem ou assunto. CustomEvent local codersa:analytics; provedor externo desativado. Para integrar, importar configureAnalytics e passar função do provedor após decisão sobre configuração e privacidade. Falha do adaptador não interrompe formulário. Medição comercial proposta em conversao.md; clique não é envio confirmado.

## Evidência de teste
`npm test` verifica contrato e falhas; `tests/browser-check.mjs` intercepta a rede e testa validação, duplicidade, foco, sucesso, falhas e nova tentativa. Nenhuma mensagem real enviada. Não há staging/destinatário de teste configurado nesta execução; entrega externa, credenciais de backend e recebimento não foram validados.
