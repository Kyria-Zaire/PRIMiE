import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { Header } from "./header";
import { siteConfig } from "@/content/site-config";
import type { NavigationItem } from "@/content/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const sampleItems: readonly NavigationItem[] = [
  { id: "accueil", label: "Accueil", href: "#accueil" },
  { id: "services", label: "Services", href: "#services" },
  { id: "faq", label: "FAQ", href: "#faq" },
  { id: "reserver", label: "Réserver", href: "#reserver" },
  { id: "contact", label: "Contact", href: "#contact" },
];

describe("Header", () => {
  it("rend le landmark, le mot-symbole et le CTA WhatsApp prérempli", () => {
    const html = renderToStaticMarkup(<Header items={sampleItems} />);
    const expectedWhatsApp = buildWhatsAppUrl(siteConfig.contact.whatsappPrefillMessage);

    expect(html).toContain("<header");
    expect(html).toContain('href="#accueil"');
    expect(html).toContain('alt="PRiMiE"');
    expect(html).toContain("primie-logo-v1.webp");
    expect(html).toContain("bg-hero");
    expect(html).toContain("text-gold");
    expect(html).toContain("border-bronze");
    expect(html).toContain('aria-label="Navigation principale"');
    expect(html).toContain("Accueil");
    expect(html).toContain("Services");
    expect(html).toContain("FAQ");
    expect(html).toContain("Réserver");
    expect(html).toContain("Contact");
    expect(html).toContain("Réserver sur WhatsApp");
    expect(html).toContain(`href="${expectedWhatsApp}"`);
    expect(html).toContain("?text=");
    expect(html).toContain("bg-cta-gold");
    expect(html).toContain("hidden lg:block");
    expect(html).toContain("min-w-11");
    expect(html).toContain('style="z-index:var(--z-header)"');
  });

  it("omet la navigation lorsqu’aucun élément n’est visible", () => {
    const html = renderToStaticMarkup(<Header items={[]} />);
    const expectedWhatsApp = buildWhatsAppUrl(siteConfig.contact.whatsappPrefillMessage);

    expect(html).not.toContain("<nav");
    expect(html).toContain("Réserver sur WhatsApp");
    expect(html).toContain(`href="${expectedWhatsApp}"`);
    expect(html).toContain('alt="PRiMiE"');
    expect(html).toContain("primie-logo-v1.webp");
  });

  it("n’affiche que les items fournis", () => {
    const html = renderToStaticMarkup(
      <Header items={[{ id: "accueil", label: "Accueil", href: "#accueil" }]} />,
    );

    expect(html).toContain("Accueil");
    expect(html).not.toContain(">Services<");
    expect(html).not.toContain(">Contact<");
  });

  it("rend le slot menu mobile lorsqu’il est fourni", () => {
    const html = renderToStaticMarkup(
      <Header
        items={[{ id: "accueil", label: "Accueil", href: "#accueil" }]}
        mobileNavigation={<div data-mobile-slot="true">Menu</div>}
      />,
    );

    expect(html).toContain('data-mobile-slot="true"');
    expect(html).toContain("Menu");
  });

  it("reste un Server Component sans directive client", () => {
    const source = readFileSync(join(process.cwd(), "components/shell/header.tsx"), "utf8");
    expect(source).not.toMatch(/["']use client["']/);
    expect(source).toContain("whatsappPrefillMessage");
    expect(source).toContain("BrandLogo");
    expect(source).toContain("heroOverlay");
    expect(source).toContain('variant = "default"');
    expect(source).not.toContain("silhouette");
  });

  it("applique la variante heroOverlay sans recréer un logo", () => {
    const htmlDefault = renderToStaticMarkup(<Header items={sampleItems} />);
    const htmlOverlay = renderToStaticMarkup(<Header items={sampleItems} variant="heroOverlay" />);

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
