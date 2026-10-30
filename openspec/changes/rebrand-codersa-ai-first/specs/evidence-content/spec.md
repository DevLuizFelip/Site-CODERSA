# Spec Delta

## Purpose

Garantir que a comunicação institucional e editorial distinga entregas comprovadas de exemplos e mantenha informações verificáveis e atuais.

## ADDED Requirements

### Requirement: Afirmações sustentadas por evidências
A publicação SHALL exigir origem, contexto, data de verificação e autorização aplicável para métricas, depoimentos, pessoas e cases. Afirmações sem sustentação SHALL ser removidas ou reescritas sem prometer resultado.

#### Scenario: Métrica sem comprovação
- **WHEN** não existe evidência para “Redução de 40% em APIs”, precisão absoluta ou autonomia total
- **THEN** a afirmação não é publicada como fato

### Requirement: Distinção entre case e demonstração
Um case SHALL identificar problema, solução, escopo e resultado sustentado por evidência autorizada; um exemplo simulado SHALL ser rotulado como demonstração e não atribuir resultados ou depoimentos a clientes reais.

#### Scenario: Ausência de case autorizado
- **WHEN** não há case disponível para a seção de resultados
- **THEN** a seção mostra uma demonstração de fluxo claramente identificada, com entrada, etapas e saída, sem métricas fictícias de sucesso

#### Scenario: Falha na consulta de portfólio
- **WHEN** o carregamento de projetos falha ou retorna vazio
- **THEN** a página informa indisponibilidade ou ausência de projetos, oferece contato e não inventa conteúdo para preencher o espaço

### Requirement: Atualidade e disponibilidade
Conteúdo de eventos, canais e recursos SHALL ser revisado antes da publicação e removido quando expirado ou indisponível. Indicadores de presença online SHALL depender de informação real.

#### Scenario: Workshop antigo e presença não monitorada
- **WHEN** um workshop não possui data futura confirmada ou não existe monitoramento de disponibilidade da equipe
- **THEN** a página não o anuncia como próximo evento e não afirma “Time Online” ou “Especialistas Ativos”

### Requirement: Processo editorial reutilizável
A entrega editorial SHALL incluir templates de post e carrossel e um fluxo manual com pauta, objetivo, fonte, revisão, aprovação e registro de resultado, usando a identidade selecionada.

#### Scenario: Preparação de publicação educativa
- **WHEN** uma pauta sobre um processo real é preparada
- **THEN** o material identifica sua fonte, diferencia demonstração de case e passa por revisão antes de ficar pronto para publicação
- **THEN** a entrega não depende de automação ou integração com redes sociais
