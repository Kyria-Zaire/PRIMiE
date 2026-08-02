import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { GalleryPreview } from "./gallery-preview";
import { featuredGallery, featuredGalleryIds, galleryCopy } from "@/content/gallery";

describe("GalleryPreview", () => {
  const source = readFileSync(
    join(process.cwd(), "components/sections/gallery-preview.tsx"),
    "utf8",
  );
  const globalsCss = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

  it("reste un Server Component avec CTA /galerie et sans hex dans le composant", () => {
    expect(source).not.toMatch(/["']use client["']/);
    expect(source).not.toMatch(/\b(useState|useEffect|useRef)\b/);
    expect(source).toContain("ctaLabel");
    expect(source).toContain("ctaHref");
    expect(source).toContain("LinkButton");
    expect(source).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(source).not.toMatch(/scrollLeft|scrollTo|scrollBy/);
  });

  it("expose un rail .gallery-preview-rail scrollable et focusable, scrollbar non masquée", () => {
    expect(source).toContain("gallery-preview-rail");
    expect(source).toContain("focus-visible:outline");
    expect(source).toContain("tabIndex={0}");
    expect(source).toContain("snap-x");
    expect(source).toContain("snap-mandatory");
    expect(source).toContain("snap-start");
    expect(source).toContain("justify-start");
    expect(source).not.toContain("-ms-overflow-style");
    expect(source).not.toMatch(/scrollbar-hide|overflow-x-hidden/);

    expect(globalsCss).toMatch(/\.gallery-preview-rail(?:,|\s)[\s\S]*?overflow-x:\s*auto/);
    expect(globalsCss).toMatch(/\.gallery-preview-rail(?:,|\s)[\s\S]*?scrollbar-width:\s*thin/);
    expect(globalsCss).toContain("gallery-filters-rail");
    expect(globalsCss).toContain("scrollbar-color:");
    expect(globalsCss).toContain("::-webkit-scrollbar");
    expect(globalsCss).toContain("::-webkit-scrollbar-thumb");
    expect(globalsCss).toContain("var(--color-bronze)");
    expect(globalsCss).toContain("var(--color-gold)");
    expect(globalsCss).toContain("var(--color-warm-cream)");
    expect(globalsCss).toMatch(/\.gallery-preview-rail::-webkit-scrollbar[\s\S]*?height:\s*6px/);
    expect(globalsCss).not.toMatch(
      /\.gallery-preview-rail::-webkit-scrollbar\s*\{[^}]*display:\s*none/,
    );
    expect(globalsCss).not.toMatch(/-ms-overflow-style:\s*none/);
  });

  it("rend #galerie, CTA /galerie, 8 cartes featured et disclosure", () => {
    const html = renderToStaticMarkup(<GalleryPreview />);
    const copy = galleryCopy.landing;

    expect(html).toContain('id="galerie"');
    expect(html.match(/id="galerie"/g)).toHaveLength(1);
    expect(html).toContain(`>${copy.title}<`);
    expect(html).toContain(copy.accent);
    expect(html).toContain(copy.description);
    expect(html).toContain(copy.disclosure);
    expect(html).toContain(`>${copy.ctaLabel}<`);
    expect(html).toContain(`href="${copy.ctaHref}"`);
    expect(html).toContain('href="/galerie"');
    expect(html).toContain('aria-label="Aperçu de la galerie d’inspirations"');
    expect(html).toContain("gallery-preview-rail");
    expect(html).toContain("snap-x");
    expect(html.match(/<article\b/g)).toHaveLength(8);

    const cardPositions = featuredGalleryIds.map((id) => html.indexOf(`${id}.webp`));
    expect(cardPositions.every((pos) => pos >= 0)).toBe(true);
    for (let i = 1; i < cardPositions.length; i += 1) {
      expect(cardPositions[i]!).toBeGreaterThan(cardPositions[i - 1]!);
    }

    for (const [index, id] of featuredGalleryIds.entries()) {
      expect(featuredGallery[index]?.id).toBe(id);
      expect(html).toContain(`${id}.webp`);
      expect(html).toContain(`>${featuredGallery[index]!.title}<`);
    }

    expect(html).not.toContain("pose-perruque-lace");
    expect(html).not.toMatch(/Nos réalisations|Mes réalisations/i);
    expect(html).not.toMatch(/<button\b/);
  });
});
