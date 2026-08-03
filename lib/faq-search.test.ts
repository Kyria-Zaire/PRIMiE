import { describe, expect, it } from "vitest";
import { faq } from "@/content/faq";
import { filterFaqItems, normalizeFaqSearch } from "./faq-search";

describe("faq-search", () => {
  it("normalise casse et accents", () => {
    expect(normalizeFaqSearch("  PréPARÉ  ")).toBe("prepare");
    expect(normalizeFaqSearch("À domicile")).toBe("a domicile");
  });

  it("filtre sur la question et la réponse", () => {
    const byQuestion = filterFaqItems(faq, "hommes");
    expect(byQuestion).toHaveLength(1);
    expect(byQuestion[0]?.id).toBe("prestations-hommes");

    const byAnswer = filterFaqItems(faq, "faisabilité");
    expect(byAnswer).toHaveLength(1);
    expect(byAnswer[0]?.id).toBe("prestations-domicile");
  });

  it("reste insensible aux accents", () => {
    const results = filterFaqItems(faq, "prepare");
    expect(results.some((item) => item.id === "preparation-cheveux")).toBe(true);
  });

  it("retourne toutes les entrées si la requête est vide", () => {
    expect(filterFaqItems(faq, "   ")).toHaveLength(5);
  });

  it("retourne une liste vide sans résultat", () => {
    expect(filterFaqItems(faq, "garantie paiement perruque")).toHaveLength(0);
  });
});
