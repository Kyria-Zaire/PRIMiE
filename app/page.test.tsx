import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { faq } from "@/content/faq";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site-config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import Home from "./page";

describe("Home page", () => {
  it("active le contenu PO avec FAQ, galerie preview et navigation à six éléments", () => {
    const html = renderToStaticMarkup(Home());
    const bookingWhatsApp = buildWhatsAppUrl(siteConfig.contact.whatsappPrefillMessage);
    const plainWhatsApp = siteConfig.contact.whatsappUrl;

    expect(html).toContain("Aller au contenu principal");
    expect(html).toContain('href="#contenu-principal"');
    expect(html).toContain("<header");
    expect(html).toContain("<footer");
    expect(html).toContain('id="contenu-principal"');
    expect(html).toContain('tabindex="-1"');
    expect(html).toContain('id="accueil"');
    expect(html).toContain('id="services"');
    expect(html).toContain('id="galerie"');
    expect(html.match(/id="galerie"/g)).toHaveLength(1);
    expect(html).toContain('id="faq"');
    expect(html).toContain('id="reserver"');
    expect(html).toContain('id="contact"');
    expect(html).toContain("bg-hero");
    expect(html).toContain("PRiMiE");
    expect(html).toContain("Chez PRiMiE Coiffure");
    expect(html).toContain("Coiffure et beauté afro à domicile");
    expect(html).not.toContain("La beauté afro,");
    expect(html).not.toContain(">sublimée<");
    expect(html).not.toContain("avec passion");
    expect(html).toContain("L’excellence au service de votre beauté et de votre confiance.");
    expect(html.replace(/<br\s*\/?>/g, " ")).toContain(siteConfig.brand.slogan);
    expect(html).toContain(siteConfig.brand.slogan);
    expect(html).toContain(">Nos services<");
    expect(html).toContain(">Galerie d’inspirations<");
    expect(html).toContain(">QUESTIONS<");
    expect(html).toContain(">FRÉQUENTES<");
    expect(html).toContain("Trouvez rapidement les réponses à vos questions");
    expect(html).toContain(">Contactez PRiMiE Coiffure<");
    expect(html).toContain(
      "Préparez votre demande de rendez-vous, puis envoyez-la directement à Prisca sur WhatsApp.",
    );
    expect(html).toContain("Prestations à domicile");
    expect(html).toContain("Choisissez votre date");
    expect(html).toContain("Envoyer ma demande sur WhatsApp");
    expect(html.match(/id="reserver"/g)).toHaveLength(1);
    expect(html.match(/id="contact"/g)).toHaveLength(1);

    for (const service of services) {
      expect(html).toContain(service.title.replaceAll("&", "&amp;"));
      expect(html).toContain(service.description);
    }

    expect(html.match(/<details\b/g)).toHaveLength(9);
    const faqBlock = html.slice(html.indexOf('id="faq"'), html.indexOf('id="reserver"'));
    expect(faqBlock.match(/<details\b/g)).toHaveLength(5);
    const footerBlockForDetails = html.slice(html.indexOf("<footer"));
    expect(footerBlockForDetails.match(/<details\b/g)).toHaveLength(4);
    for (const item of faq) {
      expect(html).toContain(item.question);
      expect(html).toContain(item.answer);
    }
    expect(html).not.toMatch(/\bdimanche\b/i);

    const contactStart = html.indexOf('id="contact"');
    const footerStart = html.indexOf("<footer");
    const contactBlock = html.slice(contactStart, footerStart);
    const footerBlock = html.slice(footerStart);
    expect(contactBlock).toContain(`href="${plainWhatsApp}"`);
    expect(contactBlock).not.toContain("?text=");
    expect(footerBlock).toContain(`href="${plainWhatsApp}"`);
    expect(footerBlock).toContain(`href="${bookingWhatsApp}"`);
    expect(footerBlock).toContain("Réserver sur WhatsApp");
    expect(footerBlock).toContain("Inspirations");
    expect(footerBlock).toContain("6 prestations");
    expect(footerBlock).toContain("Confirmation par Prisca");
    expect(footerBlock).toContain("Tous droits réservés.");
    expect(footerBlock.match(/wa\.me\/33749616582(?!\?)/)).not.toBeNull();

    // Header / Hero / Footer CTA : prérempli devis ; contact footer reste plain.
    expect(html).toContain(`href="${bookingWhatsApp}"`);
    expect(html).toContain("?text=");
    expect(html).toContain('href="tel:+33749616582"');
    expect(html).toContain("+33 7 49 61 65 82");
    expect(html).toContain("Réserver sur WhatsApp");
    expect(html).toContain("Envoyer ma demande sur WhatsApp");
    expect(html).toContain("primie-hero-r2-desktop.webp");
    expect(html).toContain("primie-hero-r2-mobile.webp");
    expect(html).not.toContain("primie-hero-v1.webp");
    expect(html).not.toContain("primie-hero-mobile-v1.webp");
    expect(html).toContain("<img");
    expect(html).toMatch(/alt=""/);
    expect(html).not.toContain("primie section hero");
    expect(html).not.toContain("Site en préparation.");
    expect(html).not.toContain("Instagram");
    expect(html).not.toContain("Extensions cils");
    expect(html).not.toContain("PROFESSIONNELLE");
    expect(html).toContain("EXCELLENCE");
    expect(html).toContain("À VOTRE ÉCOUTE");
    expect(html).toContain("absolute inset-x-0 top-0");
    expect(html).toContain("primie-logo-v1.webp");

    expect(html.match(/<h1\b/g)).toHaveLength(1);
    // h2 métier : Services, Galerie, FAQ, ContactBooking
    const h2Count = html.match(/<h2\b/g)?.length ?? 0;
    expect(h2Count).toBe(4);

    expect(html).toContain(">Accueil<");
    expect(html).toContain(">Services<");
    expect(html).toContain(">Galerie<");
    expect(html).toContain(">FAQ<");
    expect(html).toContain(">Réserver<");
    expect(html).toContain(">Contact<");
    expect(html).toContain('href="/galerie"');
    expect(html).toContain('href="#galerie"');
    expect(html).toContain("Découvrir la galerie");
    expect(html).not.toContain("#a-propos");
    expect(html).not.toContain("#avis");
    expect(html).not.toMatch(/Nos réalisations|témoignage|avis clientes/i);
    expect(html).not.toContain("PRIMiE");
    expect(html).not.toMatch(/\.png"/);

    for (const service of services) {
      expect(html).toContain(`${service.id}.webp`);
    }
    expect(services).toHaveLength(6);

    for (const href of [
      "#accueil",
      "#services",
      "#galerie",
      "#faq",
      "#reserver",
      "#contact",
    ] as const) {
      expect(html).toContain(`href="${href}"`);
      const id = href.slice(1);
      expect(html).toContain(`id="${id}"`);
    }
  });

  it("ne contient qu’une directive client dans le shell et le widget booking hors sections", () => {
    const pageSource = readFileSync(join(process.cwd(), "app/page.tsx"), "utf8");
    expect(pageSource).not.toMatch(/["']use client["']/);
    expect(pageSource).toMatch(
      /RENDERED_SECTION_IDS\s*=\s*\[[\s\S]*"accueil"[\s\S]*"services"[\s\S]*"galerie"[\s\S]*"faq"[\s\S]*"reserver"[\s\S]*"contact"/,
    );
    expect(pageSource).toContain('from "@/components/sections/contact-booking"');
    expect(pageSource).toContain('from "@/components/sections/gallery-preview"');
    expect(pageSource).not.toContain('from "@/components/sections/booking"');
    expect(pageSource).not.toContain('from "@/components/sections/contact"');
    expect(pageSource).not.toMatch(/from ["']@\/components\/sections\/booking["']/);
    expect(pageSource).not.toMatch(/from ["']@\/components\/sections\/contact["']/);
    expect(pageSource).toContain("resolveNavigationForRoute");

    const shellDir = join(process.cwd(), "components/shell");
    const shellFiles = readdirSync(shellDir).filter(
      (name) => name.endsWith(".tsx") && !name.includes(".test."),
    );
    const shellClients = shellFiles
      .filter((name) => {
        const source = readFileSync(join(shellDir, name), "utf8");
        return /["']use client["']/.test(source);
      })
      .sort();
    expect(shellClients).toEqual(["footer-responsive-grid.tsx", "mobile-navigation.tsx"]);

    const sectionsDir = join(process.cwd(), "components/sections");
    const sectionFiles = readdirSync(sectionsDir).filter(
      (name) => name.endsWith(".tsx") && !name.includes(".test."),
    );
    expect(sectionFiles).toEqual(
      expect.arrayContaining([
        "contact-booking.tsx",
        "faq.tsx",
        "faq-search-experience.tsx",
        "gallery-preview.tsx",
        "hero.tsx",
        "services.tsx",
      ]),
    );
    expect(sectionFiles).not.toContain("booking.tsx");
    expect(sectionFiles).not.toContain("contact.tsx");
    expect(sectionFiles).not.toContain("faq-info-panel.tsx");
    expect(sectionFiles).not.toContain("faq-search-list.tsx");
    const sectionClients = sectionFiles.filter((name) => {
      const source = readFileSync(join(sectionsDir, name), "utf8");
      return /["']use client["']/.test(source);
    });
    expect(sectionClients).toEqual(["faq-search-experience.tsx"]);

    const bookingWidget = readFileSync(
      join(process.cwd(), "components/booking/booking-request-widget.tsx"),
      "utf8",
    );
    expect(bookingWidget).toMatch(/["']use client["']/);
  });

  it("préserve landmarks, ancres uniques et anti-invention ContactBooking", () => {
    const html = renderToStaticMarkup(Home());

    expect(html.match(/<header\b/g)).toHaveLength(1);
    expect(html.match(/<main\b/g)).toHaveLength(1);
    expect(html.match(/<footer\b/g)).toHaveLength(1);
    expect(html).not.toContain('href="#"');
    expect(html).not.toContain("href=''");
    expect(html).not.toContain('href=""');

    for (const id of [
      "accueil",
      "services",
      "galerie",
      "faq",
      "reserver",
      "contact",
      "contenu-principal",
    ]) {
      expect(html.match(new RegExp(`id="${id}"`, "g"))).toHaveLength(1);
    }

    expect(html).toContain(">Nos services<");
    expect(html).toContain(">Galerie d’inspirations<");
    expect(html).toContain(">QUESTIONS<");
    expect(html).toContain(">FRÉQUENTES<");
    expect(html).toContain(">Contactez PRiMiE Coiffure<");
    expect(html).toContain('href="/galerie"');
    expect(html).toContain("Découvrir la galerie");
    expect(html).toContain("Choisissez votre date");
    expect(html).toContain("Choisissez votre créneau");
    expect(html).toContain("Détails de la demande");
    expect(html).toContain("aria-hidden");
    expect(html).not.toContain("Comment réserver");
    expect(html).not.toMatch(/Déplacement inclus|06 00 00 00 00|Octobre 2024/i);
    expect(html).not.toMatch(/BOOKING-ENGINE-V2/i);
    expect(html).toContain("<form");
  });
});
