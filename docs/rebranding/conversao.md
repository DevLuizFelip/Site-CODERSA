# Plano de medição da jornada comercial

Referência: 29/10/2026. Estado: definição proposta para implementação; não há resultados comerciais medidos nem meta de crescimento aprovada.

## Objetivo

Permitir que um visitante descreva um processo e receba confirmação real de que sua solicitação foi aceita pelo serviço de contato. Otimizar pela solicitação e sua qualidade, não apenas por cliques.

## Funil e definições

| Etapa | Definição | Evento / origem |
| --- | --- | --- |
| Sessão elegível | Sessão em uma das seis rotas institucionais, excluindo equipe/testes, bots reconhecidos e tráfego de preview; contar somente sessões que o mecanismo de consentimento permitir medir | Contagem agregada do provedor a configurar, sem identificadores de formulário |
| Interesse em mapear | Clique em “Mapear meu processo” | `process_mapping_click`, rota e posição do CTA |
| Solicitação aceita | HTTP positivo e corpo `success: true` na tentativa iniciada pelo usuário | `contact_submit_success`, uma emissão por tentativa bem-sucedida |
| Falha | Erro HTTP, resposta negativa, rede ou timeout | `contact_submit_error`, categoria técnica genérica; não enviar mensagem do visitante ou resposta bruta |
| Solicitação qualificada | Revisão manual confirma necessidade concreta, processo identificável e possibilidade de conversa comercial | Registro agregado pelo responsável comercial, separado da telemetria do site |

**Conversão principal:** sessões elegíveis com ao menos uma solicitação aceita ÷ total de sessões elegíveis. **Taxa CTA → envio:** sessões com clique e envio aceito ÷ sessões com clique. Não dividir contagem bruta de envios por cliques, pois uma sessão pode clicar/enviar várias vezes. **Qualificação:** solicitações qualificadas ÷ solicitações revisadas; manter volume e período junto da taxa.

## Janela e critério de sucesso

- Janela inicial proposta: 30 dias consecutivos após publicação e habilitação válida da coleta; data de início ainda não definida.
- Sucesso técnico de aceitação: todos os cenários controlados de validação, sucesso, erro, timeout e duplicidade passam; nenhum erro conta como conversão e nenhum dado pessoal aparece nos eventos.
- Sucesso comercial inicial proposto: obter solicitações qualificadas e uma linha de base íntegra para decidir a próxima melhoria. O volume mínimo e uma eventual meta percentual serão escolhidos pelo fundador após conhecer capacidade comercial e tráfego.
- Uma taxa sem volume suficiente ou sem denominador confiável é inconclusiva. Não comunicar aumento percentual, ROI ou sucesso do redesign a partir de dados de laboratório.

## Status das metas

| Elemento | Estado |
| --- | --- |
| Definições e janela de 30 dias | Propostas nesta entrega |
| Critério técnico | Contrato de implementação nas specs |
| Meta comercial numérica | Ainda não validada; não inventar |
| Linha de base de conversão | Não disponível no repositório |
| Resultados após redesign | Ainda não medidos |
| Provedor de analytics | Não selecionado; adaptador externo começa desativado |

## Dados e verificação

Eventos podem conter rota e posição do CTA. Excluir nome, e-mail, telefone, mensagem, assunto livre, conteúdo de URL com dados pessoais e payload do serviço. O coletor local de revisão verifica emissão e conteúdo antes de ligar qualquer provedor externo. A aplicação não precisa persistir dados comerciais para essa validação.

No relatório mensal, registrar período, sessões elegíveis, sessões com clique, sessões com envio, solicitações revisadas, qualificadas e falhas por categoria. Se o provedor não permitir relacionar etapas sem contrariar as regras escolhidas de privacidade, informar somente contagens agregadas e não fabricar taxas de sessão.
