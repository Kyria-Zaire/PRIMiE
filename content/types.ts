/**
 * Types de contenu PRiMiE — aucun couplage React/Next.
 * Champs optionnels réservés à un usage futur clairement identifié.
 */

export type NavigationItem = {
  readonly id: string;
  readonly label: string;
  readonly href: `#${string}`;
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

export type GalleryItem = {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
};

export type Testimonial = {
  readonly id: string;
  readonly quote: string;
  readonly author: string;
};

export type FaqItem = {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
};
