# Spec Delta

## Purpose

Permitir que visitantes compreendam as soluções da CODERSA e encontrem informação confiável em qualquer dispositivo e por mecanismos de busca.

## ADDED Requirements

### Requirement: Apresentação comercial completa
O site SHALL apresentar problema/proposta, situações reconhecíveis, fluxo demonstrativo, ofertas validadas, evidências ou demonstração identificada, processo, pessoas verificadas, FAQ e contato em português comercial.

#### Scenario: Primeira visita
- **WHEN** uma pessoa abre a homepage
- **THEN** compreende a atuação em software, automação e IA aplicada e encontra o CTA “Mapear meu processo”
- **THEN** conteúdo e ofertas refletem a seleção comercial registrada, sem impor o nicho técnico B2B como decisão já tomada

### Requirement: Navegação e destinos válidos
O site SHALL oferecer Soluções, Como funciona, Resultados, Sobre e Contato com destinos reais e preservar acesso direto às URLs públicas existentes.

#### Scenario: Compatibilidade de rotas
- **WHEN** o visitante abre `/servicos`, `/processo`, `/portfolio`, `/sobre`, `/contato` ou `/avaliar` diretamente ou recarrega a página
- **THEN** a rota funciona e os links de navegação conduzem ao conteúdo correspondente

#### Scenario: Ação sem recurso disponível
- **WHEN** não existe PDF, detalhe de oferta ou demonstração acessível
- **THEN** o site omite a ação correspondente e não oferece links vazios ou botões sem resposta

### Requirement: Experiência acessível e responsiva
A experiência pública SHALL atender WCAG 2.2 AA, oferecer foco visível, navegação por teclado, nomes acessíveis, hierarquia semântica e respeito à redução de movimento nos temas claro e escuro.

#### Scenario: Navegação com teclado e movimento reduzido
- **WHEN** uma pessoa percorre o menu, FAQ e formulário por teclado com redução de movimento ativada
- **THEN** todos os controles são operáveis, o foco permanece visível e animações não essenciais são suprimidas
- **THEN** contraste de texto comum é pelo menos 4,5:1 e de texto grande e controles é pelo menos 3:1

#### Scenario: Tela estreita e ampliação
- **WHEN** o site é usado a 320, 375, 768 ou 1440 pixels e com ampliação de texto de 200%
- **THEN** conteúdo e ações permanecem legíveis, sem sobreposição ou rolagem horizontal da página

### Requirement: Descoberta por busca e compartilhamento
Cada página institucional SHALL fornecer HTML inicial com título, descrição, canonical, dados de compartilhamento e conteúdo principal específico da rota, sem depender de uma consulta remota para exibir sua apresentação estática.

#### Scenario: Leitura sem executar scripts
- **WHEN** um cliente solicita diretamente uma página institucional sem executar JavaScript
- **THEN** recebe sua apresentação principal e metadados específicos, com canonical no domínio público validado

### Requirement: Desempenho verificável
O redesign SHALL registrar medições reproduzíveis de desempenho mobile antes e depois e alcançar Lighthouse Performance de pelo menos 90 na mediana de três execuções equivalentes nas páginas institucionais.

#### Scenario: Revisão antes de publicar
- **WHEN** a versão candidata é validada em ambiente de preview
- **THEN** o relatório registra ferramenta, versão, páginas, condições, três resultados e comparação com a linha de base
- **THEN** falhas de orçamento são corrigidas ou recebem exceção explícita registrada antes da publicação

### Requirement: Preservação de funções existentes
O redesign SHALL preservar proteção administrativa, login, avaliações, leitura de portfólio e modo de manutenção.

#### Scenario: Acesso administrativo e manutenção
- **WHEN** uma pessoa sem autenticação tenta abrir `/admin` ou a manutenção é ativada
- **THEN** a proteção administrativa e a tela de manutenção mantêm o comportamento previsto, sem expor conteúdo privado em HTML gerado
