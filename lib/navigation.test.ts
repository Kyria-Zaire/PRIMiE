import { describe, expect, it } from "vitest";
import { navigation } from "@/content/navigation";
import { getVisibleNavigation, type NavigationSectionId } from "./navigation";

const ALL_IDS = navigation.map((item) => item.id) as NavigationSectionId[];

describe("getVisibleNavigation", () => {
  it("avec toutes les sections rendues, ne conserve que Accueil, Services, Réserver et Contact", () => {
    const visible = getVisibleNavigation(ALL_IDS);
    expect(visible.map((item) => item.id)).toEqual(["accueil", "services", "reserver", "contact"]);
  });

  it("avec seulement Accueil rendu, ne retourne qu’Accueil", () => {
    expect(getVisibleNavigation(["accueil"]).map((item) => item.id)).toEqual(["accueil"]);
  });

  it("expose Services lorsque le contenu et le rendu sont prêts", () => {
    expect(getVisibleNavigation(["services"]).map((item) => item.id)).toEqual(["services"]);
  });

  it("masque Galerie, Avis, FAQ et À propos malgré un rendu déclaré", () => {
    const visible = getVisibleNavigation(["galerie", "avis", "faq", "a-propos"]);
    expect(visible).toEqual([]);
  });

  it("expose Réserver et Contact lorsque rendus", () => {
    expect(getVisibleNavigation(["reserver", "contact"]).map((item) => item.id)).toEqual([
      "reserver",
      "contact",
    ]);
  });

  it("préserve l’ordre canonique", () => {
    const visible = getVisibleNavigation(["contact", "accueil", "services", "reserver"]);
    expect(visible.map((item) => item.id)).toEqual(["accueil", "services", "reserver", "contact"]);
  });

  it("ne mute pas la navigation source ni l’entrée", () => {
    const input = ["accueil", "services"] as const;
    const beforeNav = structuredClone(navigation);
    const beforeInput = [...input];
    getVisibleNavigation(input);
    expect(navigation).toEqual(beforeNav);
    expect([...input]).toEqual(beforeInput);
  });

  it("n’introduit aucun doublon d’identifiant ou de href", () => {
    const visible = getVisibleNavigation(ALL_IDS);
    const ids = visible.map((item) => item.id);
    const hrefs = visible.map((item) => item.href);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});
