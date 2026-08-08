/**
 * Aperçu Conseils — données (UI : `AdvicePreview` / 01C).
 * Illustrations : ILLUSTRATION_APPROVED_BY_CTO · sources `images/conseil/carte-*.png`
 * (cartes 01–03). Carte 03 : `soin-perruque.webp` — illustration éditoriale
 * (`PRODUCT_VISUAL_AMBIGUITY — ACCEPTED_BY_CTO 2026-08-08`), sans revendication
 * d’une gamme commerciale.
 *
 * Portrait intro officiel (CTO) : Bantu Knots —
 * `advice-portrait-bantu-knots-v1.webp` (source `images/gallery/bantu-knots.png`).
 * `entretien-tresses.webp` reste réservé à la carte 02 uniquement.
 *
 * Placement UI : GalleryPreview → AdvicePreview → FAQ.
 */

import type { AdviceCopy, AdviceItem } from "./types";

export const adviceCopy = {
  eyebrowLead: "Le carnet de conseils",
  eyebrowBrand: "PRiMiE",
  titleLead: "Nos conseils",
  titleAccent: "pour sublimer",
  titleEnd: "vos cheveux au quotidien",
  description:
    "Astuces et bonnes pratiques pour prendre soin de vos coiffures et préserver leur éclat.",
  /** Libellé éditorial futur — aucun href en 01B. */
  ctaLabel: "Découvrir tous nos conseils",
} as const satisfies AdviceCopy;

/**
 * Portrait décoratif d’introduction Conseils — asset WebP dédié (01C-R2).
 * Source maître : `images/gallery/bantu-knots.png` (hors commit).
 */
export const adviceDecorativePortrait = {
  id: "bantu-knots",
  src: "/images/advice/advice-portrait-bantu-knots-v1.webp",
  width: 447,
  height: 558,
  role: "section_intro_decorative",
} as const;

/** @deprecated Alias R1 — préférer `adviceDecorativePortrait`. */
export const adviceDecorativePortraitReuse = {
  sourceItemId: adviceDecorativePortrait.id,
  sourceWebp: adviceDecorativePortrait.src,
  futureRole: adviceDecorativePortrait.role,
} as const;

export const advice = [
  {
    id: "preparation-cheveux",
    number: "01",
    category: "Préparation",
    title: "Préparer ses cheveux avant une prestation",
    summary:
      "Les étapes essentielles pour préparer des cheveux propres et hydratés avant votre prestation.",
    image: {
      src: "/images/advice/preparation-cheveux.webp",
      width: 1535,
      height: 1024,
      alt: "Femme vaporisant un soin sur ses cheveux naturels",
      kind: "illustration",
      rightsStatus: "project_approved",
    },
    publicationStatus: "preview_only",
  },
  {
    id: "entretien-tresses",
    number: "02",
    category: "Tresses",
    title: "Entretenir ses tresses",
    summary: "Des gestes simples pour garder vos tresses propres, soignées et agréables à porter.",
    image: {
      src: "/images/advice/entretien-tresses.webp",
      width: 1536,
      height: 1024,
      alt: "Femme de profil portant de longues tresses ornées de détails dorés",
      kind: "illustration",
      rightsStatus: "project_approved",
    },
    publicationStatus: "preview_only",
  },
  {
    id: "soin-perruque",
    number: "03",
    category: "Perruques",
    title: "Prendre soin d’une perruque",
    summary:
      "Des conseils simples pour préserver l’éclat, la souplesse et la forme de votre perruque.",
    image: {
      src: "/images/advice/soin-perruque.webp",
      width: 1536,
      height: 1024,
      alt: "Perruque ondulée présentée avec des accessoires de soin",
      kind: "illustration",
      rightsStatus: "project_approved",
    },
    publicationStatus: "preview_only",
  },
] as const satisfies readonly AdviceItem[];

export type Advice = typeof advice;
