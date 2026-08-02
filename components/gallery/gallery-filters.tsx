"use client";

import { useId, useState, type ReactNode } from "react";
import { GalleryCard } from "@/components/gallery/gallery-card";
import { galleryCategories, type GalleryCategory, type GalleryFilterId } from "@/content/gallery";
import type { GalleryItem } from "@/content/types";
import { getGalleryItemsByCategory } from "@/lib/gallery";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export type GalleryFiltersProps = {
  readonly items: readonly GalleryItem[];
  readonly categories?: readonly GalleryCategory[];
  /** Zone éditoriale + portrait (Server), intégrée dans le même Hero que les filtres. */
  readonly children: ReactNode;
  /** Disclosure + CTA sous la grille. */
  readonly footer?: ReactNode;
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
 * Hero bandeau (enfants) + filtres + grille — Client Component minimal.
 * Filtres en grille 2×3 mobile ; une ligne desktop. Pas de rail horizontal.
 */
export function GalleryFilters({
  items,
  categories = galleryCategories,
  children,
  footer,
}: GalleryFiltersProps) {
  const [activeId, setActiveId] = useState<GalleryFilterId>("all");
  const resultsId = useId();
  const visibleItems = getGalleryItemsByCategory(items, activeId);

  return (
    <>
      <header className="relative overflow-hidden bg-ivory text-foreground lg:max-h-[480px]">
        {children}

        <div className="relative z-20 mx-auto w-full max-w-page px-4 pt-2 pb-6 sm:px-6 sm:pb-7 lg:px-8 lg:pt-0 lg:pb-5">
          <div
            role="group"
            aria-label="Filtrer la galerie par catégorie"
            className="mx-auto grid max-w-lg grid-cols-2 gap-2 sm:max-w-xl sm:gap-2.5 lg:flex lg:max-w-none lg:flex-wrap lg:justify-center lg:gap-2.5 xl:flex-nowrap"
          >
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
                      ? "inline-flex min-h-11 w-full items-center justify-center rounded-full bg-cta-gold px-3 font-sans text-xs font-semibold tracking-wide text-primary-foreground uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus sm:text-sm lg:w-auto lg:min-w-0 lg:px-5"
                      : "inline-flex min-h-11 w-full items-center justify-center rounded-full border border-bronze/50 bg-ivory px-3 font-sans text-xs font-medium tracking-wide text-foreground uppercase hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus sm:text-sm lg:w-auto lg:min-w-0 lg:px-5"
                  }
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <Section tone="cream" spacing="compact" aria-labelledby="galerie-page-heading">
        <Container className="flex flex-col gap-8 md:gap-10">
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

          {footer}
        </Container>
      </Section>
    </>
  );
}
