# Design System

## Direction

Portfólio tecnológico escuro e imersivo. O GIF animado ocupa o fundo inteiro sob um gradiente azul-marinho; conteúdo, navegação e cartões usam glassmorphism para manter profundidade sem esconder a imagem.

## Tokens

- Fundo: `#050814` com gradiente `rgba(5, 8, 20, 0.55–0.78)`.
- Texto: branco; texto secundário entre 65% e 75% de opacidade.
- Superfícies: branco entre 5% e 10% de opacidade, borda branca entre 8% e 16%.
- Blur: 10–16 px; sombras pretas amplas e discretas.
- Display: Sora; texto: Plus Jakarta Sans.
- Cantos: 10 px para ações e 16 px para painéis.

## Responsive Composition

- 320–639 px: uma coluna, menu de vidro e fundo com `background-attachment: scroll`.
- 640–1023 px: interesses e projetos em duas colunas; tecnologias em três ou quatro.
- 1024 px ou mais: apresentação lado a lado, projetos em três colunas e fundo fixo.

## Components

- Cabeçalho fixo translúcido com blur.
- Painel de vidro com borda integral, fundo translúcido e sombra suave.
- Avatar circular com aro translúcido e sombra.
- Ação translúcida que ganha elevação e opacidade no hover/foco.

## Interaction

Hover apenas reforça ações já visíveis. Foco usa contorno azul-claro. Movimento é curto e removido por `prefers-reduced-motion`.
