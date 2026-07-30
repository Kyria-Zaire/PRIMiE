/**
 * Faits métier confirmés uniquement.
 * Sources : CLAUDE.md, constitution projet, do-not-break, PRD contact.
 */

export const siteConfig = {
  brand: {
    shortName: "PRIMiE",
    commercialName: "Chez PRIMiE Coiffure",
    owner: "Prisca",
    activity: "Coiffure et beauté afro à domicile",
  },
  locale: {
    language: "fr",
    locale: "fr_FR",
  },
  contact: {
    phoneDisplay: "+33 7 49 61 65 82",
    phoneE164: "+33749616582",
    whatsappNumber: "33749616582",
    whatsappUrl: "https://wa.me/33749616582",
  },
} as const;

export type SiteConfig = typeof siteConfig;
