# Spec Delta

## Purpose

Permitir que visitantes identifiquem serviços concretos da CODERSA, seus limites e o próximo passo comercial, preservando a experiência e os endereços existentes.

## ADDED Requirements

### Requirement: Serviços compreensíveis por problema
O catálogo SHALL explicar problema, público, entregáveis, processo e limitações de diagnóstico/engenharia de IA, automação/IDP, engenharia de software e avaliação de IA, com Blueprint em destaque.

#### Scenario: Consulta de soluções
- **WHEN** o visitante abre `/servicos`
- **THEN** encontra as ofertas organizadas em seções com CTA contextualizado, sem precisar navegar por uma rota para cada serviço pequeno
- **THEN** IDP informa formatos e implantação por projeto com revisão humana para usos sensíveis; avaliação informa método, amostra, métricas e dependência das condições de teste
- **THEN** diagnóstico apresenta prioridades por impacto, esforço e risco, e automação admite regras determinísticas quando suficientes

### Requirement: Jornada comercial na Home
A Home SHALL comunicar engenharia de software e IA, destacar CODERSA Blueprint e apresentar a jornada Diagnosticar → Especificar → Validar → Implementar → Evoluir, preservando a identidade visual da Fase 1.

#### Scenario: Escolha de uma etapa independente
- **WHEN** o visitante consulta como a CODERSA trabalha
- **THEN** entende que pode contratar diagnóstico, especificação ou avaliação sem adquirir desenvolvimento
- **THEN** encontra “Solicitar um Blueprint” com acesso à oferta e à qualificação de contato, sem promessa de implementação integral antes do diagnóstico

### Requirement: Continuidade de rotas e descoberta
O catálogo SHALL preservar `/servicos`, seus destinos existentes e as demais rotas públicas, oferecendo HTML inicial e metadados específicos para a nova página Blueprint e conteúdo semântico acessível nos dois temas.

#### Scenario: Entrada direta e indexação
- **WHEN** uma pessoa ou crawler solicita `/servicos/blueprint` sem executar scripts
- **THEN** recebe conteúdo principal, título, descrição, canonical e compartilhamento da oferta, incluída no sitemap
- **THEN** `/servicos` continua funcionando sem duplicação em `/solucoes`, e APIs e rotas privadas mantêm seus destinos e proteção

### Requirement: Precisão das ofertas
O conteúdo comercial SHALL distinguir exemplos demonstrativos de evidências reais e hipóteses de resultados medidos, sem publicar preços definitivos, clientes, integrações ativas, ROI ou garantias de acurácia não comprovados.

#### Scenario: Leitura de exemplos e estimativas
- **WHEN** o visitante consulta uma demonstração ou estimativa de entrega
- **THEN** o exemplo é rotulado como demonstrativo e prazo, investimento e resultados são condicionados ao escopo e às incertezas aplicáveis
