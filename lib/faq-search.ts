import type { FaqItem } from "@/content/types";

/** Normalise pour une recherche insensible à la casse et aux accents. */
export function normalizeFaqSearch(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().trim();
}

/** Filtre les entrées FAQ sur la question et la réponse. */
export function filterFaqItems(items: readonly FaqItem[], query: string): readonly FaqItem[] {
  const needle = normalizeFaqSearch(query);
  if (needle.length === 0) {
    return items;
  }

  return items.filter((item) => {
    const haystack = normalizeFaqSearch(`${item.question} ${item.answer}`);
    return haystack.includes(needle);
  });
}
