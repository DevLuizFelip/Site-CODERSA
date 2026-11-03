# Contato: configuração e operação

## Contrato e qualificação

`ContactPage.jsx` usa o serviço ativo `src/site/contact-service.js`. CTAs levam a `/contato?servico=<id conhecido>`, com seleção editável. Sem query ou ID desconhecido, exige seleção neutra. Campos: nome (180), e-mail (254), empresa opcional (180), serviço, assunto (120), descrição (5000), preferência e-mail/WhatsApp e telefone (8–32) exigido só para WhatsApp. Não há anexos.

O transporte mantém somente `nome`, `email`, `assunto` e `mensagem`. Assunto recebe rótulo do serviço e texto do visitante (máximo final 180). Mensagem contém serviço, empresa quando presente, preferência, telefone apenas quando necessário e descrição (máximo final 6000). Telefone aceita formatação, mas exige 10–15 dígitos para incluir DDD; espaços ou pontuação isolados não bastam. Sem truncamento silencioso. Campos extras e tipos inválidos são rejeitados no servidor. E-mail pessoal válido não é rejeitado por domínio.

HTTP 2xx com JSON `success: true` confirma recebimento; HTTP/JSON/negativo/rede/timeout não confirmam. Timeout do cliente 15s, bloqueio síncrono contra duplo envio, campos preservados e foco no erro/sucesso. WhatsApp voluntário, sem janela automática ou promessa de SLA. Timeout pode ocorrer depois de uma entrega do provedor: retry é uma nova tentativa e não há garantia de deduplicação de entrega entre tentativas.

## Servidores e gateway

Padrão do frontend continua `https://codersa-backend.onrender.com/send-email`; configure `VITE_CONTACT_ENDPOINT` para o gateway validado antes de publicar. Render usa `backend/app.py`/MailerSend; a alternativa Vercel usa `api/index.py`/SMTP. Ambos usam `backend/contact_security.py`, limitam corpo a 40000 bytes e só aceitam os quatro campos. HTML é escapado, headers são validados e exceções do provedor não chegam ao visitante/log. Destinatário exige `DESTINATION_EMAIL` explícito; não há default de caixa presumida.

Os endpoints recusam acesso sem segredo de gateway (403) ou configuração ausente (503), antes de qualquer envio. `CONTACT_GATEWAY_SECRET` fica apenas no backend e proxy confiável, nunca no frontend. O proxy sobrescreve o header do visitante. Em produção, gerar segredo forte pelo mecanismo do provedor, configurar em todos os workers e proteger também rede/origem. Não publicar o backend antes de preparar o caminho protegido; isso interromperia envios existentes por falha fechada.

`contact-gateway.conf.template` é uma política nginx revisável para **um gateway lógico com memória compartilhada entre seus workers**, balanceando duas instâncias da aplicação. Limite leaky bucket médio de 5/minuto por IP com burst inicial total de cinco, HTTP 429 e recuperação de uma posição em aproximadamente 12s. Isso não equivale a janela deslizante estrita de cinco em quaisquer 60 segundos. Não dividir o tráfego entre gateways independentes sem estado sincronizado. Windows foi usado só para teste; a candidata de infraestrutura real precisa validar ambiente de produção.

Parâmetros do template: `CONTACT_BACKEND_1/2` (host:porta), `CONTACT_GATEWAY_PORT`, `CONTACT_PUBLIC_PATH` (`/send-email` para Render ou `/api/send-email` para Vercel), `CONTACT_GATEWAY_SECRET`, `CONTACT_ORIGIN_HOST`, `CONTACT_UPSTREAM_SCHEME` (`https` no upstream externo) e `CONTACT_CA_BUNDLE` (bundle CA confiável). O listener é loopback e exige ingresso TLS confiável. Publicação depende de configuração equivalente no hosting real, sem expor essa porta diretamente. Se houver proxy anterior, configurar identidade do cliente somente a partir de proxies confiáveis; não confiar em X-Forwarded-For arbitrário. O exemplo não habilita real_ip indiscriminado.

Renderizar fora do repositório com substituição **apenas dos nomes CONTACT_* acima**; não substituir `$remote_addr`, `$http_origin` ou outras variáveis nginx. Validar com `nginx -t` e testar gateway antes da promoção. Certificado upstream deve ser validado; não desligar `proxy_ssl_verify`. O proxy não reenvia POST automaticamente para outra instância, para evitar duplicar e-mail depois de timeout.

Camadas básicas de antispam: isca no formulário, rejeição de contrato malformado, limites de corpo/tamanho/tipo e quota por origem no gateway. A isca é auxiliar e pode ser ignorada por bots; não é captcha nem promessa de impedir todo spam. Avaliar controles adicionais somente diante de abuso observado.

CORS padrão: dois domínios de produção; origens locais/staging precisam ser adicionadas explicitamente em `CONTACT_ALLOWED_ORIGINS` no backend e no mapa do gateway. CORS não é autorização. A resposta 429 inclui CORS e Retry-After para permitir erro legível no navegador.

## Dados e medição

Uso informado no formulário: responder à solicitação pelo canal escolhido, sem inscrição em marketing. Não há persistência nova de leads, anexos ou banco nesta mudança. A mensagem é processada pelo provedor de e-mail e caixa destino; confirmar responsável, acesso, prazo de retenção/exclusão e aviso aplicável antes de lançamento. Não presumir que apagar dados locais remove mensagens do provedor ou da caixa.

Eventos locais: `process_mapping_click`, `blueprint_cta_click`, `contact_submit_success`, `contact_submit_error`. Somente nome do evento, rota permitida, origem, serviço permitido e categoria de falha; sem texto livre, empresa, telefone ou URLs completas. Adaptador externo desligado; cliques não são recebimentos nem contratos.

## Reprodução dos testes

Frontend: `npm ci`, `npm run build`, `npm test`. Backend: ambiente virtual com `backend/requirements.txt`, depois `python -m unittest discover -s tests -p test_contact_api.py -v`. Rede externa de e-mail substituída nos testes.

Gateway: instalar nginx separadamente para QA e fornecer caminho absoluto em `CONTACT_NGINX_BIN`; executar `python -m unittest discover -s tests -p test_contact_gateway.py -v`. O teste instancia dois apps locais, gera segredo efêmero, usa provedor falso, valida sintaxe nginx, limite agregado, bloqueio direto, header forjado e recuperação; fecha os processos/listeners no final. Não precisa de credencial real.

Browser: `npm run preview -- --host 127.0.0.1 --port 4173`, seguido por `node tests/browser-check.mjs`. Usa ferramentas isoladas já existentes em `.codex-qa.local` (Playwright/axe e Chrome local); veja os imports no script antes de reproduzir em outra máquina. Testes interceptam contatos e Supabase, não comprovam política RLS nem recebimento externo.

Fontes técnicas: [limitação nginx](https://nginx.org/en/docs/http/ngx_http_limit_req_module.html), [limites do nginx Windows](https://nginx.org/en/docs/windows.html). Nenhum recurso de produção foi criado ou alterado.
