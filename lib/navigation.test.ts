import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { navigation } from "@/content/navigation";
import {
  getPublicShellNavigation,
  getVisibleNavigation,
  resolveNavigationForRoute,
  type NavigationSectionId,
} from "./navigation";

const ALL_IDS = navigation.map((item) => item.id) as NavigationSectionId[];
const LANDING_IDS = [
  "accueil",
  "services",
  "galerie",
  "faq",
  "reserver",
  "contact",
] as const satisfies readonly NavigationSectionId[];

describe("getVisibleNavigation", () => {
  it("avec toutes les sections rendues, expose Accueil, Services, Galerie, FAQ, Réserver et Contact", () => {
    const visible = getVisibleNavigation(ALL_IDS);
    expect(visible.map((item) => item.id)).toEqual([
      "accueil",
      "services",
      "galerie",
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

  it("expose Galerie lorsque le contenu est prêt et le rendu déclaré, masque À propos", () => {
    const visible = getVisibleNavigation(["galerie", "a-propos"]);
    expect(visible.map((item) => item.id)).toEqual(["galerie"]);
    expect(visible[0]?.label).toBe("Galerie");
    expect(visible[0]?.label).not.toMatch(/Nos réalisations|Galerie d’inspirations/i);
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

  it("n’expose ni Testimonials ni ancre #avis", () => {
    const source = readFileSync(join(process.cwd(), "lib/navigation.ts"), "utf8");
    expect(source).not.toContain("testimonials");
    expect(source).not.toMatch(/case\s+"avis"/);
    expect(existsSync(join(process.cwd(), "content/testimonials.ts"))).toBe(false);
  });
});

describe("resolveNavigationForRoute", () => {
  const visible = getVisibleNavigation(LANDING_IDS);

  it("conserve les ancres sur la landing", () => {
    const resolved = resolveNavigationForRoute(visible, "/");
    expect(resolved.map((item) => ({ id: item.id, href: item.href }))).toEqual([
      { id: "accueil", href: "#accueil" },
      { id: "services", href: "#services" },
      { id: "galerie", href: "#galerie" },
      { id: "faq", href: "#faq" },
      { id: "reserver", href: "#reserver" },
      { id: "contact", href: "#contact" },
    ]);
    expect(resolved.every((item) => item.current !== true)).toBe(true);
  });

  it("résout les ancres croisées et marque Galerie current sur /galerie", () => {
    const resolved = resolveNavigationForRoute(visible, "/galerie");
    expect(
      resolved.map((item) => ({ id: item.id, href: item.href, current: item.current })),
    ).toEqual([
      { id: "accueil", href: "/#accueil", current: undefined },
      { id: "services", href: "/#services", current: undefined },
      { id: "galerie", href: "/galerie", current: true },
      { id: "faq", href: "/#faq", current: undefined },
      { id: "reserver", href: "/#reserver", current: undefined },
      { id: "contact", href: "/#contact", current: undefined },
    ]);
    expect(resolved.some((item) => item.href === "#galerie")).toBe(false);
  });

  it("résout les ancres croisées depuis /mentions-legales et /confidentialite", () => {
    for (const route of ["/mentions-legales", "/confidentialite"] as const) {
      const resolved = resolveNavigationForRoute(visible, route);
      expect(
        resolved.map((item) => ({ id: item.id, href: item.href, current: item.current })),
      ).toEqual([
        { id: "accueil", href: "/#accueil", current: undefined },
        { id: "services", href: "/#services", current: undefined },
        { id: "galerie", href: "/galerie", current: undefined },
        { id: "faq", href: "/#faq", current: undefined },
        { id: "reserver", href: "/#reserver", current: undefined },
        { id: "contact", href: "/#contact", current: undefined },
      ]);
    }
  });

  it("expose getPublicShellNavigation sans liste dupliquée", () => {
    const source = readFileSync(join(process.cwd(), "lib/navigation.ts"), "utf8");
    expect(source).toContain("getPublicShellNavigation");
    expect(source).toContain('"/mentions-legales"');
    expect(source).toContain('"/confidentialite"');
    expect(getPublicShellNavigation("/confidentialite").map((item) => item.href)).toEqual([
      "/#accueil",
      "/#services",
      "/galerie",
      "/#faq",
      "/#reserver",
      "/#contact",
    ]);
  });

  it("ne mute pas la navigation visible ni la source", () => {
    const beforeVisible = structuredClone(visible);
    const beforeNav = structuredClone(navigation);
    resolveNavigationForRoute(visible, "/galerie");
    expect(visible).toEqual(beforeVisible);
    expect(navigation).toEqual(beforeNav);
  });
});
