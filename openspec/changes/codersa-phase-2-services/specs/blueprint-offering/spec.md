# Spec Delta

## Purpose

Apresentar CODERSA Blueprint como serviço de especificação e arquitetura que pode ser contratado de forma independente, com escopo e condições claros antes do contato.

## ADDED Requirements

### Requirement: Oferta independente e prioritária
O site SHALL apresentar CODERSA Blueprint em destaque na Home e navegação, com página `/servicos/blueprint`, CTA “Solicitar um Blueprint” e declaração explícita de independência da implementação.

#### Scenario: Interesse em especificação sem desenvolvimento
- **WHEN** um fundador, gestor, PME ou software house consulta a página Blueprint
- **THEN** entende problema atendido, público, benefício, etapas descoberta → análise → especificação → revisão/entrega e possibilidade de contratar somente o projeto técnico
- **THEN** encontra o CTA que abre `/contato` com Blueprint selecionado

### Requirement: Entregáveis configuráveis com limites
A página SHALL explicar entregáveis por escopo: problema e jornadas, requisitos, MVP/backlog e aceite, arquitetura, dados e integrações, estratégia de IA quando pertinente, stack e alternativas, segurança e operação, roadmap com incertezas, ADRs e documentação contratada.

#### Scenario: Avaliação do material a receber
- **WHEN** o visitante consulta entregáveis e exemplos
- **THEN** distingue itens configuráveis do que está incluído em cada pacote e identifica exemplos como demonstrativos
- **THEN** entende que PDF e fontes editáveis/versionáveis dependem da contratação e que decisões técnicas são validadas, sem promessa de template genérico como solução pronta

### Requirement: Modalidades e pacotes sem preço fixo
A oferta SHALL apresentar as variações Software, AI, Automation e Modernization e os níveis Essential, Professional e Enterprise, explicitando inclusões, exclusões e condições de escopo sem preços públicos definitivos.

#### Scenario: Comparação de pacotes
- **WHEN** o visitante compara os níveis
- **THEN** identifica Essential como alto nível, Professional como especificação detalhada e Enterprise como complexidade e integrações sob proposta
- **THEN** não interpreta os pacotes como garantia de implementação ou prazo independente da complexidade

### Requirement: Esclarecimento antes da qualificação
A oferta SHALL responder em FAQ sobre prazo condicionado à complexidade, propriedade e formatos contratados, independência do desenvolvimento e informações que o cliente precisa fornecer, oferecendo acesso ao formulário de qualificação.

#### Scenario: Preparação para solicitar proposta
- **WHEN** o visitante percorre o FAQ e o CTA final
- **THEN** entende o que deve fornecer e chega ao formulário existente com o contexto Blueprint preservado, sem precisar enviar documentos sensíveis ou assumir compromisso de desenvolvimento
