# Proposal

## Why

A CODERSA precisa comunicar engenharia de software, automação e IA aplicada com clareza comercial e evidências. O briefing consolidado de 19/10/2026 propõe essa evolução, enquanto o repositório apresenta uma homepage limitada ao hero, ações sem destino e afirmações sem comprovação disponível.

## What Changes

- Executar em fases o diagnóstico comercial, 2–3 direções visuais, seleção documentada de identidade, protótipos desktop/mobile e redesign do site público.
- Tratar paleta, tipografia, símbolo, posicionamento e nicho do briefing como propostas; registrar aprovação do fundador antes de consolidar a identidade ou o conteúdo comercial final.
- Criar um sistema de marca com versões claro/escuro, monocromática, arquivos vetoriais e aplicações em homepage, painel de referência, avatar, post e carrossel.
- Apresentar problemas reconhecíveis, fluxos demonstrativos, ofertas validadas, processo, pessoas, FAQ e contato; manter CODERSA como marca principal, sem inventar produtos disponíveis.
- Corrigir ações vazias, claims sem evidência e conteúdo desatualizado; distinguir cases autorizados de demonstrações.
- Tornar o contato comercial acessível, verificável e distinto do suporte; preservar o contrato atual de envio até uma decisão explícita de infraestrutura.
- Preservar URLs públicas, autenticação, administração, manutenção e integrações existentes; acrescentar metadados por rota, conteúdo indexável, acessibilidade, testes mobile e medição de conversão.
- Preparar templates e um processo editorial manual. Automação editorial, novos SaaS, expansão de submarcas, migração de backend e redesign funcional do admin ficam fora desta mudança.

## Capabilities

### New Capabilities

- `brand-system`: identidade versionada, seleção documentada, aplicações e regras de arquitetura de marca.
- `public-website`: experiência institucional responsiva, navegação, conteúdo comercial, acessibilidade e descoberta por busca.
- `evidence-content`: publicação de cases, demonstrações, afirmações e conteúdo editorial com origem e autorização.
- `commercial-contact`: jornada de mapeamento de processo, canais comerciais/suporte e confirmação confiável do envio.

### Modified Capabilities

Nenhuma. O inventário `openspec list --specs` não contém especificações existentes; as capacidades acima formalizam comportamentos novos e existentes a revisar.

## Impact

Principais áreas: `src/pages/`, `src/components/`, `src/index.css`, `tailwind.config.js`, `src/context/ThemeContext.jsx`, `index.html`, `public/` e configuração de build/hosting quando necessária à pré-renderização. `ContactPage.jsx` usa o serviço Render `/send-email`; `api/index.py` contém uma alternativa SMTP na Vercel, que não deve ser ativada implicitamente. Portfólio e manutenção dependem do Supabase. Tokens globais podem afetar login/admin e exigem regressão visual. Não se prevê alteração de schema Supabase ou API pública; novas dependências só se justificadas pela estratégia de geração de HTML. Aprovações de marca, ofertas, canais e evidências são dependências explícitas das fases seguintes.
