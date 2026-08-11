/**
 * Couche légale non publique — LEGAL-PAGES-01B-R2.
 * Statuts `confirmed` / `pending` uniquement ; aucune page légale ni lien Footer.
 */

import { siteConfig } from "./site-config";
import type {
  ConfirmedLegalFact,
  HostingCandidate,
  LegalFact,
  PendingLegalFact,
  PendingLegalRequestFrom,
  TermsScope,
} from "./types";

function confirmed<T>(value: T, source: string): ConfirmedLegalFact<T> {
  return { status: "confirmed", value, source };
}

function pending(reason: string, requestedFrom: PendingLegalRequestFrom): PendingLegalFact {
  return { status: "pending", reason, requestedFrom };
}

/** Candidat d’infrastructure — distinct de l’hébergeur légal confirmé. */
export const hostingCandidate: HostingCandidate = {
  provider: "Vercel",
  status: "candidate",
  confirmationCondition: "À confirmer uniquement après le déploiement réel du site de production.",
};

const termsScope: TermsScope = {
  status: "blocked_legal_scope",
  reason:
    "Prix, paiement, acompte, annulation, déplacement, vente de perruques (y compris ventes seules via WhatsApp) et conclusion du contrat ne sont pas encore confirmés pour publication légale.",
};

/** Inventaire technique factuel — dérivé du runtime actuel, hors politique publique. */
const technicalPrivacyInventory = {
  bookingLocalInput: confirmed(
    "Saisie locale dans le widget BookingRequestWidget (état React client).",
    "components/booking/booking-request-widget.tsx",
  ),
  whatsAppMessageClientGeneration: confirmed(
    "Génération du message WhatsApp côté client via buildBookingWhatsAppMessage.",
    "lib/booking/message.ts",
  ),
  whatsAppNavigationAfterExplicitAction: confirmed(
    "Navigation vers wa.me uniquement après action explicite de l’utilisateur (submit du formulaire).",
    "components/booking/booking-request-widget.tsx",
  ),
  noPrimieApiSubmission: confirmed(
    "Aucune soumission vers une API PRiMiE lors de la demande de rendez-vous.",
    "components/booking/booking-request-widget.tsx — absence de fetch/API route booking",
  ),
  noPrimieServerStorage: confirmed(
    "Aucun stockage serveur PRiMiE des données saisies dans le widget Booking.",
    "Audit runtime V1 — absence de route API et de persistance serveur",
  ),
  noDatabase: confirmed(
    "Aucune base de données dans le périmètre V1.",
    "Architecture landing statique — absence de couche data",
  ),
  noNonEssentialAnalyticsDemonstrated: confirmed(
    "Aucune analytics active ni cookies non essentiels démontrés dans le runtime actuel.",
    "Audit runtime V1 — absence de scripts analytics/cookies tiers",
  ),
  noBookingPersistenceAfterReload: confirmed(
    "Aucune persistance Booking après rechargement (pas de localStorage ni sessionStorage).",
    "components/booking/booking-request-widget.test.tsx — contrôle anti-persistance",
  ),
} as const;

