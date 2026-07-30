import { describe, expect, it } from "vitest";
import { navigation } from "../content/navigation";

const EXPECTED_ORDER = [
  { id: "accueil", href: "#accueil" },
  { id: "services", href: "#services" },
  { id: "galerie", href: "#galerie" },
  { id: "a-propos", href: "#a-propos" },
  { id: "avis", href: "#avis" },
  { id: "faq", href: "#faq" },
  { id: "reserver", href: "#reserver" },
  { id: "contact", href: "#contact" },
] as const;

describe("navigation", () => {
  it("respecte l’ordre et les ancres canoniques du PRD", () => {
    expect(navigation.map(({ id, href }) => ({ id, href }))).toEqual([...EXPECTED_ORDER]);
  });

  it("utilise des ancres locales uniques", () => {
    const hrefs = navigation.map((item) => item.href);

    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(new Set(navigation.map((item) => item.id)).size).toBe(navigation.length);

    for (const item of navigation) {
      expect(item.href.startsWith("#")).toBe(true);
      expect(item.href.includes("://")).toBe(false);
      expect(item.href).not.toBe("#");
    }
  });
});
