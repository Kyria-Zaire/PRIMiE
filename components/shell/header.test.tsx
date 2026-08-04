import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { Header } from "./header";

describe("Header", () => {
  it("rend le landmark, le mot-symbole et le slot Menu sans nav horizontale ni CTA desktop", () => {
    const html = renderToStaticMarkup(
      <Header navigationMenu={<button type="button">Menu</button>} />,
    );

    expect(html).toContain("<header");
    expect(html).toContain('href="#accueil"');
    expect(html).toContain('alt="PRiMiE"');
    expect(html).toContain("primie-logo-v1.webp");
    expect(html).toContain("bg-hero");
    expect(html).toContain("border-bronze");
    expect(html).toContain(">Menu<");
    expect(html).toContain('style="z-index:var(--z-header)"');
    expect(html).not.toContain('aria-label="Navigation principale"');
    expect(html).not.toContain("Réserver sur WhatsApp");
    expect(html).not.toContain("hidden lg:flex");
    expect(html).not.toContain("hidden lg:block");
  });

  it("conserve le logo même sans items de navigation dans le Header", () => {
    const html = renderToStaticMarkup(
      <Header navigationMenu={<div data-nav-slot="true">Menu</div>} />,
    );

    expect(html).toContain('data-nav-slot="true"');
    expect(html).toContain('alt="PRiMiE"');
    expect(html).toContain("primie-logo-v1.webp");
    expect(html).not.toContain("<nav");
  });

  it("rend le slot menu lorsque fourni", () => {
    const html = renderToStaticMarkup(
      <Header navigationMenu={<div data-nav-slot="true">Menu</div>} />,
    );

    expect(html).toContain('data-nav-slot="true"');
    expect(html).toContain("Menu");
  });

  it("reste un Server Component sans directive client ni WhatsApp", () => {
    const source = readFileSync(join(process.cwd(), "components/shell/header.tsx"), "utf8");
    expect(source).not.toMatch(/["']use client["']/);
    expect(source).toContain("BrandLogo");
    expect(source).toContain("heroOverlay");
    expect(source).toContain('variant = "default"');
    expect(source).toContain("navigationMenu");
    expect(source).not.toContain("buildWhatsAppUrl");
    expect(source).not.toContain("LinkButton");
    expect(source).not.toContain("silhouette");
    expect(source).not.toContain("items.map");
  });

  it("applique la variante heroOverlay sans recréer un logo", () => {
    const htmlDefault = renderToStaticMarkup(
      <Header navigationMenu={<button type="button">Menu</button>} />,
    );
    const htmlOverlay = renderToStaticMarkup(
      <Header navigationMenu={<button type="button">Menu</button>} variant="heroOverlay" />,
    );

    expect(htmlDefault).toContain("bg-hero");
    expect(htmlDefault).toContain("relative border-b border-bronze");
    expect(htmlDefault).toContain("lg:min-h-16");
    expect(htmlOverlay).toContain("absolute inset-x-0 top-0");
    expect(htmlOverlay).toContain("bg-black/55");
    expect(htmlOverlay).toContain("border-gold/25");
    expect(htmlOverlay).toContain("lg:min-h-0");
    expect(htmlOverlay).toContain("lg:py-2.5");
    expect(htmlOverlay).toContain("lg:w-[11.25rem]");
    expect(htmlOverlay).toContain("xl:w-[12.5rem]");
    expect(htmlOverlay).toContain("primie-logo-v1.webp");
    expect(htmlOverlay).toContain('alt="PRiMiE"');
    expect(htmlOverlay).not.toContain("bg-hero");
    expect(htmlOverlay).not.toContain("xl:w-[13.75rem]");
    expect(htmlOverlay).not.toMatch(/Avis|Nos réalisations|À propos/);
  });
});