export const legalContent = {
  publisher: {
    legalIdentity: confirmed("Prisca Foani", "CTO"),
    commercialName: confirmed(
      siteConfig.brand.commercialName,
      "content/site-config.ts — brand.commercialName",
    ),
    legalStatus: pending(
      "Statut juridique (micro-entreprise, EI, société, etc.) non confirmé.",
      "Prisca",
    ),
    siren: pending("Numéro SIREN non fourni.", "Prisca"),
    siret: pending("Numéro SIRET non fourni.", "Prisca"),
    registration: pending("Mention d’immatriculation (RCS/RM) non confirmée.", "Prisca"),
    vatNumber: pending("Numéro de TVA intracommunautaire non confirmé.", "Prisca"),
    publicProfessionalAddress: pending(
      "Adresse professionnelle explicitement non autorisée à la publication pour le moment.",
      "CTO",
    ),
    publicProfessionalEmail: pending("Email professionnel public non confirmé.", "Prisca"),
    phone: confirmed(
      {
        display: siteConfig.contact.phoneDisplay,
        e164: siteConfig.contact.phoneE164,
      },
      "content/site-config.ts — contact.phoneDisplay / phoneE164",
    ),
    publicationDirector: pending(
      "Directeur / directrice de publication juridiquement confirmé non disponible pour publication (Kyria possible auteur technique, mais non confirmé juridiquement).",
      "CTO",
    ),
    /** Prénom public connu — insuffisant pour les mentions légales. */
    publicOwnerFirstName: confirmed(siteConfig.brand.owner, "content/site-config.ts — brand.owner"),
    activity: confirmed(siteConfig.brand.activity, "content/site-config.ts — brand.activity"),
  },
  hosting: {
    publicDomain: pending("Domaine public final non confirmé.", "deployment"),
    confirmedHost: pending(
      "Hébergeur réellement utilisé non confirmé — candidat Vercel distinct et non publiable.",
      "deployment",
    ),
    hostLegalName: pending(
      "Raison sociale de l’hébergeur confirmé non disponible tant que l’hébergement n’est pas déployé.",
      "deployment",
    ),
    hostAddress: pending(
      "Adresse de l’hébergeur confirmé non disponible tant que l’hébergement n’est pas déployé.",
      "deployment",
    ),
    hostPhone: pending(
      "Téléphone de l’hébergeur confirmé non applicable tant que l’hébergeur n’est pas confirmé.",
      "deployment",
    ),
  },
  mediation: {
    membershipOrConvention: pending(
      "Adhésion ou convention de médiation de la consommation non confirmée.",
      "Prisca",
    ),
    selectionStatus: confirmed("not_selected", "CTO/Prisca"),
    mediatorName: pending(
      "Médiateur non sélectionné — absence de nom de médiateur publiable.",
      "CTO",
    ),
    mediatorAddress: pending("Adresse du médiateur non confirmée.", "Prisca"),
    mediatorUrl: pending("URL du médiateur non confirmée.", "Prisca"),
    referralProcedure: pending("Modalités de saisine du médiateur non confirmées.", "Prisca"),
  },
  commercialOperations: {
    appointmentConfirmation: confirmed(
      "Le rendez-vous devient confirmé lorsque Prisca répond sur WhatsApp et valide la date — la demande WhatsApp n’est pas une confirmation automatique.",
      "content/booking.ts — copy.confirmationNote",
    ),
    quoteProcess: confirmed("Aucun devis n’est envoyé actuellement.", "CTO"),
    priceCommunication: confirmed(
      "Le prix est communiqué sur WhatsApp avant la prestation.",
      "CTO",
    ),
    deposit: confirmed("Aucun acompte n’est demandé actuellement.", "CTO"),
    paymentMethods: confirmed(
      {
        methods: ["espèces", "virement bancaire"],
      },
      "CTO",
    ),
    cancellationRescheduling: pending(
      "Conditions d’annulation et de report non confirmées.",
      "Prisca",
    ),
    travelFees: confirmed("Aucun frais de déplacement actuellement.", "CTO"),
    separateWigSales: confirmed(
      "Les perruques peuvent être vendues seules, sans prestation. Les demandes et commandes passent par WhatsApp.",
      "CTO",
    ),
    contractConclusionPlace: pending("Lieu de conclusion du contrat non confirmé.", "Prisca"),
    distanceSelling: pending("Périmètre vente à distance non confirmé.", "Prisca"),
    delayAbsenceImpossibility: pending(
      "Règles en cas de retard, absence ou impossibilité non confirmées.",
      "Prisca",
    ),
  },
  privacy: {
    dataController: pending(
      "Identité complète du responsable du traitement non confirmée.",
      "Prisca",
    ),
    rightsContact: pending("Contact dédié pour exercer les droits RGPD non confirmé.", "Prisca"),
    purposes: pending("Finalités de traitement non formalisées pour publication.", "Prisca"),
    concernedData: pending(
      "Liste exhaustive des données concernées hors inventaire technique non confirmée.",
      "Prisca",
    ),
    legalBasis: pending("Bases légales par finalité non confirmées.", "Prisca"),
    mandatoryOptionalCharacter: pending(
      "Pour les traitements concernés : caractère obligatoire ou facultatif des données non formalisé pour publication.",
      "Prisca",
    ),
    recipients: pending("Destinataires des données non confirmés.", "Prisca"),
    retention: confirmed(
      "Les conversations WhatsApp sont supprimées un mois après la dernière interaction.",
      "CTO",
    ),
    prospecting: confirmed(true, "CTO"),
    marketingConsentMechanism: pending("Consentement préalable promotionnel non défini.", "CTO"),
    marketingOptOutMechanism: pending(
      "Mécanisme de refus/désinscription promotionnel non défini.",
      "CTO",
    ),
    marketingInformationNotice: pending(
      "Texte d’information promotionnelle associé non validé.",
      "CTO",
    ),
    thirdPartySharing: confirmed(
      "Les coordonnées ne sont pas partagées avec une autre personne.",
      "CTO",
    ),
    transferOutsideEu: pending("Transferts hors Union européenne non confirmés.", "Prisca"),
    rightsExerciseProcedure: pending("Procédure d’exercice des droits non confirmée.", "Prisca"),
    cnilComplaintRight: pending(
      "Mention du droit de réclamation auprès de la CNIL — contact droits manquant.",
      "Prisca",
    ),
  },
  bookingDataCollection: {
    collectedFields: confirmed(
      ["name", "phone", "service", "preferredDate", "preferredTimeSlot"] as const,
      "lib/booking/message.ts — buildBookingWhatsAppMessage",
    ),
    transmissionChannel: confirmed(
      "Transmission à WhatsApp uniquement après action explicite de l’utilisateur.",
      "components/booking/booking-request-widget.tsx",
    ),
    noAutomaticConfirmation: confirmed(
      true,
      "content/booking.ts — copy.confirmationNote ; lib/booking/message.ts",
    ),
    noOnlinePayment: confirmed(true, "Périmètre V1 — absence de paiement en ligne"),
    noOnlineOrder: confirmed(true, "Périmètre V1 — absence de commande en ligne"),
    noClientAccount: confirmed(true, "Périmètre V1 — absence de compte client"),
  },
  termsScope,
  hostingCandidate,
  technicalPrivacyInventory,
};

export type LegalContent = {
  readonly publisher: typeof legalContent.publisher;
  readonly hosting: typeof legalContent.hosting;
  readonly mediation: typeof legalContent.mediation;
  readonly commercialOperations: typeof legalContent.commercialOperations;
  readonly privacy: typeof legalContent.privacy;
  readonly bookingDataCollection: typeof legalContent.bookingDataCollection;
  readonly termsScope: TermsScope;
  readonly hostingCandidate: HostingCandidate;
  readonly technicalPrivacyInventory: typeof legalContent.technicalPrivacyInventory;
};

export type LegalFactField = LegalFact<unknown>;

export function isConfirmedLegalFact<T>(fact: LegalFact<T>): fact is ConfirmedLegalFact<T> {
  return fact.status === "confirmed";
}

export function isPendingLegalFact(fact: LegalFact<unknown>): fact is PendingLegalFact {
  return fact.status === "pending";
}
