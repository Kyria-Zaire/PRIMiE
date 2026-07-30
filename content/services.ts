import type { Service } from "./types";

/**
 * Prestations validées — intitulés exacts (CLAUDE.md / do-not-break).
 * Aucune description, prix, durée ni image.
 */
export const services = [
  { id: "tresses-coiffure", title: "Tresses & coiffure femme et homme" },
  { id: "traitement-perruque", title: "Traitement de perruque" },
  { id: "pose-perruque", title: "Pose perruque" },
  { id: "look-twist", title: "Look & twist" },
  { id: "vente-pose-perruques", title: "Vente et pose de perruques" },
  { id: "tissage", title: "Tissage" },
] as const satisfies readonly Service[];

export type Services = typeof services;
