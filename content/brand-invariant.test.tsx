import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "@/app/page";
import { Footer } from "@/components/shell/footer";
import { Header } from "@/components/shell/header";
import { siteConfig } from "@/content/site-config";

describe("Invariant de marque PRiMiE", () => {
  it("expose la graphie canonique dans siteConfig", () => {
    expect(siteConfig.brand.shortName).toBe("PRiMiE");
    expect(siteConfig.brand.commercialName).toBe("Chez PRiMiE Coiffure");
  });

  it("branche les metadata Next sur le nom commercial canonique", () => {
    const layout = readFileSync(join(process.cwd(), "app/layout.tsx"), "utf8");
    expect(layout).toContain("title: siteConfig.brand.commercialName");
    expect(layout).toContain("description: siteConfig.brand.activity");
    expect(siteConfig.brand.commercialName).toBe("Chez PRiMiE Coiffure");
  });

  it("rend le logo Header avec alt PRiMiE sans uppercase CSS", () => {
    const html = renderToStaticMarkup(
      <Header navigationMenu={<button type="button">Menu</button>} />,
    );
    const source = readFileSync(join(process.cwd(), "components/shell/header.tsx"), "utf8");

    expect(html).toContain('alt="PRiMiE"');
    expect(html).toContain("primie-logo-v1.webp");
    expect(html).not.toContain("PRIMiE");
    expect(html).not.toContain("uppercase");
    expect(source).not.toMatch(/\buppercase\b/);
  });

  it("rend le logo Footer et Chez PRiMiE Coiffure en texte", () => {
    const html = renderToStaticMarkup(
      <Footer
        navigationItems={[{ id: "accueil", label: "Accueil", href: "#accueil" }]}
        year={2026}
      />,
    );

    expect(html).toContain('alt="PRiMiE"');
    expect(html).toContain("primie-logo-v1.webp");
    expect(html).toContain("Chez PRiMiE Coiffure");
    expect(html).toContain("© 2026 Chez PRiMiE Coiffure – Tous droits réservés.");
    expect(html).not.toContain("PRIMiE");
    expect(html).not.toContain("Chez PRIMiE Coiffure");
  });

  it("rend la page publique avec la graphie officielle uniquement", () => {
    const html = renderToStaticMarkup(Home());

    expect(html).toContain("PRiMiE");
    expect(html).toContain("Chez PRiMiE Coiffure");
    expect(html).not.toContain("PRIMiE");
    expect(html).not.toContain("Chez PRIMiE Coiffure");
    expect(html).not.toContain("PRIMIE");
    expect(html).not.toContain("Primie");
  });
});
