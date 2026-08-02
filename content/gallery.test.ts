import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { featuredGallery, gallery, galleryCategories, galleryCopy } from "../content/gallery";
import { services, type ServiceId } from "../content/services";

const EXPECTED_IDS = [
  "tresses-longues",
  "perruque-body-wave",
  "pose-perruque-lace",
  "chignon-tresse",
  "puff-afro",
  "tresses-feed-in",
  "twists-vanilles",
  "bantu-knots",
  "faux-locs-deesse",
  "tissage-ondule",
  "tissage-bresilien",
  "queue-cheval-tressee",
  "perruque-deep-wave",
  "tresses-tribales",
] as const;

const EXPECTED_FEATURED = [
  "tresses-longues",
  "perruque-body-wave",
  "perruque-deep-wave",
  "tresses-tribales",
  "queue-cheval-tressee",
  "tissage-bresilien",
  "faux-locs-deesse",
  "puff-afro",
] as const;

/** Ordre CTO strict — pas un tri alphabétique. */

const ITEM_CATEGORY_IDS = [
  "tresses",
  "perruques",
  "tissage",
  "twists-locs",
  "coiffures-afro",
] as const;

const SERVICE_IDS = new Set(services.map((service) => service.id));
const MAX_WEBP_BYTES = 180 * 1024;

describe("gallery content — GALLERY-CONTENT-01B", () => {
  it("expose exactement 14 items uniques avec sources WebP locales", () => {
    expect(gallery).toHaveLength(14);
    expect(gallery.map((item) => item.id).sort()).toEqual([...EXPECTED_IDS].sort());
    expect(new Set(gallery.map((item) => item.id)).size).toBe(14);
    expect(new Set(gallery.map((item) => item.src)).size).toBe(14);

    for (const item of gallery) {
      expect(item.src).toMatch(/^\/images\/gallery\/[\w-]+\.webp$/);
      expect(item.src.endsWith(".webp")).toBe(true);
      expect(item.src).not.toMatch(/\.png$/i);

      const absolute = join(process.cwd(), "public", item.src.replace(/^\//, ""));
      expect(existsSync(absolute)).toBe(true);
      expect(statSync(absolute).size).toBeGreaterThan(0);
      expect(statSync(absolute).size).toBeLessThanOrEqual(MAX_WEBP_BYTES);
      expect(item.width).toBeGreaterThan(0);
      expect(item.height).toBeGreaterThan(0);
    }
  });

  it("n’expose aucun PNG runtime ni import de source PNG", () => {
    const publicGallery = join(process.cwd(), "public/images/gallery");
    const publicFiles = existsSync(publicGallery) ? readdirSync(publicGallery) : [];
    expect(publicFiles.every((name) => name.endsWith(".webp"))).toBe(true);
    expect(publicFiles.some((name) => name.endsWith(".png"))).toBe(false);

    const gallerySource = readFileSync(join(process.cwd(), "content/gallery.ts"), "utf8");
    expect(gallerySource).not.toMatch(/images\/gallery\/[\w-]+\.png/);
    expect(gallerySource).not.toMatch(/from ["'].*\.png["']/);
  });

  it("respecte catégories, featured CTO et droits illustration", () => {
    expect(galleryCategories.map((category) => category.id)).toEqual([
      "all",
      "tresses",
      "perruques",
      "tissage",
      "twists-locs",
      "coiffures-afro",
    ]);
    expect(galleryCategories.map((category) => category.label)).toEqual([
      "Toutes",
      "Tresses",
      "Perruques",
      "Tissage",
      "Twists & locs",
      "Coiffures afro",
    ]);
    expect(JSON.stringify(galleryCategories)).not.toMatch(/cils/i);

    for (const categoryId of ITEM_CATEGORY_IDS) {
      expect(gallery.some((item) => item.categoryId === categoryId)).toBe(true);
    }

    const featuredFlags = gallery.filter((item) => item.featured).map((item) => item.id);
    expect(featuredFlags).toHaveLength(8);
    expect(featuredFlags.sort()).toEqual([...EXPECTED_FEATURED].sort());
    expect(featuredGallery).toHaveLength(8);
    expect(featuredGallery.map((item) => item.id)).toEqual([...EXPECTED_FEATURED]);
    expect(featuredGallery.every((item) => item.featured)).toBe(true);

    for (const item of gallery) {
      expect(item.title.trim().length).toBeGreaterThan(0);
      expect(item.alt.trim().length).toBeGreaterThan(0);
      expect(item.kind).toBe("illustration");
      expect(item.rightsStatus).toBe("project_approved");
      expect(item.serviceIds.length).toBeGreaterThan(0);
      for (const serviceId of item.serviceIds) {
        expect(SERVICE_IDS.has(serviceId as ServiceId)).toBe(true);
      }
      expect(item.title).not.toMatch(/Nos réalisations|Mes réalisations/i);
      expect(item.alt).not.toMatch(/cliente de Prisca|réalisé par Prisca/i);
    }
  });

  it("centralise le wording d’inspirations sans Nos réalisations", () => {
    expect(galleryCopy.landing.title).toBe("Galerie d’inspirations");
    expect(galleryCopy.landing.accent).toBe("Chaque coiffure, une inspiration unique");
    expect(galleryCopy.landing.ctaLabel).toBe("Découvrir la galerie");
    expect(galleryCopy.landing.ctaHref).toBe("/galerie");
    expect(galleryCopy.page.title).toBe("Galerie d’inspirations");
    expect(galleryCopy.page.accent).toBe("Chaque coiffure, une inspiration unique");
    expect(galleryCopy.page.disclosure).toContain("Visuels d’illustration");
    expect(galleryCopy.page.metaTitle).toBe("Galerie d’inspirations | Chez PRiMiE Coiffure");
    expect(galleryCopy.page.bookingCtaLabel).toBe("Faire une demande de rendez-vous");
    expect(galleryCopy.page.bookingCtaHref).toBe("/#reserver");
    expect(galleryCopy.page.bookingSecondary).toContain("WhatsApp");

    const blob = JSON.stringify({ gallery, galleryCopy, galleryCategories });
    expect(blob).not.toMatch(/Nos réalisations|Mes réalisations/i);
    expect(blob).toContain("Galerie d’inspirations");
    expect(blob).toContain("Visuels d’illustration");
  });
});
