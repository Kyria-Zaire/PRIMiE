import type { FaqItem } from "./types";

/**
 * FAQ prudente — PO_APPROVED_SEED (2026-07-31).
 * Non rendue dans app/page.tsx tant que la section FAQ n’est pas activée (01C+).
 * Pas d’horaires, dimanche, paiement, zone précise ni promesse de disponibilité.
 */
export const faq = [
  {
    id: "prendre-rendez-vous",
    question: "Comment prendre rendez-vous ?",
    answer: "Contactez Prisca sur WhatsApp en précisant la prestation souhaitée.",
  },
  {
    id: "prestations-domicile",
    question: "Proposez-vous des prestations à domicile ?",
    answer:
      "Oui. Les prestations sont proposées à domicile. La faisabilité du déplacement est confirmée lors de l’échange sur WhatsApp.",
  },
  {
    id: "duree-prestation",
    question: "Combien de temps dure une prestation ?",
    answer:
      "La durée dépend de la coiffure choisie. Une estimation peut être précisée lors de l’échange.",
  },
  {
    id: "preparation-cheveux",
    question: "Comment préparer mes cheveux avant la prestation ?",
    answer:
      "La préparation dépend de la prestation choisie. Les consignes sont précisées lors de l’échange sur WhatsApp.",
  },
  {
    id: "prestations-hommes",
    question: "Proposez-vous des prestations pour les hommes ?",
    answer: "Oui. Certaines prestations sont proposées aux femmes et aux hommes.",
  },
] as const satisfies readonly FaqItem[];
