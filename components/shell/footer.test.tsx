import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { Footer } from "./footer";
import { bookingConfig } from "@/content/booking";
import { featuredGalleryIds, gallery } from "@/content/gallery";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site-config";
import type { ResolvedNavigationItem } from "@/content/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const homeNav: readonly ResolvedNavigationItem[] = [
  { id: "accueil", label: "Accueil", href: "#accueil" },
  { id: "services", label: "Services", href: "#services" },
  { id: "galerie", label: "Galerie", href: "#galerie" },
  { id: "faq", label: "FAQ", href: "#faq" },
  { id: "reserver", label: "Réserver", href: "#reserver" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const galleryNav: readonly ResolvedNavigationItem[] = [
  { id: "accueil", label: "Accueil", href: "/#accueil" },
  { id: "services", label: "Services", href: "/#services" },
  { id: "galerie", label: "Galerie", href: "/galerie", current: true },
  { id: "faq", label: "FAQ", href: "/#faq" },
  { id: "reserver", label: "Réserver", href: "/#reserver" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

const expectedInspirationIds = featuredGalleryIds.slice(0, 6);

describe("Footer — FOOTER-DESIGN-R1B", () => {
  it("reste un Server Component sans directive client", () => {
    const source = readFileSync(join(process.cwd(), "components/shell/footer.tsx"), "utf8");
    expect(source).not.toMatch(/["']use client["']/);
    expect(source).toContain("BrandLogo");
    expect(source).toContain("featuredGalleryIds");
  });

  it("rend l’identité canonique, l’activité et le slogan seed", () => {
    const html = renderToStaticMarkup(<Footer navigationItems={homeNav} year={2026} />);

    expect(html.startsWith("<footer")).toBe(true);
    expect(html).toContain('alt="PRiMiE"');
    expect(html).toContain("primie-logo-v1.webp");
    expect(html).toContain("Chez PRiMiE Coiffure");
    expect(html).toContain("Coiffure et beauté afro à domicile");
    expect(html).toContain(siteConfig.brand.slogan);
    expect(html).toContain("bg-ivory");
    expect(html).not.toContain("L’excellence au service");
  });

  it("affiche les six services exacts dans l’ordre canonique", () => {
    const html = renderToStaticMarkup(<Footer navigationItems={homeNav} year={2026} />);

    expect(services).toHaveLength(6);
    let cursor = -1;
    for (const service of services) {
      const encoded = service.title.replaceAll("&", "&amp;");
      const index = html.indexOf(encoded);
      expect(index).toBeGreaterThan(cursor);
      cursor = index;
    }
  });

  it("affiche les six inspirations featured WebP sans priority ni Instagram", () => {
    const html = renderToStaticMarkup(<Footer navigationItems={homeNav} year={2026} />);
    const source = readFileSync(join(process.cwd(), "components/shell/footer.tsx"), "utf8");

    expect(expectedInspirationIds).toEqual([
      "tresses-longues",
      "perruque-body-wave",
      "perruque-deep-wave",
      "tresses-tribales",
      "queue-cheval-tressee",
      "tissage-bresilien",
    ]);

    for (const id of expectedInspirationIds) {
      const item = gallery.find((entry) => entry.id === id);
      expect(item).toBeDefined();
      expect(html).toContain(encodeURIComponent(item!.src));
      expect(html).toContain(item!.alt);
      expect(item!.src.endsWith(".webp")).toBe(true);
    }

    expect(html).toContain(">Inspirations<");
    expect(html).toContain("Découvrir la galerie");
    expect(html).toContain('href="/galerie"');
    expect(html).not.toMatch(/Instagram|TikTok|Facebook|Suivez-moi/i);
    expect(html).not.toMatch(/\.png"/);
    expect(source).not.toMatch(/\bpriority\b/);
    expect(source).toContain('loading="lazy"');
  });

  it("sépare CTA WhatsApp prérempli et contact WhatsApp plain", () => {
    const html = renderToStaticMarkup(<Footer navigationItems={homeNav} year={2026} />);
    const bookingUrl = buildWhatsAppUrl(siteConfig.contact.whatsappPrefillMessage);
    const plainUrl = buildWhatsAppUrl();

    expect(html).toContain('aria-label="Réserver sur WhatsApp"');
    expect(html).toContain("Réserver maintenant");
    expect(html).toContain("Sur WhatsApp");
    expect(html).toContain("Réserver sur WhatsApp");
    expect(html).toContain(`href="${bookingUrl}"`);
    expect(html).toContain("?text=");
    expect(html).toContain(`href="${plainUrl}"`);
    expect(html).toContain(">WhatsApp<");
    expect(html.match(/wa\.me\/33749616582(?!\?)/)).not.toBeNull();
  });

  it("expose le téléphone et les horaires bookingConfig", () => {
    const html = renderToStaticMarkup(<Footer navigationItems={homeNav} year={2026} />);
    const hours = bookingConfig.openingHours;

    expect(html).toContain("+33 7 49 61 65 82");
    expect(html).toContain('href="tel:+33749616582"');
    expect(html).toContain("Prestations à domicile");
    expect(html).toContain(hours.daysLabel);
    expect(html).toContain(hours.hoursLabel);
    expect(html).toContain(hours.appointmentOnlyLabel);
    expect(html).toContain("<address");
    expect(html).toContain("not-italic");
  });

  it("résout la navigation locale sur `/`", () => {
    const html = renderToStaticMarkup(
      <Footer navigationItems={homeNav} homeHref="#accueil" year={2026} />,
    );

    expect(html).toContain('aria-label="Navigation du pied de page"');
    for (const href of ["#accueil", "#services", "#galerie", "#faq", "#reserver", "#contact"]) {
      expect(html).toContain(`href="${href}"`);
    }
    expect(html).toContain('href="#accueil"');
    expect(html).not.toContain("Avis clientes");
    expect(html).not.toContain("À propos");
    expect(html).not.toContain("Nos réalisations");
    expect(html).not.toContain('href="#"');
  });

  it("résout la navigation multi-route sur `/galerie` avec aria-current", () => {
    const html = renderToStaticMarkup(
      <Footer navigationItems={galleryNav} homeHref="/" year={2026} />,
    );

    expect(html).toContain('href="/#accueil"');
    expect(html).toContain('href="/#services"');
    expect(html).toContain('href="/galerie"');
    expect(html).toContain('href="/#faq"');
    expect(html).toContain('href="/#reserver"');
    expect(html).toContain('href="/#contact"');
    expect(html).toContain('aria-current="page"');
    expect(html).toContain('href="/"');
  });

  it("rend le bandeau factuel exact et le copyright dynamique", () => {
    const html = renderToStaticMarkup(<Footer navigationItems={homeNav} year={2026} />);

    expect(html).toContain("6 prestations");
    expect(html).toContain(`${services.length} prestations proposées.`);
    expect(html).toContain("À domicile");
    expect(html).toContain(siteConfig.brand.activity);
    expect(html).toContain("Confirmation par Prisca");
    expect(html).toContain(bookingConfig.copy.confirmationNote);
    expect(html).toContain("font-script");
    expect(html).toContain(">Prisca<");
    expect(html).toContain("© 2026 Chez PRiMiE Coiffure – Tous droits réservés.");
  });

  it("n’invente aucun contenu hors périmètre", () => {
    const html = renderToStaticMarkup(<Footer navigationItems={homeNav} year={2026} />);

    expect(html).not.toContain("mentions légales");
    expect(html).not.toContain("confidentialité");
    expect(html).not.toContain("CGV");
    expect(html).not.toContain("@");
    expect(html).not.toContain("Reims");
    expect(html).not.toContain("06 00 00 00 00");
    expect(html).not.toMatch(/garantie|parrainage|satisfaction|fidélité|réduction/i);
    expect(html).not.toContain("Instagram");
    expect(html).not.toContain("Facebook");
    expect(html).not.toContain("TikTok");
  });

  it("omet la navigation lorsque la liste est vide", () => {
    const html = renderToStaticMarkup(<Footer navigationItems={[]} year={2026} />);

    expect(html).not.toContain('aria-label="Navigation du pied de page"');
    expect(html).toContain('alt="PRiMiE"');
    expect(html).toContain('href="tel:+33749616582"');
    expect(html).toContain("Réserver sur WhatsApp");
  });

  it("structure corrective R1B-R1 / R1C-R3 : ornements, contact, facts et signature", () => {
    const html = renderToStaticMarkup(<Footer navigationItems={homeNav} year={2026} />);
    const source = readFileSync(join(process.cwd(), "components/shell/footer.tsx"), "utf8");

    expect(source).toContain("function FloralOrnament");
    expect(source).toContain("function IconBadge");
    expect(source).toContain("footer-signature");
    expect(source).toContain("xl:grid-cols-[1.1fr_1.1fr_1.35fr_auto]");
    expect(source).toContain("w-[14rem]");
    expect(source).toContain("w-[11.25rem]");
    expect(source).toContain("min-h-16");
    expect(source).toContain("data-footer-facts");
    expect(source).toContain("data-footer-bottom");
    expect(source).toContain("data-footer-contact");
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain("data-footer-facts");
    expect(html).toContain("data-footer-bottom");
    expect(html).toContain("data-footer-mosaic");
    expect(html).toContain("data-footer-contact");
    expect(html).toContain("Téléphone");
    expect(html).toContain("Horaires");
    expect(html).toContain("Prestations à domicile");
    expect(html).toContain("footer-signature");
    expect(html).toContain("Découvrir la galerie");
    expect(html).toContain("→");
    expect(html).toContain("rounded-full");
    expect(html).toContain("aspect-[3/4]");
    expect(html).toContain("aspect-[4/5]");
  });

  it("expose quatre disclosures natifs R1C-R3 hors CTA (breakpoint xl)", () => {
    const html = renderToStaticMarkup(<Footer navigationItems={homeNav} year={2026} />);
    const source = readFileSync(join(process.cwd(), "components/shell/footer.tsx"), "utf8");
    const gridSource = readFileSync(
      join(process.cwd(), "components/shell/footer-responsive-grid.tsx"),
      "utf8",
    );
    const globalCss = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

    expect(source).not.toMatch(/["']use client["']/);
    expect(source).toContain("FooterResponsiveGrid");
    expect(source).not.toContain("function FooterDisclosure");
    expect(source).toContain("FooterDisclosureSlot");
    expect(source).not.toContain("lg:col-span-3");
    expect(source).not.toContain("lg:grid-cols-3");
    expect(source).not.toContain("lg:block!");
    expect(source).not.toContain("lg:hidden");
    expect(source).toContain("footer-inspirations-rail");
    expect(source).toContain("xl:grid-cols-3");
    expect(source).not.toContain("grid-cols-3 gap-1");

    expect(gridSource).toMatch(/^["']use client["']/m);
    expect(gridSource).toContain("footer-disclosure");
    expect(gridSource).toContain("(min-width: 1280px)");
    expect(gridSource).toContain("isDesktop || mobileOpen");
    expect(gridSource).toContain("xl:grid-cols-[1.08fr_0.92fr_1fr_1.05fr_1.22fr]");
    expect(gridSource).toMatch(/contact:\s*true/);
    expect(gridSource).toMatch(/inspirations:\s*true/);
    expect(gridSource).toMatch(/navigation:\s*false/);
    expect(gridSource).toMatch(/services:\s*false/);

    expect(globalCss).toContain(".footer-inspirations-rail");
    expect(globalCss).toContain("scrollbar-width: none");
    expect(globalCss).not.toContain("::details-content");
    expect(globalCss).not.toContain("content-visibility: visible");
    expect(globalCss).not.toContain("footer-disclosure:not([open])");
    expect(globalCss).not.toContain("Footer R1C-R1");

    const openFlags = [...html.matchAll(/<details([^>]*)>/g)].map((match) =>
      /\sopen(?:[\s>=]|$)/.test(match[1] ?? ""),
    );
    expect(html.match(/<details\b/g)).toHaveLength(4);
    expect(html.match(/<summary\b/g)).toHaveLength(4);
    expect(openFlags).toEqual([false, false, true, true]);
    expect(html).toContain('data-desktop="false"');
    expect(html).toContain(">Navigation<");
    expect(html).toContain(">Services<");
    expect(html).toContain(">Contactez-moi<");
    expect(html).toContain(">Inspirations<");
    expect(html).toContain("footer-inspirations-rail");
    expect(html).not.toMatch(/carousel|swiper/i);

    const ctaIndex = html.indexOf('aria-label="Réserver sur WhatsApp"');
    const firstDetails = html.indexOf("<details");
    expect(ctaIndex).toBeGreaterThan(-1);
    expect(firstDetails).toBeGreaterThan(ctaIndex);
  });
});
