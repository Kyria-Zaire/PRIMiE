import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { GalleryFilters } from "./gallery-filters";
import { gallery, galleryCategories } from "@/content/gallery";

describe("GalleryFilters", () => {
  it("est un Client Component minimal avec 6 filtres exacts", () => {
    const source = readFileSync(
      join(process.cwd(), "components/gallery/gallery-filters.tsx"),
      "utf8",
    );
    expect(source).toMatch(/["']use client["']/);
    expect(source).toContain("aria-pressed");
    expect(source).toContain("gallery-filters-rail");
    expect(source).toContain("aria-live");
    expect(source).toContain("getGalleryItemsByCategory");
    expect(source).not.toContain("localStorage");
    expect(source).not.toMatch(/Nos réalisations/i);
    expect(source).not.toMatch(/cils/i);
  });

  it("rend les 6 boutons et les 14 cartes pour Toutes", () => {
    const html = renderToStaticMarkup(<GalleryFilters items={gallery} />);

    for (const category of galleryCategories) {
      expect(html).toContain(`>${category.label.replaceAll("&", "&amp;")}<`);
    }
    expect(html.match(/aria-pressed="/g)).toHaveLength(6);
    expect(html).toContain('aria-pressed="true"');
    expect(html.match(/<article\b/g)).toHaveLength(14);
    expect(html).toContain("14 styles");
    expect(html).not.toMatch(/\.png/i);
    expect(html).not.toMatch(/cils/i);
    expect(html).not.toMatch(/Nos réalisations/i);
    expect(html).not.toMatch(/<a[\s>]/);
    expect(html).not.toMatch(/prix|durée|€/i);
  });
});
