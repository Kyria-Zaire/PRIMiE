import type { GalleryCategoryId, GalleryItem } from "./types";

/**
 * Galerie d’inspirations — illustrations `ILLUSTRATION_APPROVED_BY_CTO`.
 * Ne pas présenter comme réalisations de Prisca.
 * Sources PNG locales hors suivi ; runtime WebP uniquement.
 */

export type GalleryFilterId = "all" | GalleryCategoryId;

export type GalleryCategory = {
  readonly id: GalleryFilterId;
  readonly label: string;
};

/** Ordre public des filtres. `all` = absence de filtre, jamais un categoryId d’item. */
export const galleryCategories = [
  { id: "all", label: "Toutes" },
  { id: "tresses", label: "Tresses" },
  { id: "perruques", label: "Perruques" },
  { id: "tissage", label: "Tissage" },
  { id: "twists-locs", label: "Twists & locs" },
  { id: "coiffures-afro", label: "Coiffures afro" },
] as const satisfies readonly GalleryCategory[];

export const galleryCopy = {
  landing: {
    title: "Galerie d’inspirations",
    accent: "Chaque coiffure, une inspiration unique",
    description:
      "Découvrez une sélection de styles qui reflètent l’univers et les prestations proposées par PRiMiE Coiffure.",
    ctaLabel: "Découvrir la galerie",
    ctaHref: "/galerie",
  },
  page: {
    metaTitle: "Galerie d’inspirations | Chez PRiMiE Coiffure",
    metaDescription:
      "Découvrez une sélection de styles illustrant l’univers et les prestations proposées par PRiMiE Coiffure.",
    title: "Galerie d’inspirations",
    accent: "Chaque coiffure, une inspiration unique",
    description:
      "Découvrez une sélection de styles qui reflètent l’univers et les prestations proposées par PRiMiE Coiffure.",
    bookingCtaLabel: "Faire une demande de rendez-vous",
    bookingCtaHref: "/#reserver",
    bookingSecondary: "Préparez votre demande et échangez directement avec Prisca sur WhatsApp.",
  },
} as const;

