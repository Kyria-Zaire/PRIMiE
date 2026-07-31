/**
 * Signaux décoratifs du Hero — alignés sur la maquette brand validée.
 * Ne remplacent ni les prestations ni les faits métier de siteConfig.
 */

export type HeroHighlight = {
  readonly id: string;
  readonly label: string;
  readonly icon: "professionnelle" | "soignee" | "tendance" | "domicile";
};

export const heroHighlights: readonly HeroHighlight[] = [
  { id: "professionnelle", label: "PROFESSIONNELLE", icon: "professionnelle" },
  { id: "soignee", label: "SOIGNÉE", icon: "soignee" },
  { id: "tendance", label: "TENDANCE", icon: "tendance" },
  { id: "domicile", label: "À DOMICILE", icon: "domicile" },
] as const;
