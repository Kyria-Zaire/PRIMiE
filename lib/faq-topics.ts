import type { FaqItem } from "@/content/types";

/** Chrome UI Assistant FAQ — hors content/faq.ts (Q/R métier inchangées). */
export const FAQ_ASSISTANT_COPY = {
  title: "Que souhaitez-vous savoir ?",
  description: "Choisissez un sujet pour accéder directement à la réponse.",
  resetLabel: "Voir toutes les questions",
} as const;

/**
 * Cinq sujets express — ordre et libellés validés ticket.
 * `id` = id canonique de content/faq.ts ; `searchTerm` alimente le filtre.
 */
export const FAQ_QUICK_TOPICS = [
  {
    id: "prendre-rendez-vous",
    label: "Prendre rendez-vous",
    searchTerm: "rendez-vous",
  },
  {
    id: "prestations-domicile",
    label: "Prestations à domicile",
    searchTerm: "domicile",
  },
  {
    id: "duree-prestation",
    label: "Durée d’une prestation",
    searchTerm: "durée",
  },
  {
    id: "preparation-cheveux",
    label: "Préparer mes cheveux",
    searchTerm: "préparer",
  },
  {
    id: "prestations-hommes",
    label: "Prestations pour hommes",
    searchTerm: "hommes",
  },
] as const;

export type FaqQuickTopic = (typeof FAQ_QUICK_TOPICS)[number];
export type FaqQuickTopicId = FaqQuickTopic["id"];

export function getFaqQuickTopic(id: string): FaqQuickTopic | undefined {
  return FAQ_QUICK_TOPICS.find((topic) => topic.id === id);
}

/** Résout la FAQ canonique associée à un sujet express. */
export function resolveFaqItemForTopic(
  items: readonly FaqItem[],
  topicId: FaqQuickTopicId,
): FaqItem | undefined {
  return items.find((item) => item.id === topicId);
}
