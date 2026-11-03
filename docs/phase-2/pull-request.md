# feat: destacar CODERSA Blueprint e qualificar contatos por serviço

O catálogo institucional apresentava ofertas genéricas e o formulário não identificava o serviço procurado. A mudança destaca CODERSA Blueprint como especificação/arquitetura independente do desenvolvimento, detalha as demais ofertas e conecta o CTA ao contato com serviço selecionado e editável. Preserva marca, temas, `/servicos`, anchors, rotas privadas e o contrato de quatro campos do envio.

A nova `/servicos/blueprint` entrega HTML inicial, metadados e sitemap. O contato inclui empresa opcional e preferência de canal, com telefone exigido só para WhatsApp. Render e API alternativa Vercel recebem validação compartilhada, escape de HTML, erros seguros e bloqueio de origem sem gateway. O template nginx e o teste com duas instâncias verificam quota agregada e recuperação sem envio real.

Validação: build aprovado; 18 testes Node, sete grupos de API Python, integração de gateway e 112 verificações browser aprovados. Lint dos arquivos alterados aprovado; lint global mantém os cinco erros da base. Lighthouse e variação observada em serviços estão no [relatório](reports/performance-summary.md). Revisão de acessibilidade automática não substitui o teste assistivo pendente.

Capturas: [Home antes](reports/baseline/screenshots/home-light-1440.png), [Home depois](reports/final/screenshots/home-light-1440.png), [Blueprint desktop](reports/final/screenshots/servicos-blueprint-light-1440.png), [Blueprint mobile escuro](reports/final/screenshots/servicos-blueprint-dark-390.png), [contato mobile](reports/final/screenshots/contato-light-390.png).

Publicação permanece bloqueada pelas verificações de gateway real, destinatário/responsável, recebimento externo, RLS, dependências vulneráveis e demais itens do [checklist](03-release-checklist.md). A remoção de `.env` do índice preserva o arquivo local e não remove histórico. Não há migração de banco. Implantação e rollback devem manter backend e gateway compatíveis e protegidos; [operação](contact-operation.md).

Material preparado localmente para revisão. Nenhum PR remoto, push ou deploy foi publicado.
