import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { GalleryPageHero } from "./gallery-page-hero";
import { galleryCopy } from "@/content/gallery";

describe("GalleryPageHero — GALLERY-PAGE-HERO-R1", () => {
  const source = readFileSync(
    join(process.cwd(), "components/gallery/gallery-page-hero.tsx"),
    "utf8",
  );
  const heroWebp = join(process.cwd(), "public/images/gallery/gallery-hero-model-v1.webp");

  it("reste Server Component avec copy honnête et asset dédié", () => {
    expect(source).not.toMatch(/["']use client["']/);
    expect(source).not.toMatch(/\b(useState|useEffect|useRef)\b/);
    expect(source).not.toMatch(
      /Nos réalisations|Mes réalisations|mon savoir-faire|Mes plus belles/i,
    );
    expect(source).not.toMatch(/cils/i);
    expect(source).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(source).toContain("gallery-hero-model-v1.webp");
    expect(source).not.toContain("tresses-tribales.webp");
    expect(source).not.toContain("tresses-longues.webp");
    expect(source).toContain("font-script");
    expect(source).toContain("font-display");
    expect(existsSync(heroWebp)).toBe(true);
  });

  it("rend h1 unique, décor aria-hidden, portrait décoratif priority", () => {
    const html = renderToStaticMarkup(<GalleryPageHero />);
    const copy = galleryCopy.page;

    expect(html).toContain('id="galerie-page-heading"');
    expect(html.match(/id="galerie-page-heading"/g)).toHaveLength(1);
    expect(html).toContain(">Galerie<");
    expect(html).toContain(">d’inspirations<");
    expect(html).toContain(copy.accent);
    expect(html).toContain(copy.description);
    expect(html).toContain("gallery-hero-model-v1.webp");
    expect(html).toContain('alt=""');
    expect(source).toMatch(/\bpriority\b/);
    expect(source).toMatch(/\bunoptimized\b/);
    expect(html).not.toMatch(/Nos réalisations|mon savoir-faire/i);
    expect(html).not.toMatch(/<a[\s>]/);
    expect(html.match(/aria-hidden="true"/g)?.length).toBeGreaterThanOrEqual(3);
  });

  it("conserve un WebP Hero transparent ≤ 220 Ko (pas l’aplati tresses-longues)", async () => {
    const sharp = (await import("sharp")).default;
    const meta = await sharp(heroWebp).metadata();
    const bytes = readFileSync(heroWebp).byteLength;
    const { data, info } = await sharp(heroWebp).ensureAlpha().raw().toBuffer({
      resolveWithObject: true,
    });
    const channels = info.channels;
    let transparent = 0;
    for (let i = 3; i < data.length; i += channels) {
      if (data[i]! < 10) {
        transparent += 1;
      }
    }

    expect(meta.hasAlpha).toBe(true);
    expect(meta.width).toBe(1024);
    expect(meta.height).toBe(1536);
    expect(bytes).toBeLessThanOrEqual(220 * 1024);
    expect(transparent / (info.width * info.height)).toBeGreaterThan(0.2);

    const flatGallery = join(process.cwd(), "public/images/gallery/tresses-longues.webp");
    const flatMeta = await sharp(flatGallery).metadata();
    expect(flatMeta.hasAlpha).toBe(false);
  });
});
