# Spec Delta

## Purpose

Permitir que uma solicitação comercial carregue o contexto do serviço e informações mínimas de qualificação até um destinatário confirmado, com proteção contra abuso e confirmação confiável.

## ADDED Requirements

### Requirement: Contexto de serviço validado
CTAs comerciais SHALL abrir `/contato` com serviço pré-selecionado e editável. Apenas identificadores conhecidos SHALL ser aceitos como contexto, sem dados pessoais na URL.

#### Scenario: CTA específico
- **WHEN** o visitante solicita Blueprint ou conversa sobre uma oferta do catálogo
- **THEN** encontra o serviço correspondente selecionado no formulário e pode alterá-lo antes de enviar

#### Scenario: URL com contexto desconhecido
- **WHEN** o contato é aberto diretamente ou com identificador desconhecido
- **THEN** oferece seleção neutra de serviço, sem preencher conteúdo arbitrário na interface ou eventos

### Requirement: Qualificação mínima acessível
O formulário SHALL solicitar nome, e-mail profissional válido, serviço, descrição e preferência de contato, permitir empresa opcional e informar finalidade e aviso de privacidade aplicável. Consentimentos adicionais SHALL ser separados quando necessários, sem coleta de anexos sensíveis.

#### Scenario: Preenchimento e correção
- **WHEN** existem campos obrigatórios ausentes ou inválidos
- **THEN** erros identificam os campos de forma acessível, o foco vai ao primeiro inválido e nenhuma requisição é enviada
- **THEN** empresa vazia é aceita e o visitante é orientado a não incluir senhas ou documentos sensíveis

### Requirement: Compatibilidade e confirmação de envio
A qualificação SHALL chegar ao destinatário no contrato JSON existente `nome`, `email`, `assunto`, `mensagem`, sem exigir novos campos de transporte. Sucesso SHALL depender de HTTP positivo e `success: true`, mantendo timeout de 15 segundos, prevenção de duplicidade e nova tentativa sem perda dos dados.

#### Scenario: Serviço confirma solicitação qualificada
- **WHEN** o servidor confirma positivamente a solicitação
- **THEN** assunto e mensagem entregam serviço, empresa quando fornecida, preferência e descrição em formato legível
- **THEN** a interface confirma uma vez e oferece canais voluntários, sem popup nem promessa não comprovada de resposta

#### Scenario: Recebimento não confirmado
- **WHEN** há falha HTTP, rede, JSON inválido, resposta negativa ou timeout
- **THEN** a interface informa falha acessível, preserva a qualificação e permite nova tentativa sem registrar conversão

### Requirement: Recebimento protegido
Endpoints de contato SHALL validar tipo, presença, formato e tamanho dos campos, rejeitar abuso com antispam e limitação de requisições e tratar conteúdo como texto ao gerar e-mails. Erros públicos e logs SHALL evitar credenciais e dados pessoais desnecessários.

#### Scenario: Entrada malformada ou excessiva
- **WHEN** o endpoint recebe JSON inválido, tipos inesperados, campos fora dos limites ou spam
- **THEN** rejeita antes de chamar o provedor de e-mail e retorna erro seguro
- **THEN** HTML informado pelo visitante é escapado e não altera a estrutura do e-mail

#### Scenario: Limite excedido
- **WHEN** uma origem ultrapassa a política de requisições configurada
- **THEN** recebe HTTP 429 sem disparo de e-mail, inclusive sob execução com múltiplas instâncias

### Requirement: Medição restrita ao contexto comercial
Eventos SHALL distinguir cliques Blueprint, contatos confirmados e falhas com rota, origem e identificador de serviço permitidos. Provedor externo SHALL permanecer desativado até configuração aprovada; URLs completas, nome, e-mail, empresa, preferências e texto livre SHALL ser excluídos dos eventos.

#### Scenario: Tentativa de incluir informação pessoal
- **WHEN** detalhes de evento contêm campos desconhecidos ou dados pessoais
- **THEN** apenas valores da lista permitida são emitidos localmente e falhas do adaptador não interrompem contato

### Requirement: Destino e operação verificados antes da publicação
A publicação da jornada SHALL depender de responsável e destinatário de leads confirmados e teste integrado em ambiente com destinatário de teste, registrando finalidade, retenção e acesso aos dados sem divulgar credenciais.

#### Scenario: Somente testes com rede simulada
- **WHEN** testes controlados passam mas o recebimento externo ainda não foi comprovado
- **THEN** a candidata registra a limitação e permanece sem liberação para publicação do formulário como fluxo validado
