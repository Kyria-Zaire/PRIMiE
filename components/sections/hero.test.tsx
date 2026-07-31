import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { Hero } from "./hero";

describe("Hero", () => {
  it("rend la section #accueil avec le contenu canonique et les CTA", () => {
    const html = renderToStaticMarkup(<Hero />);

    expect(html).toContain('id="accueil"');
    expect(html).toContain("bg-hero");
    expect(html).toContain(">PRiMiE<");
    expect(html).toContain("Chez");
    expect(html).toContain("Coiffure et beauté afro à domicile");
    expect(html).toContain("Réserver sur WhatsApp");
    expect(html).toContain('href="https://wa.me/33749616582"');
    expect(html).not.toContain("?text=");
    expect(html).toContain("Découvrir nos services");
    expect(html).toContain('href="#services"');
    expect(html).not.toContain("Site en préparation.");
    expect(html).not.toContain("#galerie");
    expect(html).not.toContain("<img");
    expect(html).not.toContain("PRIMiE");
    expect(html).not.toContain("Primie");
    expect(html).not.toContain("uppercase");
    expect(html.match(/<h1\b/g)).toHaveLength(1);
  });

  it("expose les décorations en aria-hidden et reste un Server Component", () => {
    const html = renderToStaticMarkup(<Hero />);
    const source = readFileSync(join(process.cwd(), "components/sections/hero.tsx"), "utf8");

    expect(html).toContain('aria-hidden="true"');
    expect(source).not.toMatch(/["']use client["']/);
    expect(source).not.toMatch(/\buppercase\b/);
    expect(source).not.toMatch(/\b(useState|useEffect|window|document)\b/);
  });
});
