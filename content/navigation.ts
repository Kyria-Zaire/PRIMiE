import type { NavigationItem } from "./types";

/**
 * Ancres et libellés issus de l’ordre officiel PRD / CLAUDE.md.
 * Header et Footer n’ont pas d’ancre dédiée dans le PRD.
 */
export const navigation = [
  { id: "accueil", label: "Accueil", href: "#accueil" },
  { id: "services", label: "Services", href: "#services" },
  { id: "galerie", label: "Galerie", href: "#galerie" },
  { id: "a-propos", label: "Pourquoi me choisir ?", href: "#a-propos" },
  { id: "faq", label: "FAQ", href: "#faq" },
  { id: "reserver", label: "Réserver", href: "#reserver" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const satisfies readonly NavigationItem[];

export type Navigation = typeof navigation;
