# Spec Delta

## Purpose

Permitir que interessados solicitem o mapeamento de seus processos com encaminhamento comercial claro e confirmação confiável da solicitação.

## ADDED Requirements

### Requirement: Jornada de mapeamento do processo
O CTA “Mapear meu processo” SHALL abrir a jornada de contato, solicitando nome, e-mail, assunto e descrição da necessidade, com rótulos acessíveis e validação dos campos obrigatórios.

#### Scenario: Solicitação incompleta
- **WHEN** o visitante envia dados incompletos ou e-mail inválido
- **THEN** recebe indicação acessível dos campos a corrigir e nenhuma solicitação é enviada

### Requirement: Envio com confirmação verdadeira
O formulário SHALL impedir envio simultâneo duplicado e apresentar sucesso somente após resposta positiva do serviço; erros e timeout SHALL manter os dados preenchidos e permitir nova tentativa.

#### Scenario: Serviço confirma recebimento
- **WHEN** o serviço responde com HTTP de sucesso e confirmação positiva no corpo
- **THEN** a interface confirma o recebimento uma vez, sem prometer cópia por e-mail ou prazo de resposta não comprovado

#### Scenario: Falha no envio
- **WHEN** ocorre erro HTTP, resposta negativa, falha de rede ou timeout
- **THEN** o formulário informa a falha, preserva os dados, reabilita o envio e não apresenta confirmação de sucesso

### Requirement: Canais confirmados e ações voluntárias
O site SHALL distinguir vendas de suporte, exibir apenas canais confirmados e oferecer WhatsApp ou agendamento como ações voluntárias, sem abrir outra aplicação automaticamente após o envio.

#### Scenario: Canal corporativo ainda não provisionado
- **WHEN** não há endereço corporativo ou suporte dedicado confirmado
- **THEN** o site mantém apenas o canal real validado, identifica sua finalidade e não inventa caixas de e-mail nem promete suporte dedicado

#### Scenario: Contato enviado com sucesso
- **WHEN** o visitante recebe a confirmação
- **THEN** pode escolher abrir WhatsApp ou voltar ao site, sem popup ou redirecionamento automático

### Requirement: Medição de conversão sem dados pessoais
A jornada SHALL permitir medir cliques no CTA e envios confirmados, com definição documentada de denominador, período e critério de sucesso. Eventos de medição SHALL excluir nome, e-mail, mensagem e outros dados pessoais.

#### Scenario: Registro da conversão
- **WHEN** o serviço confirma uma solicitação iniciada pela jornada
- **THEN** é emitido um único evento de envio confirmado por tentativa bem-sucedida e nenhum evento de conversão por falha
- **THEN** o relatório distingue cliques de solicitações confirmadas e não promete aumento percentual sem linha de base
