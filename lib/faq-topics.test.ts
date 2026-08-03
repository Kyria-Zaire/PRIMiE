import { describe, expect, it } from "vitest";
import { faq } from "@/content/faq";
import { filterFaqItems } from "@/lib/faq-search";
import {
  FAQ_ASSISTANT_COPY,
  FAQ_QUICK_TOPICS,
  getFaqQuickTopic,
  resolveFaqItemForTopic,
} from "@/lib/faq-topics";

describe("FAQ_QUICK_TOPICS", () => {
  it("expose cinq sujets dans l’ordre exact du ticket", () => {
    expect(FAQ_QUICK_TOPICS.map((topic) => topic.label)).toEqual([
      "Prendre rendez-vous",
      "Prestations à domicile",
      "Durée d’une prestation",
      "Préparer mes cheveux",
      "Prestations pour hommes",
    ]);
    expect(FAQ_QUICK_TOPICS).toHaveLength(5);
  });

  it("mappe chaque sujet vers une FAQ canonique et un terme de recherche", () => {
    const expectedTerms = ["rendez-vous", "domicile", "durée", "préparer", "hommes"] as const;

    FAQ_QUICK_TOPICS.forEach((topic, index) => {
      const item = resolveFaqItemForTopic(faq, topic.id);
      expect(item).toBeDefined();
      expect(item?.id).toBe(faq[index]?.id);
      expect(topic.searchTerm).toBe(expectedTerms[index]);
      expect(getFaqQuickTopic(topic.id)?.id).toBe(topic.id);

      const filtered = filterFaqItems(faq, topic.searchTerm);
      expect(filtered).toHaveLength(1);
      expect(filtered[0]?.id).toBe(topic.id);
    });
  });

  it("conserve le chrome Assistant sans horaires ni téléphone", () => {
    expect(FAQ_ASSISTANT_COPY.title).toBe("Que souhaitez-vous savoir ?");
    expect(FAQ_ASSISTANT_COPY.description).toContain("Choisissez un sujet");
    expect(FAQ_ASSISTANT_COPY.resetLabel).toBe("Voir toutes les questions");
    expect(JSON.stringify(FAQ_ASSISTANT_COPY)).not.toMatch(/horaire|téléphone|zone/i);
  });
});
