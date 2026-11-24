# Tailwind Responsive Redesign Implementation Plan

**Goal:** Redesenhar o portfólio estático como um caderno digital responsivo usando Tailwind Play CDN.

**Architecture:** Manter as três rotas HTML e o redirecionamento existentes. Centralizar apenas fontes e efeitos visuais próprios em `css/main.css`; layout e responsividade ficam nas classes Tailwind de cada página.

**Tech Stack:** HTML5, CSS3, Tailwind CSS 4 Play CDN, GitHub Pages.

## Constraints

- Preservar fatos, contatos, rotas e ativos reais.
- Destacar Guillotine, Oficina de TI e Pauta Pública sem buscar dados em tempo de execução.
- Não adicionar framework, npm, formulário ou JavaScript próprio.
- Garantir navegação por teclado, foco visível, alvos de toque e ausência de dependência de hover.

## Tasks

1. Criar teste estrutural para integração Tailwind, conteúdo, acessibilidade e ativos locais.
2. Implementar o sistema visual compartilhado e migrar a página inicial.
3. Migrar Sobre e Contato e remover CSS legado por página.
4. Validar estrutura, renderização e viewports responsivos.
