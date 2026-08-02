import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { GalleryFilters } from "./gallery-filters";
import { gallery, galleryCategories } from "@/content/gallery";

describe("GalleryFilters — GALLERY-PAGE-HERO-R1", () => {
  it("est un Client Component sans rail horizontal, 6 filtres exacts", () => {
    const source = readFileSync(
      join(process.cwd(), "components/gallery/gallery-filters.tsx"),
      "utf8",
    );
    expect(source).toMatch(/["']use client["']/);
    expect(source).toContain("aria-pressed");
    expect(source).toContain("rounded-full");
    expect(source).toContain("grid-cols-2");
    expect(source).toContain("aria-live");
    expect(source).toContain("getGalleryItemsByCategory");
    expect(source).toContain("children");
    expect(source).not.toContain("localStorage");
    expect(source).not.toContain("gallery-filters-rail");
    expect(source).not.toMatch(/Nos réalisations/i);
    expect(source).not.toMatch(/cils/i);
  });

  it("intègre les filtres dans le Hero et rend la grille une seule fois", () => {
    const html = renderToStaticMarkup(
      <GalleryFilters items={gallery} footer={<p>footer-slot</p>}>
        <div>hero-slot</div>
      </GalleryFilters>,
    );

    expect(html).toContain("hero-slot");
    expect(html).toContain("footer-slot");
    expect(html.match(/Filtrer la galerie par catégorie/g)).toHaveLength(1);
    expect(html.match(/<header\b/g)).toHaveLength(1);

    for (const category of galleryCategories) {
      expect(html).toContain(`>${category.label.replaceAll("&", "&amp;")}<`);
    }
    expect(html.match(/aria-pressed="/g)).toHaveLength(6);
    expect(html).toContain('aria-pressed="true"');
    expect(html.match(/<article\b/g)).toHaveLength(14);
    expect(html).toContain("14 styles");
    expect(html).toContain("grid-cols-2");
    expect(html).not.toMatch(/\.png/i);
    expect(html).not.toMatch(/cils/i);
    expect(html).not.toMatch(/Nos réalisations/i);
    expect(html).not.toMatch(/<a[\s>]/);
    expect(html).not.toMatch(/prix|durée|€/i);
  });
});
