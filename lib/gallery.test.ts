import { describe, expect, it } from "vitest";
import { gallery } from "@/content/gallery";
import { getGalleryItemsByCategory } from "./gallery";

describe("getGalleryItemsByCategory", () => {
  it("retourne les 14 items pour Toutes sans mutation", () => {
    const before = gallery.map((item) => item.id);
    const result = getGalleryItemsByCategory(gallery, "all");
    expect(result).toHaveLength(14);
    expect(result.map((item) => item.id)).toEqual(before);
    expect(gallery.map((item) => item.id)).toEqual(before);
  });

  it("filtre exclusivement par categoryId et conserve l’ordre", () => {
    const tresses = getGalleryItemsByCategory(gallery, "tresses");
    expect(tresses.length).toBeGreaterThan(0);
    expect(tresses.every((item) => item.categoryId === "tresses")).toBe(true);
    expect(tresses.map((item) => item.id)).toEqual(
      gallery.filter((item) => item.categoryId === "tresses").map((item) => item.id),
    );

    for (const categoryId of ["perruques", "tissage", "twists-locs", "coiffures-afro"] as const) {
      const filtered = getGalleryItemsByCategory(gallery, categoryId);
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered.every((item) => item.categoryId === categoryId)).toBe(true);
    }
  });

  it("sécurise une catégorie inconnue en retournant toute la liste", () => {
    const result = getGalleryItemsByCategory(gallery, "cils");
    expect(result).toHaveLength(14);
    expect(result.map((item) => item.id)).toEqual(gallery.map((item) => item.id));
  });

  it("aucune catégorie métier n’est vide", () => {
    for (const categoryId of [
      "tresses",
      "perruques",
      "tissage",
      "twists-locs",
      "coiffures-afro",
    ] as const) {
      expect(getGalleryItemsByCategory(gallery, categoryId).length).toBeGreaterThan(0);
    }
  });
});
