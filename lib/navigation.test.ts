import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { navigation } from "@/content/navigation";
import { getVisibleNavigation, type NavigationSectionId } from "./navigation";

const ALL_IDS = navigation.map((item) => item.id) as NavigationSectionId[];

describe("getVisibleNavigation", () => {
  it("avec toutes les sections rendues, expose Accueil, Services, FAQ, Réserver et Contact", () => {
    const visible = getVisibleNavigation(ALL_IDS);
    expect(visible.map((item) => item.id)).toEqual([
      "accueil",
      "services",
      "faq",
      "reserver",
      "contact",
    ]);
  });

  it("avec seulement Accueil rendu, ne retourne qu’Accueil", () => {
    expect(getVisibleNavigation(["accueil"]).map((item) => item.id)).toEqual(["accueil"]);
  });

  it("expose Services lorsque le contenu et le rendu sont prêts", () => {
    expect(getVisibleNavigation(["services"]).map((item) => item.id)).toEqual(["services"]);
  });

  it("expose FAQ lorsque le contenu et le rendu sont prêts", () => {
    expect(getVisibleNavigation(["faq"]).map((item) => item.id)).toEqual(["faq"]);
  });

  it("masque Galerie, Avis et À propos malgré un rendu déclaré", () => {
    const visible = getVisibleNavigation(["galerie", "avis", "a-propos"]);
    expect(visible).toEqual([]);
  });

  it("expose Réserver et Contact lorsque rendus", () => {
    expect(getVisibleNavigation(["reserver", "contact"]).map((item) => item.id)).toEqual([
      "reserver",
      "contact",
    ]);
  });

  it("préserve l’ordre canonique avec FAQ", () => {
    const visible = getVisibleNavigation(["contact", "accueil", "faq", "services", "reserver"]);
    expect(visible.map((item) => item.id)).toEqual([
      "accueil",
      "services",
      "faq",
      "reserver",
      "contact",
    ]);
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

  it("exige FAQ_SECTION_READY et un tableau non vide pour exposer la FAQ", () => {
    const source = readFileSync(join(process.cwd(), "lib/navigation.ts"), "utf8");
    expect(source).toMatch(/FAQ_SECTION_READY\s*=\s*true/);
    expect(source).toContain("FAQ_SECTION_READY && faq.length > 0");
    expect(source).toMatch(/ABOUT_CONTENT_READY\s*=\s*false/);
  });
});
