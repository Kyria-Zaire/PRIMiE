/**
 * Types de contenu PRiMiE — aucun couplage React/Next.
 * Champs optionnels réservés à un usage futur clairement identifié.
 */

export type NavigationItem = {
  readonly id: string;
  readonly label: string;
  readonly href: `#${string}`;
};

export type Service = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
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
