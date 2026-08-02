import type { GalleryFilterId } from "@/content/gallery";
import type { GalleryItem } from "@/content/types";

/**
 * Filtre pur par categoryId. `all` ou id inconnu → liste complète (ordre préservé).
 * Ne mute pas `items`.
 */
export function getGalleryItemsByCategory(
  items: readonly GalleryItem[],
  categoryId: GalleryFilterId | string,
): readonly GalleryItem[] {
  if (categoryId === "all") {
    return items;
  }

  const known = items.some((item) => item.categoryId === categoryId);
  if (!known) {
    return items;
  }

  return items.filter((item) => item.categoryId === categoryId);
}
