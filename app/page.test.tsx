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
  it("active le contenu texte PO avec FAQ et navigation à cinq éléments", () => {
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
    expect(html).toContain('id="faq"');
    expect(html).toContain('id="reserver"');
    expect(html).toContain('id="contact"');
    expect(html).toContain("bg-hero");
    expect(html).toContain("PRiMiE");
    expect(html).toContain("Chez PRiMiE Coiffure");
    expect(html).toContain("Coiffure et beauté afro à domicile");
    expect(html).toContain(siteConfig.brand.slogan);
    expect(html).toContain(">Nos services<");
    expect(html).toContain(">Questions fréquentes<");
    expect(html).toContain(">Contactez PRiMiE Coiffure<");
    expect(html).toContain(
      "Échangez directement avec Prisca sur WhatsApp pour préciser votre prestation et votre demande.",
    );
    expect(html).toContain("Prestations à domicile");
    expect(html).toContain('href="#services"');
    expect(html).toContain(">Découvrir nos services<");
    expect(html.match(/id="reserver"/g)).toHaveLength(1);
    expect(html.match(/id="contact"/g)).toHaveLength(1);

    for (const service of services) {
      expect(html).toContain(service.title.replaceAll("&", "&amp;"));
      expect(html).toContain(service.description);
    }

    expect(html.match(/<details\b/g)).toHaveLength(7);
    for (const item of faq) {
      expect(html).toContain(item.question);
      expect(html).toContain(item.answer);
    }
    expect(html).not.toMatch(/dimanche/i);

    expect(html).toContain(`href="${bookingWhatsApp}"`);
    expect(html).toContain(`href="${plainWhatsApp}"`);
    expect(html).toContain("?text=");
    expect(decodeURIComponent(bookingWhatsApp.split("?text=")[1] ?? "")).toBe(
      siteConfig.contact.whatsappPrefillMessage,
    );
    expect(bookingWhatsApp.match(/\?text=/g)).toHaveLength(1);
    expect(bookingWhatsApp).not.toContain("%25");

    const contactBlock = html.slice(html.indexOf('id="contact"'));
    const footerBlock = html.slice(html.indexOf("<footer"));
    expect(contactBlock).toContain(`href="${plainWhatsApp}"`);
    expect(contactBlock).not.toContain("?text=");
    expect(footerBlock).toContain(`href="${plainWhatsApp}"`);
    expect(footerBlock.match(/wa\.me\/33749616582(?!\?)/)).not.toBeNull();

    expect(html).toContain('href="tel:+33749616582"');
    expect(html).toContain("+33 7 49 61 65 82");
    expect(html).toContain("Réserver sur WhatsApp");
    expect(html).toContain("primie-hero-v1.webp");
    expect(html).toContain("primie-hero-mobile-v1.webp");
    expect(html).toContain("<img");
    expect(html).toMatch(/alt=""/);
    expect(html).not.toContain("primie section hero");
    expect(html).not.toContain("Site en préparation.");
    expect(html).not.toContain("Instagram");
    expect(html).not.toContain("Extensions cils");

    expect(html.match(/<h1\b/g)).toHaveLength(1);
    const h2Count = html.match(/<h2\b/g)?.length ?? 0;
    expect(h2Count).toBe(3);

    expect(html).toContain(">Accueil<");
    expect(html).toContain(">Services<");
    expect(html).toContain(">FAQ<");
    expect(html).toContain(">Réserver<");
    expect(html).toContain(">Contact<");
    expect(html).not.toContain("#galerie");
    expect(html).not.toContain("#a-propos");
    expect(html).not.toContain("#avis");
    expect(html).not.toContain(">Galerie");
    expect(html).not.toMatch(/Nos réalisations|témoignage|avis clientes/i);
    expect(html).not.toContain("PRIMiE");

    for (const service of services) {
      expect(html).toContain(`${service.id}.webp`);
    }
    expect(services).toHaveLength(6);

    for (const href of ["#accueil", "#services", "#faq", "#reserver", "#contact"] as const) {
      expect(html).toContain(`href="${href}"`);
      const id = href.slice(1);
      expect(html).toContain(`id="${id}"`);
    }
  });

  it("ne contient qu’une directive client dans le shell et aucune dans sections", () => {
    const pageSource = readFileSync(join(process.cwd(), "app/page.tsx"), "utf8");
    expect(pageSource).not.toMatch(/["']use client["']/);
    expect(pageSource).toMatch(
      /RENDERED_SECTION_IDS\s*=\s*\[[\s\S]*"accueil"[\s\S]*"services"[\s\S]*"faq"[\s\S]*"reserver"[\s\S]*"contact"/,
    );
    expect(pageSource).toContain('from "@/components/sections/contact-booking"');
    expect(pageSource).not.toContain('from "@/components/sections/booking"');
    expect(pageSource).not.toContain('from "@/components/sections/contact"');
    expect(pageSource).not.toMatch(/from ["']@\/components\/sections\/booking["']/);
    expect(pageSource).not.toMatch(/from ["']@\/components\/sections\/contact["']/);

    const shellDir = join(process.cwd(), "components/shell");
    const shellFiles = readdirSync(shellDir).filter(
      (name) => name.endsWith(".tsx") && !name.includes(".test."),
    );
    const shellClients = shellFiles.filter((name) => {
      const source = readFileSync(join(shellDir, name), "utf8");
      return /["']use client["']/.test(source);
    });
    expect(shellClients).toEqual(["mobile-navigation.tsx"]);

    const sectionsDir = join(process.cwd(), "components/sections");
    const sectionFiles = readdirSync(sectionsDir).filter(
      (name) => name.endsWith(".tsx") && !name.includes(".test."),
    );
    expect(sectionFiles).toEqual(
      expect.arrayContaining(["contact-booking.tsx", "faq.tsx", "hero.tsx", "services.tsx"]),
    );
    expect(sectionFiles).not.toContain("booking.tsx");
    expect(sectionFiles).not.toContain("contact.tsx");
    const sectionClients = sectionFiles.filter((name) => {
      const source = readFileSync(join(sectionsDir, name), "utf8");
      return /["']use client["']/.test(source);
    });
    expect(sectionClients).toEqual([]);
  });

  it("préserve landmarks, ancres uniques et anti-invention ContactBooking", () => {
    const html = renderToStaticMarkup(Home());

    expect(html.match(/<header\b/g)).toHaveLength(1);
    expect(html.match(/<main\b/g)).toHaveLength(1);
    expect(html.match(/<footer\b/g)).toHaveLength(1);
    expect(html).not.toContain('href="#"');
    expect(html).not.toContain("href=''");
    expect(html).not.toContain('href=""');

    for (const id of ["accueil", "services", "faq", "reserver", "contact", "contenu-principal"]) {
      expect(html.match(new RegExp(`id="${id}"`, "g"))).toHaveLength(1);
    }

    expect(html).toContain(">Nos services<");
    expect(html).toContain(">Questions fréquentes<");
    expect(html).toContain(">Contactez PRiMiE Coiffure<");
    expect(html).toContain(">Comment réserver ?<");
    expect(html).toContain(">Coordonnées<");
    expect(html).toContain("aria-hidden");
    expect(html).not.toMatch(/<details[^>]*aria-expanded=/);
    expect(html).not.toMatch(/<summary[^>]*role=["']button["']/);
    expect(html).not.toMatch(/BOOKING-ENGINE|calendrier|<form\b|type=["']date["']/i);
    expect(html).not.toMatch(/sélecteur de service|champ nom|déplacement inclus/i);
  });
});
