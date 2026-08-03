import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { MobileNavigation } from "./mobile-navigation";
import type { NavigationItem } from "@/content/types";

const accueilOnly: readonly NavigationItem[] = [
  { id: "accueil", label: "Accueil", href: "#accueil" },
];

describe("MobileNavigation", () => {
  it("rend le menu fermé par défaut avec aria et panneau hidden", () => {
    const html = renderToStaticMarkup(
      <MobileNavigation
        items={accueilOnly}
        whatsappUrl="https://wa.me/33749616582"
        whatsappLabel="Réserver sur WhatsApp"
      />,
    );

    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain("aria-controls=");
    expect(html).toContain(">Menu<");
    expect(html).not.toContain(">Fermer<");
    expect(html).toContain("hidden");
    expect(html).toContain('aria-label="Navigation mobile"');
    expect(html).toContain(">Accueil<");
    expect(html).toContain('href="#accueil"');
    expect(html).toContain("bg-rich-black");
    expect(html).toContain("border-bronze");
    expect(html).toContain("text-on-dark");
    expect(html).toContain("bg-cta-gold");
    expect(html).not.toContain("#services");
    expect(html).not.toContain("#galerie");
    expect(html).not.toContain("#a-propos");
    expect(html).not.toContain("#avis");
    expect(html).not.toContain("#faq");
    expect(html).not.toContain("#reserver");
    expect(html).not.toContain("#contact");
  });

  it("n’affiche que les items reçus", () => {
    const html = renderToStaticMarkup(
      <MobileNavigation
        items={[
          { id: "accueil", label: "Accueil", href: "#accueil" },
          { id: "services", label: "Services", href: "#services" },
        ]}
        whatsappUrl="https://wa.me/33749616582"
        whatsappLabel="Réserver sur WhatsApp"
      />,
    );

    expect(html).toContain("Accueil");
    expect(html).toContain("Services");
    expect(html).toContain("#services");
  });

  it("n’est plus le seul Client Component du shell (Header menu + Footer grid)", () => {
    const shellDir = join(process.cwd(), "components/shell");
    const files = readdirSync(shellDir).filter(
      (name) => name.endsWith(".tsx") && !name.includes(".test."),
    );
    const clientFiles = files
      .filter((name) => {
        const source = readFileSync(join(shellDir, name), "utf8");
        return /["']use client["']/.test(source);
      })
      .sort();

    expect(clientFiles).toEqual(["footer-responsive-grid.tsx", "mobile-navigation.tsx"]);
  });

  it("n’importe pas site-config ni getVisibleNavigation", () => {
    const source = readFileSync(
      join(process.cwd(), "components/shell/mobile-navigation.tsx"),
      "utf8",
    );
    expect(source).not.toContain("site-config");
    expect(source).not.toContain("getVisibleNavigation");
    expect(source).not.toContain("server-only");
  });

  it("ferme le menu et déverrouille le scroll au passage desktop", () => {
    const source = readFileSync(
      join(process.cwd(), "components/shell/mobile-navigation.tsx"),
      "utf8",
    );
    expect(source).toContain('matchMedia("(min-width: 1024px)")');
    expect(source).toContain('addEventListener("change"');
    expect(source).toContain("unlockScroll");
    expect(source).toContain("Escape");
    expect(source).toContain("buttonRef.current?.focus()");
    expect(source).toContain("aria-expanded");
    expect(source).toContain("aria-controls");
  });
});
