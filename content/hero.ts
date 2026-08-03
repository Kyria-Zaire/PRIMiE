/**
 * Copy Hero R2 + valeurs marketing — APPROVED_BY_CTO (HEADER-HERO-DESIGN-R1A / R1B).
 * Consommé par `components/sections/hero.tsx` dès R1C.
 * CTA secondaire galerie : réutiliser `galleryCopy.landing.ctaLabel` + `#galerie`.
 * CTA WhatsApp : `buildWhatsAppUrl(siteConfig.contact.whatsappPrefillMessage)`.
 * H1 / slogan script : `siteConfig.brand.slogan` (ne pas dupliquer ici).
 */

import type { HeroCopy, HeroValue } from "./types";

export type { HeroCopy, HeroValue, HeroValueId } from "./types";

export const heroCopy = {
  eyebrow: "Chez PRiMiE Coiffure",
  description: [
    "Coiffure et beauté afro à domicile.",
    "L’excellence au service de votre beauté et de votre confiance.",
  ],
  primaryCtaLabel: "Réserver sur WhatsApp",
} as const satisfies HeroCopy;

/** Quatre valeurs marketing — ordre CTO exact ; pas des garanties contractuelles. */
export const heroValues = [
  {
    id: "home",
    title: "À DOMICILE",
    description: "Confort & discrétion",
  },
  {
    id: "excellence",
    title: "EXCELLENCE",
    description: "Qualité professionnelle",
  },
  {
    id: "passion",
    title: "PASSION",
    description: "L’art de vous sublimer",
  },
  {
    id: "listening",
    title: "À VOTRE ÉCOUTE",
    description: "Conseils personnalisés",
  },
] as const satisfies readonly HeroValue[];

/** Chemins runtime WebP R2 — non consommés par le Hero V1. */
export const heroAssetsR2 = {
  desktop: {
    src: "/images/hero/primie-hero-r2-desktop.webp",
    width: 1536,
    height: 1024,
    maxBytes: 450 * 1024,
  },
  mobile: {
    src: "/images/hero/primie-hero-r2-mobile.webp",
    width: 853,
    height: 1844,
    maxBytes: 350 * 1024,
  },
} as const;
