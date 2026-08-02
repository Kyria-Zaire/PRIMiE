"use client";

import { useId, useState } from "react";
import { GalleryCard } from "@/components/gallery/gallery-card";
import { galleryCategories, type GalleryCategory, type GalleryFilterId } from "@/content/gallery";
import type { GalleryItem } from "@/content/types";
import { getGalleryItemsByCategory } from "@/lib/gallery";

export type GalleryFiltersProps = {
  readonly items: readonly GalleryItem[];
  readonly categories?: readonly GalleryCategory[];
};

const GRID_SIZES =
  "(max-width: 767px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, 20vw";

function resultsLabel(count: number): string {
  if (count === 0) {
    return "Aucun style";
  }
  if (count === 1) {
    return "1 style";
  }
  return `${count} styles`;
}

/**
 * Filtres catégorie + grille — Client Component minimal.
 * État local uniquement ; pas de stockage, pas de mutation des données.
 */
export function GalleryFilters({ items, categories = galleryCategories }: GalleryFiltersProps) {
  const [activeId, setActiveId] = useState<GalleryFilterId>("all");
  const resultsId = useId();
  const visibleItems = getGalleryItemsByCategory(items, activeId);

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <div
        role="group"
        aria-label="Filtrer la galerie par catégorie"
        className="gallery-filters-rail"
      >
        <div className="flex w-max min-w-full list-none justify-start gap-2 md:flex-wrap md:justify-center">
          {categories.map((category) => {
            const pressed = category.id === activeId;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={pressed}
                onClick={() => {
                  setActiveId(category.id);
                }}
                className={
                  pressed
                    ? "inline-flex min-h-11 shrink-0 items-center justify-center rounded-md bg-cta-gold px-4 font-sans text-sm font-semibold text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
                    : "inline-flex min-h-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface px-4 font-sans text-sm font-medium text-foreground hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
                }
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      <p id={resultsId} className="sr-only" aria-live="polite" aria-atomic="true">
        {resultsLabel(visibleItems.length)}
      </p>

      <ul
        aria-labelledby={resultsId}
        aria-label="Styles de la galerie d’inspirations"
        className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {visibleItems.map((item) => (
          <li key={item.id} className="min-w-0">
            <GalleryCard item={item} sizes={GRID_SIZES} titleAs="p" />
          </li>
        ))}
      </ul>
    </div>
  );
}
