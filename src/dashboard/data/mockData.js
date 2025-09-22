// src/dashboard/data/mockData.js
// GARANTA QUE O SEU ARQUIVO TENHA APENAS ESTE CONTEÚDO:

// 1. Apenas UMA declaração para mockContacts, com 'export'
export const mockContacts = [
  { id: 1, name: 'Ana Silva', email: 'ana.silva@example.com', phone: '5511987654321', subject: 'Dúvida sobre Desenvolvimento Web', date: '2025-09-19', status: 'Novo', message: 'Olá, gostaria de saber mais sobre os custos para desenvolver um site institucional para minha empresa. Quais são os próximos passos? Obrigado!' },
  { id: 2, name: 'Bruno Costa', email: 'bruno.costa@example.com', phone: '5521912345678', subject: 'Parceria', date: '2025-09-18', status: 'Lido', message: 'Prezados, represento uma agência de design e acredito que podemos formar uma ótima parceria. Vocês estariam disponíveis para uma conversa?' },
  { id: 3, name: 'Carla Dias', email: 'carla.dias@example.com', phone: '', subject: 'Relatório de Bug', date: '2025-09-17', status: 'Arquivado', message: 'Encontrei um pequeno problema no formulário de contato do site de um de seus clientes. O botão de envio não funciona no navegador Safari.' },
];

// 2. Apenas UMA declaração para mockLeads, com 'export'
export const mockLeads = [
  { id: 101, clientName: 'Empresa X', email: 'contato@empresax.com', phone: '5531988887777', projectType: 'Aplicativo Mobile', date: '2025-09-19', status: 'Novo Lead', details: 'Precisamos de um aplicativo para iOS e Android para nosso serviço de logística. O orçamento estimado é de R$ 50.000. Gostaríamos de agendar uma reunião para discutir o escopo.' },
  { id: 102, clientName: 'Startup Y', email: 'ceo@startupy.com', phone: '5541911112222', projectType: 'Sistema Personalizado', date: '2025-09-18', status: 'Contactado', details: 'Buscamos uma solução de software para gerenciar nossos processos internos de RH.' },
];

// 3. Apenas UMA declaração para mockProjects, com 'export'
export const mockProjects = [
  { id: 201, title: 'Aplicativo Mobile para Empresa X', client: 'Empresa X', deadline: '2025-11-30', status: 'Em Desenvolvimento', team: ['Ana', 'Bruno'], budget: 50000, description: 'Desenvolvimento completo de um app de logística para iOS e Android.' },
  { id: 202, title: 'Sistema de RH para Startup Y', client: 'Startup Y', deadline: '2025-10-15', status: 'Planejamento', team: ['Carla'], budget: 35000, description: 'Sistema para gestão de ponto, férias e avaliações de desempenho.' },
  { id: 203, title: 'E-commerce para Loja Z', client: 'Loja Z', deadline: '2025-09-30', status: 'Testes', team: ['Ana', 'Daniel'], budget: 40000, description: 'Migração de plataforma e implementação de novo gateway de pagamento.' },
  { id: 204, title: 'Website Institucional para Advocacia', client: 'Advocacia ABC', deadline: '2025-08-20', status: 'Concluído', team: ['Bruno'], budget: 15000, description: 'Criação de um site responsivo com blog integrado.' },
];