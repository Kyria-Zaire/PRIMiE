import type { Service } from "./types";

/**
 * Prestations validées — intitulés exacts (CLAUDE.md / do-not-break).
 * Descriptions : PO_APPROVED_SEED activées en UI.
 * Illustrations : SERVICE_ILLUSTRATION (décoratif, pas une réalisation réelle).
 * Aucun prix ni durée.
 */
export const services = [
  {
    id: "tresses-coiffure",
    title: "Tresses & coiffure femme et homme",
    description:
      "Des tresses et coiffures pour femmes et hommes, définies selon le style recherché.",
    illustration: {
      src: "/images/services/tresses-coiffure.webp",
      alt: "",
      status: "SERVICE_ILLUSTRATION",
      width: 612,
      height: 408,
      objectFit: "cover",
    },
  },
  {
    id: "traitement-perruque",
    title: "Traitement de perruque",
    description:
      "Entretien et remise en forme de votre perruque selon son état et le résultat souhaité.",
    illustration: {
      src: "/images/services/traitement-perruque.webp",
      alt: "",
      status: "SERVICE_ILLUSTRATION",
      width: 900,
      height: 600,
      objectFit: "cover",
    },
  },
  {
    id: "pose-perruque",
    title: "Pose perruque",
    description: "Pose de votre perruque après échange sur le modèle et le rendu souhaité.",
    illustration: {
      src: "/images/services/pose-perruque.webp",
      alt: "",
      status: "SERVICE_ILLUSTRATION",
      width: 600,
      height: 900,
      // Portrait : conserver mains + têtes (évite le crop object-cover).
      objectFit: "contain",
    },
  },
  {
    id: "look-twist",
    title: "Look & twist",
    description: "Réalisation de twists selon le style et la finition choisis.",
    illustration: {
      src: "/images/services/look-twist.webp",
      alt: "",
      status: "SERVICE_ILLUSTRATION",
      width: 612,
      height: 408,
      objectFit: "cover",
    },
  },
  {
    id: "vente-pose-perruques",
    title: "Vente et pose de perruques",
    description: "Choix et pose de perruques selon les modèles disponibles et le rendu recherché.",
    illustration: {
      src: "/images/services/vente-pose-perruques.webp",
      alt: "",
      status: "SERVICE_ILLUSTRATION",
      width: 900,
      height: 600,
      objectFit: "cover",
    },
  },
  {
    id: "tissage",
    title: "Tissage",
    description: "Réalisation de tissages selon le style défini lors de l’échange.",
    illustration: {
      src: "/images/services/tissage.webp",
      alt: "",
      status: "SERVICE_ILLUSTRATION",
      width: 600,
      height: 900,
      // Portrait : conserver volume et racine des cheveux.
      objectFit: "contain",
    },
  },
] as const satisfies readonly Service[];

export type Services = typeof services;

/** Identifiants canoniques des six prestations. */
export type ServiceId = (typeof services)[number]["id"];

export type { Service } from "./types";
