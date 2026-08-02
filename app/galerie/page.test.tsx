import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { gallery, galleryCopy } from "@/content/gallery";

describe("app/galerie/page — GALLERY-CONTENT-01D", () => {
  const source = readFileSync(join(process.cwd(), "app/galerie/page.tsx"), "utf8");
  const copy = galleryCopy.page;

  it("expose metadata, shell et Server Component page", () => {
    expect(source).not.toMatch(/["']use client["']/);
    expect(source).toContain("export const metadata");
    expect(source).toContain("title: copy.metaTitle");
    expect(source).toContain("description: copy.metaDescription");
    expect(copy.metaTitle).toBe("Galerie d’inspirations | Chez PRiMiE Coiffure");
    expect(copy.metaDescription).toBe(
      "Découvrez une sélection de styles illustrant l’univers et les prestations proposées par PRiMiE Coiffure.",
    );
    expect(source).toContain("SkipLink");
    expect(source).toContain("Header");
    expect(source).toContain("Footer");
    expect(source).toContain('id="contenu-principal"');
    expect(source).toContain("tabIndex={-1}");
    expect(source).toContain('homeHref="/"');
    expect(source).toContain('resolveNavigationForRoute(visibleNavigation, "/galerie")');
  });

  it("centralise copy exacte, disclosure, CTA final et 14 items", () => {
    expect(source).toContain("<h1");
    expect((source.match(/<h1\b/g) ?? []).length).toBe(1);
    expect(copy.title).toBe("Galerie d’inspirations");
    expect(copy.accent).toBe("Chaque coiffure, une inspiration unique");
    expect(copy.description).toBe(
      "Découvrez une sélection de styles qui reflètent l’univers et les prestations proposées par PRiMiE Coiffure.",
    );
    expect(copy.disclosure).toContain("Visuels d’illustration");
    expect(copy.bookingCtaLabel).toBe("Faire une demande de rendez-vous");
    expect(copy.bookingCtaHref).toBe("/#reserver");
    expect(copy.bookingSecondary).toBe(
      "Préparez votre demande et échangez directement avec Prisca sur WhatsApp.",
    );
    expect(source).toContain("GalleryFilters");
    expect(source).toContain("items={gallery}");
    expect(gallery).toHaveLength(14);
    expect(source).toContain("{copy.bookingCtaHref}");
    expect(source).toContain("{copy.bookingCtaLabel}");
    expect(source).not.toMatch(/Nos réalisations|Mes réalisations|Portfolio de Prisca/i);
    expect(source).not.toMatch(/cils/i);
    expect(source).not.toMatch(/Réservation confirmée|Réserver maintenant|Créneau garanti/i);
    expect(source).not.toMatch(/lightbox|carousel|swiper/i);
  });
});
