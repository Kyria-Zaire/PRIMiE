import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { gallery, galleryCopy } from "@/content/gallery";

describe("app/galerie/page — GALLERY-PAGE-HERO-R1", () => {
  const source = readFileSync(join(process.cwd(), "app/galerie/page.tsx"), "utf8");
  const copy = galleryCopy.page;

  it("expose metadata, shell public et Server Component page", () => {
    expect(source).not.toMatch(/["']use client["']/);
    expect(source).toContain("export const metadata");
    expect(source).toContain("title: copy.metaTitle");
    expect(source).toContain("description: copy.metaDescription");
    expect(copy.metaTitle).toBe("Galerie d’inspirations | Chez PRiMiE Coiffure");
    expect(source).toContain("SkipLink");
    expect(source).toContain("Header");
    expect(source).toContain("Footer");
    expect(source).toContain('id="contenu-principal"');
    expect(source).toContain("tabIndex={-1}");
    expect(source).toContain('homeHref="/"');
    expect(source).toContain('resolveNavigationForRoute(visibleNavigation, "/galerie")');
  });

  it("compose Hero + filtres unique + copy exacte sans duplication", () => {
    expect(source).toContain("GalleryPageHero");
    expect(source).toContain("GalleryFilters");
    expect(source).toContain("<GalleryPageHero />");
    expect(source).toMatch(/<GalleryFilters[\s>]/);
    expect(source.match(/<GalleryFilters[\s>]/g)).toHaveLength(1);
    expect(source.match(/<GalleryPageHero\s*\/>/g)).toHaveLength(1);
    expect(copy.title).toBe("Galerie d’inspirations");
    expect(copy.accent).toBe("Chaque coiffure, une inspiration unique");
    expect(copy.description).toBe(
      "Découvrez une sélection de styles qui reflètent l’univers et les prestations proposées par PRiMiE Coiffure.",
    );
    expect(source).not.toContain("copy.disclosure");
    expect(source).not.toMatch(/Visuels d’illustration/i);
    expect(copy.bookingCtaLabel).toBe("Faire une demande de rendez-vous");
    expect(copy.bookingCtaHref).toBe("/#reserver");
    expect(source).toContain("items={gallery}");
    expect(gallery).toHaveLength(14);
    expect(source).toContain("{copy.bookingCtaHref}");
    expect(source).toContain("{copy.bookingCtaLabel}");
    expect(source).not.toMatch(
      /Nos réalisations|Mes réalisations|Portfolio de Prisca|mon savoir-faire/i,
    );
    expect(source).not.toMatch(/cils/i);
    expect(source).not.toMatch(/Réservation confirmée|Réserver maintenant|Créneau garanti/i);
    expect(source).not.toMatch(/lightbox|carousel|swiper/i);
  });

  it("compose Footer multi-route sur /galerie avec homeHref racine", () => {
    expect(source).toContain('<Footer navigationItems={routeNavigation} homeHref="/" />');
    expect(source).toContain('resolveNavigationForRoute(visibleNavigation, "/galerie")');
  });
});
