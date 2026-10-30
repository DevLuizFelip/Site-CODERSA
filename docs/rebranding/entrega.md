# Candidata de rebranding CODERSA
Direção B — C modular, foco em operações B2B amplas e canais confirmados pelo usuário. Implementação local; não publicada.

## Revisão
- Prancha de marca: [kit.html](kit.html); regras: [manual-marca.md](manual-marca.md).
- Site: executar comandos de [hosting.md](hosting.md), abrir http://127.0.0.1:4173.
- Copy e revisão: [revisao-candidata.md](revisao-candidata.md).
- Evidências e decisões: [evidencias.md](evidencias.md), [decisoes.md](decisoes.md).
- Contato/medição: [contato.md](contato.md); templates/pauta: [editorial.md](editorial.md).
- Verificações: [validacao.md](validacao.md), [acessibilidade.md](acessibilidade.md).

## Checklist da candidata
- Identidade B e foco comercial selecionados explicitamente; não há decisão visual pendente presumida.
- E-mail, WhatsApp, agenda e fundador confirmados; suporte por assunto.
- Demonstração rotulada; sem case, métrica, foto, PDF, depoimento ou SLA inventado.
- Build gera seis HTML e mantém área privada como SPA; sem dados de sessão no HTML.
- Eventos externos desativados; envio real, backend e hosting de produção não testados.
- Amostragem com leitor de tela ainda pendente; não tratar esta candidata como validação integral concluída.
- Publicação e arquivamento não executados.

## Rollback
Antes de qualquer publicação autorizada, preservar deployment anterior e seu identificador no provedor; exportar configuração de domínio/rewrites e variáveis pelo mecanismo seguro do hosting, sem registrá-las neste repositório. Promover a candidata somente após checklist e solicitação específica.
Se houver regressão, reativar o deployment anterior pelo provedor, restaurar rewrites/configuração correspondentes e invalidar cache se necessário. Verificar seis rotas, /login, bloqueio de /admin, contato e API. A mudança não contém migração de banco; não reverter dados de usuários.
Referência de código anterior: 3b23b9a32e3d4396912a1fb0c5524cb4ae451b78. Se não existir deployment preservado, gerar versão anterior em checkout/worktree separado com lockfile e ambiente daquela versão; não sobrescrever o trabalho atual. Rollback não foi executado porque não houve publicação.
