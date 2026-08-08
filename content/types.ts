/**
 * Types de contenu PRiMiE — aucun couplage React/Next.
 * Champs optionnels réservés à un usage futur clairement identifié.
 */

import type { ServiceId } from "./services";

/** Entrée source (ancres landing). */
export type NavigationItem = {
  readonly id: string;
  readonly label: string;
  readonly href: `#${string}`;
};

/** Entrée résolue pour la route courante (ancres, chemins ou ancres croisées). */
export type ResolvedNavigationItem = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly current?: boolean;
};

export type ServiceIllustration = {
  readonly src: string;
  readonly alt: "";
  readonly status: "SERVICE_ILLUSTRATION";
  readonly width: number;
  readonly height: number;
  /** Cadrage carte photo — `contain` pour les portraits afin d’éviter de couper têtes/gestes. */
  readonly objectFit: "cover" | "contain";
};

export type Service = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly illustration: ServiceIllustration;
};

export type GalleryAssetKind = "illustration" | "realisation";

export type GalleryRightsStatus =
  "project_approved" | "client_consent_confirmed" | "pending" | "blocked";

export type GalleryCategoryId =
  "tresses" | "perruques" | "tissage" | "twists-locs" | "coiffures-afro";

export type GalleryItem = {
  readonly id: string;
  readonly title: string;
  readonly categoryId: GalleryCategoryId;
  readonly serviceIds: readonly ServiceId[];
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly featured: boolean;
  readonly kind: GalleryAssetKind;
  readonly rightsStatus: GalleryRightsStatus;
  /** Cadrage optionnel — exceptions documentées uniquement. */
  readonly objectPosition?: string;
};

export type FaqItem = {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
};

/** Identifiants des valeurs marketing Hero R2 (HEADER-HERO-DESIGN-R1B). */
export type HeroValueId = "home" | "excellence" | "passion" | "listening";

/** Valeur marketing Hero — non contractuelle ; pictogrammes côté présentation. */
export type HeroValue = {
  readonly id: HeroValueId;
  readonly title: string;
  readonly description: string;
};

/**
 * Copy Hero R2 — texte seul, sans URL ni JSX.
 * H1 / slogan : `siteConfig.brand.slogan` (source canonique, hors HeroCopy).
 */
export type HeroCopy = {
  readonly eyebrow: string;
  readonly description: readonly [string, string];
  readonly primaryCtaLabel: string;
};

/** Statut de publication Preview Conseils — aucun lien tant que ≠ published. */
export type AdvicePublicationStatus = "preview_only" | "published";

/**
 * Illustration Conseils — `ILLUSTRATION_APPROVED_BY_CTO`.
 * Pas une réalisation, ni un produit commercialisé, ni un avis.
 */
export type AdviceIllustration = {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly kind: "illustration";
  readonly rightsStatus: "project_approved";
};

/** Carte d’aperçu Conseils — sans href / route publique en 01B. */
export type AdviceItem = {
  readonly id: string;
  readonly number: "01" | "02" | "03";
  readonly category: string;
  readonly title: string;
  readonly summary: string;
  readonly image: AdviceIllustration;
  readonly publicationStatus: AdvicePublicationStatus;
};

/**
 * Copy éditoriale future de la section Preview Conseils.
 * `ctaLabel` est un libellé seul — aucun href tant que `/conseils` n’existe pas.
 */
export type AdviceCopy = {
  readonly eyebrowLead: string;
  readonly eyebrowBrand: string;
  readonly titleLead: string;
  readonly titleAccent: string;
  readonly titleEnd: string;
  readonly description: string;
  readonly ctaLabel: string;
};
