/**
 * Sélection de perruques — données (UI : WIG-SALES-CONTENT-01C).
 * Sources PNG : `images/wigs/{body-wave,deep-wave,lisse}.png` (hors commit).
 * Runtime WebP : `public/images/wigs/*.webp`.
 *
 * Familles confirmées Prisca : Vietnam, Inde (origines) + Gamme classique (range).
 * Aucun mapping produit ↔ famille tant que PENDING_PRISCA.
 * Aucun prix, matière, couleur, stock, livraison, paiement ou retour.
 *
 * Portrait décoratif : APPROVED_REUSE
 * `/images/services/vente-pose-perruques.webp` (source `images/services/vente-pose-perruques.png`).
 */

import type { WigCollectionSource, WigProduct, WigSelectionCopy } from "./types";

export const wigSelectionCopy = {
  eyebrowLead: "LA SÉLECTION",
  eyebrowBrand: "PRiMiE",
  titleLead: "Découvrez nos",
  titleAccent: "perruques",
  description:
    "Découvrez une sélection de perruques du Vietnam, d’Inde et de modèles classiques proposés par PRiMiE Coiffure.",
  productCtaLabel: "Demander le tarif sur WhatsApp",
  values: ["Sélection PRiMiE", "Vietnam & Inde", "Gamme classique", "Conseils personnalisés"],
  trustItems: [
    "Vente et pose",
    "Demande sur WhatsApp",
    "Confirmation par Prisca",
    "Conseils personnalisés",
  ],
} as const satisfies WigSelectionCopy;

/**
 * Familles générales confirmées — jamais assignées aux produits Body Wave /
 * Deep Wave / Lisse sans mapping Prisca.
 */
export const wigCollectionSources = [
  { id: "vietnam", kind: "origin", label: "Vietnam" },
  { id: "india", kind: "origin", label: "Inde" },
  { id: "classic", kind: "range", label: "Gamme classique" },
] as const satisfies readonly WigCollectionSource[];

/** Portrait décoratif section — réutilisation illustration service vente-pose-perruques. */
export const wigDecorativePortrait = {
  src: "/images/services/vente-pose-perruques.webp",
  width: 900,
  height: 600,
  role: "section_intro_decorative",
  reuseDecision: "APPROVED_REUSE",
} as const;

export const wigs = [
  {
    id: "body-wave",
    name: "Perruque Body Wave",
    textureLabel: "BODY WAVE",
    shortDescription: "Un modèle aux ondulations souples et élégantes.",
    image: {
      src: "/images/wigs/body-wave.webp",
      width: 1122,
      height: 1402,
      alt: "Perruque Body Wave ondulée présentée sur un mannequin",
    },
    status: "confirmed",
    featured: true,
    inquiryMessage:
      "Bonjour Prisca 👋\nJe souhaite avoir des informations et connaître le tarif de la Perruque Body Wave.\nPouvez-vous me préciser les modèles, longueurs et options actuellement proposés ?\nMerci 😊",
  },
  {
    id: "deep-wave",
    name: "Perruque Deep Wave",
    textureLabel: "DEEP WAVE",
    shortDescription: "Un modèle aux ondulations profondes et définies.",
    image: {
      src: "/images/wigs/deep-wave.webp",
      width: 1122,
      height: 1402,
      alt: "Perruque Deep Wave aux ondulations définies présentée sur un mannequin",
    },
    status: "confirmed",
    featured: true,
    inquiryMessage:
      "Bonjour Prisca 👋\nJe souhaite avoir des informations et connaître le tarif de la Perruque Deep Wave.\nPouvez-vous me préciser les modèles, longueurs et options actuellement proposés ?\nMerci 😊",
  },
  {
    id: "lisse",
    name: "Perruque Lisse",
    textureLabel: "LISSE",
    shortDescription: "Un modèle au tombé lisse et soigné.",
    image: {
      src: "/images/wigs/lisse.webp",
      width: 1122,
      height: 1402,
      alt: "Perruque longue et lisse présentée sur un mannequin",
    },
    status: "confirmed",
    featured: true,
    inquiryMessage:
      "Bonjour Prisca 👋\nJe souhaite avoir des informations et connaître le tarif de la Perruque Lisse.\nPouvez-vous me préciser les modèles, longueurs et options actuellement proposés ?\nMerci 😊",
  },
] as const satisfies readonly WigProduct[];

export type Wigs = typeof wigs;

function isPresentableWig(product: WigProduct): boolean {
  return (
    product.status === "confirmed" &&
    product.featured === true &&
    product.name.trim().length > 0 &&
    product.textureLabel.trim().length > 0 &&
    product.shortDescription.trim().length > 0 &&
    product.image.src.endsWith(".webp") &&
    product.image.width > 0 &&
    product.image.height > 0 &&
    product.image.alt.trim().length > 0 &&
    product.inquiryMessage.trim().length > 0
  );
}

/** Produits publiables pour la future section — filtre strict. */
export function getFeaturedWigs(): readonly WigProduct[] {
  return wigs.filter(isPresentableWig);
}
