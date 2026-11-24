import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const pages = {
  home: "pages/home/index.html",
  sobre: "pages/sobre/index.html",
  contato: "pages/contato/index.html",
};

const read = (path) => readFileSync(path, "utf8");

test("as páginas entregam Tailwind, navegação responsiva e um destino de salto", () => {
  for (const [name, path] of Object.entries(pages)) {
    const html = read(path);

    assert.match(html, /@tailwindcss\/browser@4/, `${name}: Tailwind Play CDN ausente`);
    assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1\.0">/);
    assert.match(html, /href="#conteudo"/);
    assert.match(html, /<main id="conteudo"/);
    assert.match(html, /<details[^>]*class="[^"]*md:hidden/);
    assert.match(html, /class="[^"]*(?:sm:|md:|lg:)[^"]*"/);
    assert.match(html, new RegExp(`aria-current="page"[^>]*>${name === "home" ? "Início" : name === "sobre" ? "Sobre mim" : "Contato"}<`));
  }
});

test("a página inicial destaca somente os três projetos aprovados", () => {
  const html = read(pages.home);

  assert.match(html, /guilherme-o-lindo\/guillotine-ai/);
  assert.match(html, /guilherme-o-lindo\/Jogo-Educativo/);
  assert.match(html, /guilherme-o-lindo\/Pauta-Publica/);
  assert.doesNotMatch(html, /guilherme-o-lindo\/Atividades-PHP/);

  const projectCards = [...html.matchAll(/<a\s+[^>]*class="[^"]*project-card[^"]*"[^>]*href="([^"]+)"[^>]*>/g)];
  assert.equal(projectCards.length, 3, "cada projeto deve ser um único link-card");
});

test("imagens locais existem e possuem texto alternativo", () => {
  for (const path of Object.values(pages)) {
    const html = read(path);
    const images = [...html.matchAll(/<img\s+[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/g)];

    assert.ok(images.length > 0, `${path}: nenhuma imagem encontrada`);
    for (const [, source, alt] of images) {
      assert.ok(alt.trim().length > 0, `${path}: imagem sem texto alternativo: ${source}`);
      assert.ok(existsSync(resolve(dirname(path), source)), `${path}: ativo inexistente: ${source}`);
    }
  }
});

test("links que abrem nova aba isolam a página de origem", () => {
  for (const path of Object.values(pages)) {
    const html = read(path);
    const links = [...html.matchAll(/<a\s+[^>]*target="_blank"[^>]*>/g)];

    for (const [link] of links) {
      assert.match(link, /rel="noopener noreferrer"/, `${path}: link externo sem isolamento`);
    }
  }
});

test("o CSS compartilhado preserva o fundo animado, glassmorphism e movimento reduzido", () => {
  const css = read("css/main.css");

  assert.match(css, /BackgroundGif\.gif/);
  assert.match(css, /backdrop-filter:\s*blur\(/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(css, /\.paper-grid/);
  assert.ok(existsSync("css/pages/home.css"));
  assert.ok(existsSync("css/pages/sobre.css"));
  assert.ok(existsSync("css/pages/contato.css"));
});
