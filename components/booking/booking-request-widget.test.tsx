import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { bookingConfig } from "@/content/booking";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site-config";
import { ContactBooking } from "@/components/sections/contact-booking";
import { BookingRequestWidget } from "@/components/booking/booking-request-widget";

const serviceOptions = services.map((service) => ({
  id: service.id,
  title: service.title,
}));

describe("ContactBooking section — FLOW-01C", () => {
  it("reste un Server Component et compose le widget Client", () => {
    const source = readFileSync(
      join(process.cwd(), "components/sections/contact-booking.tsx"),
      "utf8",
    );

    expect(source).not.toMatch(/["']use client["']/);
    expect(source).not.toMatch(/\b(useState|useEffect|useRef)\b/);
    expect(source).toContain("BookingRequestWidget");
    expect(source).toContain("BrandLogo");
    expect(source).toContain('id="reserver"');
    expect(source).not.toContain("<details");
    expect(source).not.toContain("Comment réserver");
    expect(source).not.toContain("lg:grid-cols-2");
    expect(source).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it("rend le shell premium avec titre, sous-titre et ancres", () => {
    const html = renderToStaticMarkup(<ContactBooking />);

    expect(html).toContain('id="reserver"');
    expect(html.match(/id="reserver"/g)).toHaveLength(1);
    expect(html).toContain('id="contact"');
    expect(html.match(/id="contact"/g)).toHaveLength(1);
    expect(html).toContain("scroll-mt-24");
    expect(html.match(/<h2\b/g)).toHaveLength(1);
    expect(html).toContain(">Contactez PRiMiE Coiffure<");
    expect(html).toContain(bookingConfig.copy.subtitle);
    expect(html).toContain("Choisissez votre date");
    expect(html).toContain("Choisissez votre créneau");
    expect(html).toContain("Détails de la demande");
    expect(html).toContain(bookingConfig.copy.ctaLabel);
    expect(html).toContain("lg:grid-cols-12");
    expect(html).toContain("lg:col-span-4");
    expect(html).toContain("lg:col-span-3");
    expect(html).toContain("lg:col-span-5");
    expect(html).toContain("lg:col-span-7");
    expect(html).not.toContain("Comment réserver");
    expect(html).not.toContain("Réservation &amp; contact");
    expect(html).not.toContain("Réserver sur WhatsApp");
    expect(html).not.toContain("<details");
    expect(html).not.toContain("Déplacement inclus");
    expect(html).not.toContain("06 00 00 00 00");
    expect(html).not.toContain("Octobre 2024");
    expect(html).toContain('href="tel:+33749616582"');
    expect(html).toContain("+33 7 49 61 65 82");
    expect(html).toContain(siteConfig.contact.whatsappUrl);
  });
});

describe("BookingRequestWidget", () => {
  it("est le seul nouveau Client Component booking et expose le contrat UI", () => {
    const source = readFileSync(
      join(process.cwd(), "components/booking/booking-request-widget.tsx"),
      "utf8",
    );

    expect(source).toMatch(/["']use client["']/);
    expect(source).toContain("validateBookingRequest");
    expect(source).toContain("buildBookingWhatsAppUrl");
    expect(source).toContain("buildCalendarMonth");
    expect(source).toContain("getTodayInTimeZone");
    expect(source).not.toContain("localStorage");
    expect(source).not.toContain("sessionStorage");
    expect(source).not.toContain("fetch(");
    expect(source).not.toMatch(/from ["']date-fns|dayjs|luxon["']/);
  });

  it("rend formulaire, six créneaux, résumé vide et labels accessibles (SSR stable)", () => {
    const html = renderToStaticMarkup(
      <BookingRequestWidget
        services={serviceOptions}
        config={bookingConfig}
        brand={{
          activity: siteConfig.brand.activity,
        }}
        contact={{
          phoneDisplay: siteConfig.contact.phoneDisplay,
          phoneE164: siteConfig.contact.phoneE164,
          whatsappUrl: siteConfig.contact.whatsappUrl,
        }}
      />,
    );

    expect(html).toContain("<form");
    expect(html).toContain('autoComplete="name"');
    expect(html).toContain('autoComplete="tel"');
    expect(html).toContain('type="tel"');
    expect(html).toContain('inputMode="tel"');
    expect(html).toContain(">Votre nom<");
    expect(html).toContain(">Votre téléphone<");
    expect(html).toContain(">Prestation<");
    expect(html).toContain(">Choisissez une prestation<");
    expect(html).toContain("Date : à choisir");
    expect(html).toContain("Heure : à choisir");
    expect(html).toContain(">Envoyer ma demande sur WhatsApp<");
    expect(html).toContain('type="submit"');
    expect(html).toContain("disabled");
    expect(html).toContain("Créneau souhaité — confirmation par Prisca.");
    expect(html).toContain(bookingConfig.openingHours.daysLabel);
    expect(html).toContain(bookingConfig.openingHours.hoursLabel);
    expect(html).toContain(bookingConfig.openingHours.appointmentOnlyLabel);
    expect(html).toContain("Prestations à domicile");
    expect(html).toContain(siteConfig.brand.activity);
    expect(html).toContain("Appelez-nous");

    for (const slot of ["09h00", "10h30", "12h00", "14h30", "16h00", "17h30"]) {
      expect(html).toContain(`>${slot}<`);
    }

    for (const service of services) {
      expect(html).toContain(service.title.replaceAll("&", "&amp;"));
    }
    expect(html.match(/<option\b/g)?.length).toBe(7);

    // Grille stable 42 cellules (squelette avant montage / date)
    expect((html.match(/min-h-11/g) ?? []).length).toBeGreaterThanOrEqual(42);
    expect(html).toContain('aria-label="Mois précédent"');
    expect(html).toContain('aria-label="Mois suivant"');
    expect(html).toContain("Lun");
    expect(html).toContain("Dim");
    expect(html).not.toMatch(/confirmée automatiquement|réservation confirmée/i);
    expect(html).not.toContain("disponible");
  });

  it("bandeau contact sans nom commercial répété et liens téléphone / WhatsApp distincts", () => {
    const html = renderToStaticMarkup(
      <BookingRequestWidget
        services={serviceOptions}
        config={bookingConfig}
        brand={{ activity: siteConfig.brand.activity }}
        contact={{
          phoneDisplay: siteConfig.contact.phoneDisplay,
          phoneE164: siteConfig.contact.phoneE164,
          whatsappUrl: siteConfig.contact.whatsappUrl,
        }}
      />,
    );

    const contactStart = html.indexOf('id="contact"');
    expect(contactStart).toBeGreaterThanOrEqual(0);
    const contactBlock = html.slice(contactStart);
    expect(html.match(/id="contact"/g)).toHaveLength(1);

    expect(contactBlock).not.toContain(siteConfig.brand.commercialName);
    expect(contactBlock).not.toContain("Chez PRiMiE Coiffure");
    expect(contactBlock).toContain("Prestations à domicile");
    expect(contactBlock).toContain(siteConfig.brand.activity);

    const phoneHref = `href="tel:${siteConfig.contact.phoneE164}"`;
    const whatsappHref = `href="${siteConfig.contact.whatsappUrl}"`;
    expect(contactBlock).toContain(phoneHref);
    expect(contactBlock).toContain(whatsappHref);
    expect(contactBlock.indexOf(phoneHref)).toBeLessThan(contactBlock.indexOf(whatsappHref));
    expect(contactBlock).not.toMatch(/\+33 7 49 61 65 82WhatsApp/);
    expect(contactBlock).toContain(">WhatsApp<");

    expect(html).toMatch(/<button[^>]*\sdisabled(?:=""|\s|>)/);
    expect(html).toContain(">Envoyer ma demande sur WhatsApp<");
  });

  it("expose le parcours mobile 4 étapes sans dupliquer formulaire ni calendrier", () => {
    const source = readFileSync(
      join(process.cwd(), "components/booking/booking-request-widget.tsx"),
      "utf8",
    );
    const html = renderToStaticMarkup(
      <BookingRequestWidget
        services={serviceOptions}
        config={bookingConfig}
        brand={{ activity: siteConfig.brand.activity }}
        contact={{
          phoneDisplay: siteConfig.contact.phoneDisplay,
          phoneE164: siteConfig.contact.phoneE164,
          whatsappUrl: siteConfig.contact.whatsappUrl,
        }}
      />,
    );

    expect(html).toContain("Étape 1 sur 4");
    expect(html).toContain(">Choisissez votre date<");
    expect(html).toContain(">Choisissez votre créneau<");
    expect(html).toContain(">Vos informations<");
    expect(html).toContain(">Vérifiez votre demande<");
    expect(html).toContain(">Détails de la demande<");
    expect(html).toContain("Continuer vers les créneaux");
    expect(html).toContain("Continuer vers mes informations");
    expect(html).toContain("Vérifier ma demande");
    expect(html).toContain("Modifier mes informations");
    expect(html).toContain('aria-expanded="true"');
    expect(html).toContain("aria-controls");
    expect(html).toContain("lg:hidden");
    expect(html).toContain("lg:col-span-4");
    expect(html).toContain("lg:grid-cols-12");

    expect(html.match(/<form\b/g)).toHaveLength(1);
    expect(html.match(/aria-label="Mois précédent"/g)).toHaveLength(1);
    expect(html.match(/aria-label="Mois suivant"/g)).toHaveLength(1);
    expect(html.match(/id="contact"/g)).toHaveLength(1);
    expect(html.match(/autoComplete="name"/g)).toHaveLength(1);
    expect(html.match(/name="serviceId"/g)).toHaveLength(1);

    expect(source).toContain("mobileStep");
    expect(source).toContain("LockIcon");
    expect(source).toContain("font-sans text-base font-semibold");
    expect(source).toContain("font-sans text-lg font-semibold");
    expect(source).toContain("disabled:border-bronze/25");
    expect(source).toContain("disabled:text-on-dark-muted");
    expect(source).not.toContain("disabled:opacity-70");
    expect(source).not.toContain("localStorage");
    expect(source).not.toContain("sessionStorage");
    expect(source).not.toContain("document.cookie");
  });

  it("rend l’étape 4 verrouillée au chargement avec message et disabled natif", () => {
    const html = renderToStaticMarkup(
      <BookingRequestWidget
        services={serviceOptions}
        config={bookingConfig}
        brand={{ activity: siteConfig.brand.activity }}
        contact={{
          phoneDisplay: siteConfig.contact.phoneDisplay,
          phoneE164: siteConfig.contact.phoneE164,
          whatsappUrl: siteConfig.contact.whatsappUrl,
        }}
      />,
    );

    expect(html).toContain("Complétez vos informations pour vérifier la demande.");
    expect(html).toContain("Choisissez d’abord une date pour accéder aux créneaux.");
    expect(html).toContain("cursor-not-allowed");
    expect(html).toContain("border-bronze/25");
    // Étape 4 trigger disabled at SSR (prérequis manquants)
    expect(html).toMatch(/Vérifiez votre demande[\s\S]*?disabled/);
  });
});
