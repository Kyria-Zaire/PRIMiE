import type { Service } from "./types";

/**
 * Prestations validées — intitulés exacts (CLAUDE.md / do-not-break).
 * Descriptions : PO_APPROVED_SEED — non affichées dans l’UI tant que 01C ne les active pas.
 * Aucun prix, durée ni image.
 */
export const services = [
  {
    id: "tresses-coiffure",
    title: "Tresses & coiffure femme et homme",
    description:
      "Des tresses et coiffures pour femmes et hommes, définies selon le style recherché.",
  },
  {
    id: "traitement-perruque",
    title: "Traitement de perruque",
    description:
      "Entretien et remise en forme de votre perruque selon son état et le résultat souhaité.",
  },
  {
    id: "pose-perruque",
    title: "Pose perruque",
    description: "Pose de votre perruque après échange sur le modèle et le rendu souhaité.",
  },
  {
    id: "look-twist",
    title: "Look & twist",
    description: "Réalisation de twists selon le style et la finition choisis.",
  },
  {
    id: "vente-pose-perruques",
    title: "Vente et pose de perruques",
    description: "Choix et pose de perruques selon les modèles disponibles et le rendu recherché.",
  },
  {
    id: "tissage",
    title: "Tissage",
    description: "Réalisation de tissages selon le style défini lors de l’échange.",
  },
] as const satisfies readonly Service[];

export type Services = typeof services;
