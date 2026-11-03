# Arquitetura de informação — Fase 2

## Rotas e jornada

| URL | Função | Continuidade |
| --- | --- | --- |
| `/` | Posicionamento, destaque Blueprint, ofertas, processo e contato | Hero, marca e composição preservados |
| `/servicos` | Catálogo por problema, público, entrega e limite | Sem duplicar em `/solucoes`; anchors `#software`, `#automacao`, `#ia` preservados |
| `/servicos/blueprint` | Especificação e arquitetura independente | Única página nova; HTML inicial e sitemap |
| `/processo` | Diagnosticar → Especificar → Validar → Implementar → Evoluir | URL preservada |
| `/portfolio`, `/sobre` | Evidências/demonstração e empresa | Consultas e rotulagem preservadas |
| `/contato` | Qualificação única e canais existentes | Acesso sem contexto continua válido |
| `/avaliar`, `/login`, `/admin/*` | Avaliações e administração | SPA/noindex; proteção existente preservada |

Home e navegação levam à página Blueprint. “Solicitar um Blueprint” leva a `/contato?servico=blueprint`. Catálogo leva ao contato com identificador conhecido, editável pelo visitante. Serviços: `blueprint`, `software`, `automacao`, `ia`, `avaliacao`, `suporte`, `outro`. Parâmetros desconhecidos não geram conteúdo livre nem eventos. Contato direto exige escolha de serviço.

Diagnóstico/engenharia de IA, automação/IDP, engenharia de software e avaliação ficam em seções do catálogo. Nenhuma rota exclusiva por subserviço. Não há mudança de URL que exija redirect 301 nesta entrega.

Blueprint compartilha o formulário de `/contato`: CTA final e FAQ orientam o próximo passo. Isso evita dois formulários com estados divergentes. Canonical de contato não inclui query. Dados pessoais nunca entram no endereço.

## Verificação

Cobrir acesso direto/reload e navegação cliente, menu móvel, anchors, HTML sem scripts e prioridades de rewrites: API, HTML público, SPA privada e fallback. Metadados devem enumerar sete páginas institucionais únicas.
