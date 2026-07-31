import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { Footer } from "./footer";
import type { NavigationItem } from "@/content/types";

const accueilOnly: readonly NavigationItem[] = [
  { id: "accueil", label: "Accueil", href: "#accueil" },
];

describe("Footer", () => {
  it("rend l’identité, le contact et le copyright minimal", () => {
    const html = renderToStaticMarkup(<Footer navigationItems={accueilOnly} year={2026} />);

    expect(html.startsWith("<footer")).toBe(true);
    expect(html).toContain(">PRiMiE<");
    expect(html).toContain("Chez PRiMiE Coiffure");
    expect(html).toContain("Coiffure et beauté afro à domicile");
    expect(html).toContain('href="#accueil"');
    expect(html).toContain('aria-label="Navigation du pied de page"');
    expect(html).toContain(">Accueil<");
    expect(html).toContain("+33 7 49 61 65 82");
    expect(html).toContain('href="tel:+33749616582"');
    expect(html).toContain(">WhatsApp<");
    expect(html).toContain('href="https://wa.me/33749616582"');
    expect(html).not.toContain("?text=");
    expect(html).toContain("© 2026 Chez PRiMiE Coiffure.");
    expect(html).toContain("<address");
    expect(html).toContain("not-italic");
    expect(html).toContain("bg-black");
    expect(html).toContain("text-gold");
    expect(html).toContain("border-bronze");
    expect(html).toContain("font-display");
  });

  it("n’affiche que les items de navigation reçus", () => {
    const html = renderToStaticMarkup(
      <Footer
        navigationItems={[
          { id: "accueil", label: "Accueil", href: "#accueil" },
          { id: "services", label: "Services", href: "#services" },
        ]}
        year={2026}
      />,
    );

    expect(html).toContain("Accueil");
    expect(html).toContain("Services");
    expect(html).toContain("#services");
  });

  it("omet la navigation lorsque la liste est vide", () => {
    const html = renderToStaticMarkup(<Footer navigationItems={[]} year={2026} />);

    expect(html).not.toContain("<nav");
    expect(html).toContain("PRiMiE");
    expect(html).toContain('href="tel:+33749616582"');
    expect(html).toContain("WhatsApp");
  });

  it("n’invente aucun contenu hors périmètre", () => {
    const html = renderToStaticMarkup(<Footer navigationItems={accueilOnly} year={2026} />);

    expect(html).not.toContain("Tous droits réservés");
    expect(html).not.toContain("SIRET");
    expect(html).not.toContain("mentions légales");
    expect(html).not.toContain("confidentialité");
    expect(html).not.toContain("@");
    expect(html).not.toContain("Instagram");
    expect(html).not.toContain("Facebook");
    expect(html).not.toContain("horaire");
    expect(html).not.toContain("adresse");
    expect(html).not.toContain("#services");
    expect(html).not.toContain("#galerie");
    expect(html).not.toContain("#a-propos");
    expect(html).not.toContain("#avis");
    expect(html).not.toContain("#faq");
    expect(html).not.toContain("#reserver");
    expect(html).not.toContain("#contact");
  });

  it("reste un Server Component sans directive client", () => {
    const source = readFileSync(join(process.cwd(), "components/shell/footer.tsx"), "utf8");
    expect(source).not.toMatch(/["']use client["']/);
  });
});
