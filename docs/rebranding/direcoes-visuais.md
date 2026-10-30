# Direções visuais para seleção

Status: três propostas concretas entregues; seleção visual ainda pendente. O posicionamento comercial escolhido é operações B2B amplas com software sob medida, automação/integrações e IA aplicada.

## Abrir a comparação

Abra `preview/index.html` no navegador. A comparação funciona como arquivo local, sem instalação ou backend. Os botões A/B/C trocam a homepage e o painel de marca; Desktop/Mobile mudam a largura do quadro; “Abrir página” permite avaliar a direção em tela inteira. Os quadros têm rolagem própria para explorar todas as seções e aplicações.

Para servir por HTTP durante a revisão, a partir da raiz do projeto: `python -m http.server 4174 --bind 127.0.0.1 --directory docs/rebranding/preview`, depois abra `http://127.0.0.1:4174/`. Interrompa o servidor com Ctrl+C ao terminar. Esses arquivos estão fora do app e não entram no build público do Vite.

## Comparação

| Direção | Símbolo e composição | Paleta candidata | Tipografia / voz | Trade-off |
| --- | --- | --- | --- | --- |
| A — Terminal editorial | Evolução do terminal com desenho original; título editorial em serifa e diagrama de linhas finas | Grafite `#15181E`, branco quente `#F7F7F2`, cinza `#535C68`, azul `#3157FF` pontual | Serifa dominante em títulos, sans na operação; precisa, próxima e sóbria | Preserva reconhecimento, mas terminal é um símbolo frequente em tecnologia |
| B — C modular (recomendada) | C angular construído com módulos; grade assimétrica e bloco de fluxo azul | Mesma paleta do briefing, azul mais presente, campo claro derivado `#DFE5FF` | Sans em títulos/corpo, serifa apenas em acentos; clara, prática e confiante | Símbolo próprio e versátil; exige transição do terminal |
| C — Fluxo contínuo | C aberto de linhas conectadas; abertura escura e caminhos contínuos | Grafite e branco quente; azul claro derivado `#8CA1FF` sobre escuro | Sans com acentos editoriais; técnica e próxima | Comunica integração; linhas precisam de atenção na redução |

O azul claro de C é uma adaptação candidata para contraste em fundo escuro. Todas as opções permanecem propostas, inclusive cores derivadas, logo e tipografia. Nenhuma herda a paleta de CODERSA Contracts. Nenhuma usa verde decorativo, imagens de robôs ou métricas inventadas.

## Entregas por direção

- Homepage responsiva completa com apresentação, problema, soluções expansíveis, demonstração, processo, FAQ e convite de contato.
- Menu móvel operável, Escape para fechar, links internos funcionais e detalhes nativos de ofertas/FAQ.
- Símbolo vetorial original, assinatura, avatar e amostras pequenas; o kit final com exportações/licenças é a tarefa 2.3.
- Carrossel educativo de três slides, sem case ou depoimento fictício.
- Capturas desktop/mobile e painel de marca em `preview/capturas/`.

Fontes nesta comparação: Arial/Helvetica e Georgia/Times, obtidas do sistema; não há arquivos de fonte distribuídos. A seleção aprova uma abordagem tipográfica; a consolidação seguinte fornecerá famílias adequadas, licenças e ajustes finais. Não alegar que o kit licenciado já está entregue.

## Verificação realizada

Chrome 156.0.8078.49, Playwright 1.64.1. Foram verificados 25 conjuntos de condições: homepage e aplicações das três direções em 320, 375, 768 e 1440 px, mais troca de direções e viewport no comparador. Resultado final: sem overflow horizontal, links internos inválidos ou erros de execução; três slides presentes em cada painel; abertura de ofertas e menu/Escape funcionando.

Uma quebra no painel de marca a 320 px foi encontrada e corrigida antes da entrega. O movimento reduzido foi ativado no teste. Capturas desktop/mobile e de marca foram produzidas; homepage A/B/C, mobile B e marca B foram inspecionadas visualmente. O teste não é uma auditoria WCAG completa nem valida envio de contato: esta prévia não envia mensagens.

Procedimento e resultados: `relatorios/verificar-direcoes.mjs` e `relatorios/direcoes-qa.json`. As próximas fases ainda incluem versão final claro/escuro, contraste completo, licenças, seis páginas e integração real controlada.

## Escolha necessária

Selecionar A, B ou C, ou indicar ajustes concretos. A recomendação é **B — C modular**, porque combina assinatura própria, boa leitura como ícone e linguagem coerente com operação e software. Registrar a escolha em `decisoes.md` antes de consolidar o kit ou aplicar o visual à aplicação principal.
