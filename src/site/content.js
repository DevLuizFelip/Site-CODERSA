export const siteOrigin = 'https://www.codersa.com.br';
export const navigation = [
  { path: '/servicos', label: 'Soluções' },
  { path: '/servicos/blueprint', label: 'Blueprint' },
  { path: '/processo', label: 'Como funciona' },
  { path: '/portfolio', label: 'Resultados' },
  { path: '/sobre', label: 'Sobre' },
  { path: '/contato', label: 'Contato' },
];
export const metadata = {
  '/': { title: 'CODERSA | Software, automação e IA aplicada', description: 'Conecte sistemas, reduza tarefas manuais e acompanhe seus processos com software e IA aplicada ao trabalho real.' },
  '/servicos': { title: 'Soluções em software e automação | CODERSA', description: 'Software sob medida, automação e integrações e IA aplicada: conheça como a CODERSA pode trabalhar com seus processos.' },
  '/processo': { title: 'Diagnosticar, especificar, validar e evoluir | CODERSA', description: 'Conheça a jornada de engenharia da CODERSA. Diagnóstico, especificação e avaliação podem ser contratados sem desenvolvimento.' },
  '/servicos/blueprint': { title: 'CODERSA Blueprint | Especificação e arquitetura de software e IA', description: 'Transforme sua ideia em requisitos, arquitetura e plano técnico. Contrate CODERSA Blueprint independentemente do desenvolvimento, com escopo definido.' },
  '/portfolio': { title: 'Resultados e demonstração de fluxo | CODERSA', description: 'Explore uma demonstração identificada de operação conectada e os projetos disponibilizados no portfólio da CODERSA.' },
  '/sobre': { title: 'Sobre a CODERSA | Inteligência aplicada ao trabalho real', description: 'Conheça a proposta da CODERSA: desenvolver e operar software e IA para processos empresariais claros, conectados e eficientes.' },
  '/contato': { title: 'Mapear meu processo | Contato CODERSA', description: 'Descreva seu processo, os sistemas envolvidos e onde o trabalho precisa avançar. Inicie uma conversa com a CODERSA.' },
};
export const offers = [
  { id: 'software', title: 'Engenharia de software', summary: 'Arquitetura, documentação e sistemas para um escopo bem definido.', detail: 'Para software houses, SaaS e empresas com sistemas a construir ou modernizar. Começamos pelo contexto e pelas restrições do projeto.', examples: 'Revisão arquitetural, engenharia reversa, documentação técnica, desenvolvimento e sustentação.', delivery: 'Requisitos, decisões arquiteturais e plano de evolução; implementação quando contratada.', limits: 'Arquitetura e revisão podem ser contratadas separadamente. Desenvolvimento depende de diagnóstico e escopo acordado.' },
  { id: 'automacao', title: 'Automação e integrações', summary: 'Conecte ferramentas e organize documentos sem passagens manuais desnecessárias.', detail: 'Para equipes administrativas, contábeis e operações. Mapeamos entradas, regras, aprovações e exceções antes de integrar CRM, ERP e outros sistemas.', examples: 'IDP: organização, classificação, extração, validação e encaminhamento de notas, cadastros e contratos.', delivery: 'Fluxos de integração e processamento documental implantados por projeto, com revisão humana em decisões sensíveis.', limits: 'PDF, imagens e textos dependem da amostra e qualidade dos documentos; não há acurácia universal. Regras determinísticas são preferidas quando suficientes.' },
  { id: 'ia', title: 'Diagnóstico e engenharia de IA', summary: 'Descubra onde IA faz sentido antes de investir em uma solução.', detail: 'Para gestores e equipes de produto ou operação. Analisamos processos, maturidade de dados e integrações, priorizando impacto, esforço e risco.', examples: 'Diagnóstico de oportunidades, aplicações de IA e sistemas de conhecimento/RAG com permissões e citação de fontes quando pertinentes.', delivery: 'Relatório de prioridades, hipóteses de retorno e roteiro de implementação, com critérios de qualidade e controles humanos.', limits: 'Hipóteses de ROI não são garantias. Provedores, agentes e RAG só entram quando justificados e avaliados.' },
  { id: 'avaliacao', title: 'AI Evaluation & Testing', summary: 'Avalie qualidade, custo e robustez da IA com critérios verificáveis.', detail: 'Para equipes com soluções de IA em avaliação ou uso. Definimos método, amostra e critérios antes de comparar respostas.', examples: 'Grounding/RAG, alucinações, latência, custo, segurança, robustez e monitoramento.', delivery: 'Métricas, recomendações e plano de acompanhamento, com método e dataset identificados.', limits: 'Resultados dependem dos dados e das condições de teste. Governança técnica não substitui revisão jurídica ou certificação.' },
];
export const processSteps = [
  { title: 'Diagnosticar', text: 'Entender o problema, as pessoas, os dados e os sistemas envolvidos.', output: 'Prioridades, riscos e um recorte de oportunidade.' },
  { title: 'Especificar', text: 'Traduzir a necessidade em requisitos, arquitetura e um plano técnico.', output: 'Blueprint com premissas, exclusões e critérios de aceite.' },
  { title: 'Validar', text: 'Revisar decisões e avaliar a viabilidade com critérios e amostras adequados.', output: 'Decisões revisadas e incertezas explicitadas.' },
  { title: 'Implementar', text: 'Desenvolver e integrar a solução no escopo acordado após o diagnóstico.', output: 'Entregas verificáveis, documentação e tratamento de exceções.' },
  { title: 'Evoluir', text: 'Acompanhar uso e operação para definir os próximos ajustes.', output: 'Melhorias priorizadas a partir de evidências.' },
];
export const serviceOptions = [
  { id: 'blueprint', label: 'CODERSA Blueprint' },
  ...offers.map(({ id, title }) => ({ id, label: title })),
  { id: 'suporte', label: 'Suporte a projeto existente' },
  { id: 'outro', label: 'Outra necessidade' },
];
export const knownService = id => serviceOptions.some(service => service.id === id) ? id : '';
export const contactPath = id => knownService(id) ? `/contato?servico=${id}` : '/contato';
export const blueprintDeliverables = [
  'Resumo executivo, problema, stakeholders, usuários e jornadas.',
  'Requisitos funcionais e não funcionais, premissas e exclusões.',
  'MVP, backlog priorizado e critérios de aceite.',
  'Diagramas arquiteturais pertinentes, modelo de dados e pontos de integração.',
  'Estratégia de IA quando justificada: provedores, RAG/agentes, avaliação e controles humanos.',
  'Stack com alternativas e trade-offs; segurança, privacidade, observabilidade e operação.',
  'Roadmap, estimativas com incertezas, decisões arquiteturais (ADRs) e riscos.',
  'Documentação em PDF e fontes editáveis/versionáveis conforme contratação.',
];
export const blueprintVariants = [
  ['Blueprint Software', 'Produto ou sistema com requisitos e arquitetura definidos.'],
  ['Blueprint AI', 'Viabilidade de IA, dados, avaliação e revisão humana.'],
  ['Blueprint Automation', 'Fluxos, regras, exceções e integrações entre sistemas.'],
  ['Blueprint Modernization', 'Entendimento do legado e plano de evolução técnica.'],
];
export const blueprintPackages = [
  { name: 'Essential', scope: 'Clareza para decidir.', includes: 'Problema e jornadas prioritárias, requisitos de alto nível, arquitetura conceitual, riscos e roadmap inicial.', excludes: 'Especificação detalhada, modelo de dados completo, implementação e operação.' },
  { name: 'Professional', scope: 'Detalhe para planejar.', includes: 'Essential + requisitos detalhados, MVP/backlog e aceite, diagramas, dados e integrações, alternativas de stack, segurança/operação e ADRs do escopo.', excludes: 'Implementação, sustentação, integrações executadas e investigação fora do recorte contratado.' },
  { name: 'Enterprise', scope: 'Complexidade sob proposta.', includes: 'Especificação para múltiplos sistemas e equipes, integrações complexas e requisitos de operação e governança técnica definidos sob proposta.', excludes: 'Escopo ilimitado, certificação jurídica, implementação ou SLA não contratado.' },
];
export const blueprintFaqs = [
  { question: 'Preciso contratar o desenvolvimento com a CODERSA?', answer: 'Não. Blueprint é um serviço independente de especificação e arquitetura. Você pode contratar somente o projeto técnico e decidir a implementação depois.' },
  { question: 'Quanto tempo leva?', answer: 'O prazo depende da complexidade, acesso às informações e ciclos de revisão. As estimativas, premissas e incertezas são definidas na proposta.' },
  { question: 'Quais formatos e direitos de uso recebo?', answer: 'PDF, fontes editáveis/versionáveis, propriedade e direitos de uso são definidos no contrato. Os entregáveis e formatos variam conforme o escopo acordado.' },
  { question: 'O que preciso fornecer?', answer: 'Objetivos, processos atuais, restrições e contexto dos sistemas envolvidos. No primeiro contato, não envie senhas ou documentos sensíveis; alinhamos o acesso necessário depois.' },
];
export const faqs = [
  { question: 'Preciso trocar os sistemas que já uso?', answer: 'O diagnóstico começa pelos sistemas existentes. Integrar, adaptar ou substituir depende do processo e das possibilidades de cada ferramenta.' },
  { question: 'Todo projeto precisa de inteligência artificial?', answer: 'Não. Uma integração ou regra de automação pode resolver a necessidade. IA entra quando existe uma tarefa adequada e critérios claros para avaliar a resposta.' },
  { question: 'Como começa a conversa?', answer: 'Você descreve o processo, as ferramentas envolvidas e o que hoje consome tempo. A partir disso, alinhamos o próximo passo e um escopo possível.' },
  { question: 'Como são definidos prazo e investimento?', answer: 'Prazo e investimento dependem do escopo, das integrações e das condições de implementação. Esses pontos são alinhados antes de iniciar o projeto.' },
];