export const gallery = [
  {
    id: "tresses-longues",
    title: "Tresses longues",
    categoryId: "tresses",
    serviceIds: ["tresses-coiffure"],
    src: "/images/gallery/tresses-longues.webp",
    alt: "Portrait de profil, longues tresses fines ornées de bagues dorées sur fond noir",
    width: 1024,
    height: 1536,
    featured: true,
    kind: "illustration",
    rightsStatus: "project_approved",
  },
  {
    id: "perruque-body-wave",
    title: "Perruque Body Wave",
    categoryId: "perruques",
    serviceIds: ["vente-pose-perruques"],
    src: "/images/gallery/perruque-body-wave.webp",
    alt: "Chevelure volumineuse ondulée type body wave, tombant sur les épaules",
    width: 1024,
    height: 1536,
    featured: true,
    kind: "illustration",
    rightsStatus: "project_approved",
  },
  {
    id: "pose-perruque-lace",
    title: "Pose perruque Lace",
    categoryId: "perruques",
    serviceIds: ["pose-perruque"],
    src: "/images/gallery/pose-perruque-lace.webp",
    alt: "Chevelure lisse avec ligne frontale nette, style pose lace",
    width: 1024,
    height: 1536,
    featured: false,
    kind: "illustration",
    rightsStatus: "project_approved",
  },
  {
    id: "chignon-tresse",
    title: "Chignon tressé",
    categoryId: "tresses",
    serviceIds: ["tresses-coiffure"],
    src: "/images/gallery/chignon-tresse.webp",
    alt: "Chignon haut tressé avec cornrows et bagues dorées, vue de profil",
    width: 612,
    height: 408,
    featured: false,
    kind: "illustration",
    rightsStatus: "project_approved",
  },
  {
    id: "puff-afro",
    title: "Puff Afro",
    categoryId: "coiffures-afro",
    serviceIds: ["tresses-coiffure"],
    src: "/images/gallery/puff-afro.webp",
    alt: "Puff afro volumineux avec edges dessinés et accessoires dorés",
    width: 447,
    height: 558,
    featured: true,
    kind: "illustration",
    rightsStatus: "project_approved",
  },
  {
    id: "tresses-feed-in",
    title: "Tresses Feed-in",
    categoryId: "tresses",
    serviceIds: ["tresses-coiffure"],
    src: "/images/gallery/tresses-feed-in.webp",
    alt: "Tresses feed-in au scalp net, longueurs tombantes, bagues dorées",
    width: 1536,
    height: 1024,
    featured: false,
    kind: "illustration",
    rightsStatus: "project_approved",
  },
  {
    id: "twists-vanilles",
    title: "Twists & vanilles",
    categoryId: "twists-locs",
    serviceIds: ["look-twist"],
    src: "/images/gallery/twists-vanilles.webp",
    alt: "Twists vanille mi-longs, texture définie sur fond sombre",
    width: 612,
    height: 408,
    featured: false,
    kind: "illustration",
    rightsStatus: "project_approved",
  },
  {
    id: "bantu-knots",
    title: "Bantu Knots",
    categoryId: "coiffures-afro",
    serviceIds: ["tresses-coiffure"],
    src: "/images/gallery/bantu-knots.webp",
    alt: "Coiffure en bantu knots répartis sur la tête, edges soignés",
    width: 447,
    height: 558,
    featured: false,
    kind: "illustration",
    rightsStatus: "project_approved",
  },
  {
    id: "faux-locs-deesse",
    title: "Faux locs déesse",
    categoryId: "twists-locs",
    serviceIds: ["look-twist"],
    src: "/images/gallery/faux-locs-deesse.webp",
    alt: "Longs faux locs rassemblés, accessoires dorés, vue de profil",
    width: 447,
    height: 558,
    featured: true,
    kind: "illustration",
    rightsStatus: "project_approved",
  },
  {
    id: "tissage-ondule",
    title: "Tissage ondulé",
    categoryId: "tissage",
    serviceIds: ["tissage"],
    src: "/images/gallery/tissage-ondule.webp",
    alt: "Tissage aux longueurs ondulées, rendu brillant",
    width: 1024,
    height: 1536,
    featured: false,
    kind: "illustration",
    rightsStatus: "project_approved",
  },
  {
    id: "tissage-bresilien",
    title: "Tissage brésilien",
    categoryId: "tissage",
    serviceIds: ["tissage"],
    src: "/images/gallery/tissage-bresilien.webp",
    alt: "Pose de tissage en cours, mèches fixées sur tresses de base",
    width: 408,
    height: 612,
    featured: true,
    kind: "illustration",
    rightsStatus: "project_approved",
  },
  {
    id: "queue-cheval-tressee",
    title: "Queue-de-cheval tressée",
    categoryId: "tresses",
    serviceIds: ["tresses-coiffure"],
    src: "/images/gallery/queue-cheval-tressee.webp",
    alt: "Queue-de-cheval haute tressée avec détails sur les côtés",
    width: 1024,
    height: 1536,
    featured: true,
    kind: "illustration",
    rightsStatus: "project_approved",
  },
  {
    id: "perruque-deep-wave",
    title: "Perruque Deep Wave",
    categoryId: "perruques",
    serviceIds: ["vente-pose-perruques"],
    src: "/images/gallery/perruque-deep-wave.webp",
    alt: "Longues ondulations profondes type deep wave",
    width: 1024,
    height: 1536,
    featured: true,
    kind: "illustration",
    rightsStatus: "project_approved",
  },
  {
    id: "tresses-tribales",
    title: "Tresses tribales",
    categoryId: "tresses",
    serviceIds: ["tresses-coiffure"],
    src: "/images/gallery/tresses-tribales.webp",
    alt: "Motifs de tresses tribales au scalp, accessoires dorés",
    width: 408,
    height: 612,
    featured: true,
    kind: "illustration",
    rightsStatus: "project_approved",
  },
] as const satisfies readonly GalleryItem[];

export type Gallery = typeof gallery;

/** Ordre CTO de l’aperçu landing — exactement 8, hors doublons Services. */
export const featuredGalleryIds = [
  "tresses-longues",
  "perruque-body-wave",
  "perruque-deep-wave",
  "tresses-tribales",
  "queue-cheval-tressee",
  "tissage-bresilien",
  "faux-locs-deesse",
  "puff-afro",
] as const;

/** Items retenus pour l’aperçu landing (exactement 8, ordre CTO). */
export const featuredGallery = featuredGalleryIds.map((id) => {
  const item = gallery.find((entry) => entry.id === id);
  if (!item || !item.featured) {
    throw new Error(`Featured gallery item manquant ou non marqué : ${id}`);
  }
  return item;
});
