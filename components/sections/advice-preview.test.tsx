import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { advice, adviceCopy, adviceDecorativePortrait } from "@/content/advice";
import { AdvicePreview } from "./advice-preview";

describe("AdvicePreview", () => {
  const source = readFileSync(
    join(process.cwd(), "components/sections/advice-preview.tsx"),
    "utf8",
  );

  it("reste un Server Component sans CTA ni route", () => {
    expect(source).not.toMatch(/["']use client["']/);
    expect(source).not.toMatch(/\b(useState|useEffect|useRef)\b/);
    expect(source).not.toContain("LinkButton");
    expect(source).not.toMatch(/href=["']\/conseils["']/);
    expect(source).not.toContain("ctaLabel");
    expect(source).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(source).not.toContain("priority");
  });

  it("rend #conseils, H2 composé et accent uniquement sur « pour sublimer »", () => {
    const html = renderToStaticMarkup(<AdvicePreview />);

    expect(html).toContain('id="conseils"');
    expect(html.match(/id="conseils"/g)).toHaveLength(1);
    expect(html).toContain('aria-labelledby="conseils-heading"');
    expect(html).toContain('id="conseils-heading"');
    expect(html.match(/<h2\b/g)).toHaveLength(1);
    expect(html).toContain(adviceCopy.eyebrowLead);
    expect(html).toContain(adviceCopy.eyebrowBrand);
    expect(html).toContain("PRiMiE");
    expect(html).not.toContain(">PRIMIE<");
    expect(html).not.toContain(">PRIMiE<");
    expect(html).not.toContain(">Primie<");
    expect(html).toContain(adviceCopy.titleLead);
    expect(html).toContain(adviceCopy.titleAccent);
    expect(html).toContain(adviceCopy.titleEnd);
    expect(html).toContain(adviceCopy.description);

    const accentMarkup = html.match(/<span class="[^"]*text-gold[^"]*">([^<]*)<\/span>/);
    expect(accentMarkup?.[1]?.trim()).toBe(adviceCopy.titleAccent);
    expect(adviceCopy.titleAccent).toBe("pour sublimer");

    expect(html).not.toContain(adviceCopy.ctaLabel);
    expect(html).not.toContain("Découvrir tous nos conseils");
    expect(html).not.toContain("secrets d’experte");
    expect(html).not.toContain("secrets d'experte");
  });

  it("structure le titre en deux segments sans br ni nowrap forcé", () => {
    const html = renderToStaticMarkup(<AdvicePreview />);

    expect(source).toContain("data-advice-intro");
    expect(source).not.toMatch(/<br\s*\/?>/);
    expect(source).not.toMatch(/xl:whitespace-nowrap/);
    expect(source).toMatch(/overflow-x-clip/);
    expect(source).not.toMatch(/overflow-hidden/);

    const h2Block = html.slice(html.indexOf('id="conseils-heading"'), html.indexOf("</h2>"));
    expect(h2Block).toContain(adviceCopy.titleLead);
    expect(h2Block).toContain(adviceCopy.titleAccent);
    expect(h2Block).toContain(adviceCopy.titleEnd);
    expect(h2Block).toMatch(/block[^"]*text-foreground/);
  });

  it("compose l’intro mobile et la grille desktop alignée sur les cartes", () => {
    expect(source).toContain("data-advice-intro");
    expect(source).toContain("data-advice-portrait");
    expect(source).toMatch(/w-\[58%\]/);
    expect(source).toMatch(/w-\[42%\]/);
    expect(source).toMatch(/lg:grid-cols-3/);
    expect(source).toMatch(/lg:col-span-2/);
    expect(source).toMatch(/lg:col-span-1/);
    expect(source).toMatch(/lg:gap-5/);
    expect(source).toMatch(/lg:max-w-\[17\.5rem\]/);
    expect(source).toMatch(/xl:max-w-\[19rem\]/);
    expect(source).toMatch(/mask-image/);
    expect(source).toMatch(/spacing="none"/);
    expect(source).toMatch(/lg:pt-6/);
    expect(source).toMatch(/pt-4/);
    expect(source).not.toMatch(/-mt-|translate-y-|margin-top:\s*-/);
  });

  it("rend trois cartes et le portrait officiel Bantu Knots WebP", () => {
    const html = renderToStaticMarkup(<AdvicePreview />);

    expect(html.match(/<article\b/g)).toHaveLength(3);
    expect(html.match(/<li\b/g)).toHaveLength(3);
    expect(html).toContain("<ul");
    expect(source).toMatch(/lg:grid-cols-3/);
    expect(html.match(/<h3\b/g)).toHaveLength(3);

    const positions = advice.map((item) => html.indexOf(item.title));
    expect(positions.every((pos) => pos >= 0)).toBe(true);
    for (let i = 1; i < positions.length; i += 1) {
      expect(positions[i]!).toBeGreaterThan(positions[i - 1]!);
    }

    for (const item of advice) {
      expect(html).toContain(item.number);
      expect(html).toContain(item.category);
      expect(html).toContain(item.summary);
      expect(html).toContain(item.image.alt);
      expect(html).toContain(item.image.src.replace(/^\//, "").split("/").at(-1)!);
    }

    expect(html).toContain("soin-perruque.webp");
    expect(html).not.toContain("perruque-deep-wave.webp");
    expect(html).toContain("Perruque ondulée présentée avec des accessoires de soin");
    expect(html).not.toMatch(/produits? PRiMiE|gamme PRiMiE|coffret PRiMiE|disponible à la vente/i);

    expect(adviceDecorativePortrait.src).toBe("/images/advice/advice-portrait-bantu-knots-v1.webp");
    expect(html).toContain("advice-portrait-bantu-knots-v1.webp");
    expect(html).toMatch(/url=%2Fimages%2Fadvice%2Fadvice-portrait-bantu-knots-v1\.webp/);
    expect(html).toContain("entretien-tresses.webp");
    expect(adviceDecorativePortrait.src).not.toContain("entretien-tresses");
    expect(html).toMatch(/alt=""/);
    expect(html).toContain('aria-hidden="true"');
    expect(html).not.toMatch(/\.png/);
    expect(html).not.toMatch(/\spriority[=:\s]/);

    expect(html).not.toMatch(/href=/);
    expect(html).not.toMatch(/href=["']\/conseils["']/);
    expect(html).not.toContain("/conseils");
    expect(html).not.toMatch(/<a\b|<button\b/);
    expect(html).not.toContain("Lire l’article");
    expect(html).not.toContain("Lire l'article");
    expect(html).not.toContain("Découvrir tous les conseils");
  });

  it("signale l’absence de route détail — cartes statiques (Cas B)", () => {
    expect(existsSync(join(process.cwd(), "app/conseils"))).toBe(false);
    const html = renderToStaticMarkup(<AdvicePreview />);
    expect(html).not.toMatch(/cursor-pointer/);
    expect(html).not.toMatch(/href=/);
    expect(html).not.toMatch(/<a\b|<button\b/);
  });
});
