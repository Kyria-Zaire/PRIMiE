/**
 * Faits métier confirmés et seed contents PO_APPROVED_SEED.
 * Sources : CLAUDE.md, constitution projet, do-not-break, PRD contact, décisions PO 2026-07-31.
 */

export const siteConfig = {
  brand: {
    shortName: "PRiMiE",
    commercialName: "Chez PRiMiE Coiffure",
    owner: "Prisca",
    activity: "Coiffure et beauté afro à domicile",
    /** PO_APPROVED_SEED — non affiché dans le Hero tant que 01C ne l’active pas. */
    slogan: "Révélez votre beauté, une coiffure à la fois.",
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
    /**
     * PO_APPROVED_SEED — centralisé pour activation CTA en 01C.
     * Les CTA publics continuent d’appeler `buildWhatsAppUrl()` sans argument.
     */
    whatsappPrefillMessage:
      "Bonjour Prisca 👋\n\nJe souhaite prendre rendez-vous pour une prestation chez PRiMiE Coiffure.\n\nPourriez-vous me communiquer vos disponibilités ainsi qu’un devis ?\n\nMerci 😊",
  },
} as const;

export type SiteConfig = typeof siteConfig;
