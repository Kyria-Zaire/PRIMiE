import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { advice } from "@/content/advice";
import { AdviceCard } from "./advice-card";

describe("AdviceCard", () => {
  const source = readFileSync(join(process.cwd(), "components/advice/advice-card.tsx"), "utf8");
  const item = advice[0]!;

  it("reste un Server Component sans interaction", () => {
    expect(source).not.toMatch(/["']use client["']/);
    expect(source).not.toMatch(/\b(useState|useEffect|useRef)\b/);
    expect(source).not.toMatch(/<a\b|<button\b|href=/);
  });

  it("rend numéro, catégorie, titre, résumé et image WebP avec alt canonique", () => {
    const html = renderToStaticMarkup(<AdviceCard item={item} />);

    expect(html).toContain(`>${item.number}<`);
    expect(html).toContain(item.category);
    expect(html).toContain(`>${item.title}<`);
    expect(html).toContain(item.summary);
    expect(html).toContain("preparation-cheveux.webp");
    expect(html).toContain(`alt="${item.image.alt}"`);
    expect(html).toContain("<article");
    expect(html).toContain("<h3");
    expect(html).not.toMatch(/<a\b/);
    expect(html).not.toMatch(/<button\b/);
    expect(html).not.toContain("Lire l’article");
    expect(html).not.toContain("Lire l'article");
    expect(html).not.toMatch(/\.png"/);
  });

  it("conserve la composition horizontale mobile et verticale desktop", () => {
    expect(source).toMatch(/flex-row/);
    expect(source).toMatch(/lg:flex-col/);
    expect(source).toMatch(/w-\[38%\]/);
    expect(source).toMatch(/min-h-\[11rem\]/);
    expect(source).toMatch(/pl-6/);
    expect(source).toMatch(/py-4/);
    expect(source).toMatch(/aria-hidden="true"/);
    expect(source).not.toMatch(/line-clamp/);
    expect(source).not.toMatch(/cursor-pointer/);
  });

  it("cadre la carte Perruques sur l’illustration éditoriale soin-perruque", () => {
    expect(source).toContain('"soin-perruque": "18% 30%"');
    expect(source).not.toMatch(/gamme de produits/i);
    expect(source).not.toMatch(/produits? PRiMiE/i);
  });

  it("couvre les trois cartes canoniques sans lien", () => {
    for (const entry of advice) {
      const html = renderToStaticMarkup(<AdviceCard item={entry} />);
      expect(html).toContain(`>${entry.number}<`);
      expect(html).toContain(entry.image.src.replace(/^\//, "").split("/").at(-1)!);
      expect(html).not.toMatch(/href=/);
    }
  });
});
