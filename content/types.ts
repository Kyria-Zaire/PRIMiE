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
