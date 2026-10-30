# Acessibilidade — candidata local
Referência: 29/10/2026. Chrome 156, Playwright 1.64.1 e axe-core; evidências em relatorios/browser-check.json e capturas.

## Verificação executada
Seis rotas nos temas claro/escuro e larguras 320, 375, 768, 1440: ausência de rolagem horizontal, um h1/main, links com destino e auditoria WCAG 2 A/AA, 2.1 AA e 2.2 AA sem violações automáticas após correções.
Teclado: atalho de salto leva foco ao conteúdo; menu expande, fecha com Escape devolvendo foco e fecha após navegação; disclosure abre; tema persiste. Movimento reduzido elimina transições. Texto ampliado 200% em home/contato não causa overflow; árvore assistiva contém títulos, main, links e campos nomeados. Amostras AX salvas em relatorios/ax-home.json e ax-contato.json.
Contato: erros associados aos campos, foco no primeiro inválido e na confirmação; nenhum popup. Avaliação usa radios nomeados. Contrastes no manual-marca.md. Correções: iniciais com texto principal; quebra de palavras longas e flex/grid com largura mínima zero; hidratação escura estável.

## Limite e verificação pendente
Árvore de acessibilidade e axe não equivalem a uso de leitor de tela. Não foi realizado teste assistivo com Narrador/NVDA/JAWS; tarefa 7.2 permanece aberta somente por essa amostragem. Não declarar conformidade integral WCAG a partir dos testes automáticos.

## Roteiro de amostragem com leitor de tela
Com preview ativo, abrir / e /contato no Chrome, ativar Narrador (Windows+Ctrl+Enter) ou NVDA.
1. Percorrer landmarks e títulos; confirmar ordem e anúncio do fluxo ilustrativo sem repetição decorativa.
2. Abrir menu e FAQ por teclado; verificar estado expandido e retorno de foco com Escape.
3. Enviar formulário vazio; confirmar leitura do erro e nome do campo. Usar somente ambiente com rede interceptada para testar envio; não enviar teste ao contato real.
4. Confirmar anúncio de erro/recebimento, nova tentativa e WhatsApp voluntário.
Registrar leitor/versão, navegador, data, passos, resultado e correções. A marcação de 7.2 depende dessa evidência ou de decisão explícita sobre alteração do critério.
